import { Injectable, Logger } from '@nestjs/common';
import {
  BusinessSignQueryDto,
  CreateAppointmentDto,
  CreateTechAssistanceDto,
  CreateTechAssistanceRevision,
  PatchTechAssistanceDto,
} from './dto/create-appointment.dto';
import { jwtDecode } from 'jwt-decode';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { PrismaService } from '../prisma/prisma.service';
import { LegalRepresentativeDto } from '../dto/LegalRepresentativeDto';
import {
  queryByBusinessDto,
  rangeDateAppointmentBusinessDto,
  rangeDateAppointmentDto,
} from './dto/range-appointment.dto';
import { Prisma } from '@prisma/client';
import {
  AssistanceRecordForm,
  TECH_REVISION_STATUS,
} from './entities/tech-assistance.entity';
import { EmailService } from '@app/shared/email/email.service';
import {
  USER_ROLES_LIST,
  UserInformationData,
  UserRole,
} from '../user-info/entities/user-info.entity';
import {
  businessCompletedHourNotificationTextMailBody,
  techRegisterRejectNotificationMailBody,
  techRegisterRejectNotificationTextMailBody,
  techRegisterSignPendingNotificationMailBody,
  techRegisterSignPendingNotificationTextBody,
} from './entities/emailTemplates';
import { AwsS3ClientService } from '../aws-s3-client/aws-s3-client.service';
import { DataBusinessDto } from '../dto/dataBusinessDto';
import {
  BusinessAttendedReport,
  BusinessAttendedReportList,
  BusinessGeneralInfo,
  BusinessHoursReport,
  BusinessHoursReportList,
} from './entities/analystReports';
import { ContactDto } from '../dto/ContactDto';
import { UserInfoService } from '../user-info/user-info.service';
import { UserRoles } from '../user-info/entities/rol.entity';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly s3Service: AwsS3ClientService,
    private readonly userInfo: UserInfoService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const appointmentType = await this.prisma.selectAppointmentType.findUnique({
      where: { id: createAppointmentDto.type },
    });

    const newAppointment = await this.prisma.appointments.create({
      data: {
        date: createAppointmentDto.date,
        businessProfile_id: createAppointmentDto.businessProfile_id,
        attendance: 'Assigned',
        createdAt: new Date(),
        type: appointmentType.type,
      },
    });

    await this.prisma.appointmentHistory.create({
      data: {
        appointmentId: newAppointment.id,
        oldDate: newAppointment.date,
        newDate: newAppointment.date,
      },
    });

    return newAppointment;
  }

  async reschedule(createAppointmentDto: CreateAppointmentDto) {
    const currentAppointment = await this.prisma.appointments.findUnique({
      where: { id: createAppointmentDto.id },
    });

    if (!currentAppointment) throw new Error('Appointment not found');

    // Guardar histórico
    await this.prisma.appointmentHistory.create({
      data: {
        appointmentId: currentAppointment.id,
        oldDate: currentAppointment.date,
        newDate: createAppointmentDto.date,
      },
    });

    // Actualizar la cita con la nueva fecha
    const updatedAppointment = await this.prisma.appointments.update({
      where: { id: createAppointmentDto.id },
      data: { date: createAppointmentDto.date },
    });

    return updatedAppointment;
  }

  async findAppointmentsByConsultant(
    rangeDateAppointmentDto: rangeDateAppointmentDto,
    token: string,
  ) {
    const appointments = await this.prisma.appointments.findMany({
      where: {
        date: {
          gte: rangeDateAppointmentDto.startDate,
          lt: rangeDateAppointmentDto.endDate,
        },
      },
      include: {
        businessProfile: true,
      },
    });

    const response = await Promise.all(
      appointments.map(async (appointment) => {
        const dataLegalRepresentative = appointment.businessProfile.data as {
          LegalRepresentative?: LegalRepresentativeDto;
        };

        const appointment_type =
          await this.prisma.selectAppointmentType.findFirst({
            where: {
              type: appointment.type,
            },
          });

        return {
          id: appointment.id,
          name: dataLegalRepresentative.LegalRepresentative
            ?.NameLegalRepresentative,
          document_number:
            dataLegalRepresentative.LegalRepresentative
              ?.IdentificationLegalRepresentative,
          date: appointment.date,
          attendance: appointment.attendance,
          type: appointment_type.label,
          businessProfile_id: appointment.businessProfile_id,
        };
      }),
    );

    return response;
  }

  async findAppointmentsByAdmin(
    rangeDateAppointmentDto: rangeDateAppointmentBusinessDto,
  ) {
    let multiResponse = [];

    if ('multiBusiness' in rangeDateAppointmentDto) {
      const businessProfiles = await this.prisma.businessProfile.findMany({
        where: {
          id: {
            in: rangeDateAppointmentDto.multiBusiness,
          },
        },
      });

      for (const business of businessProfiles) {
        const dataLegalRepresentative = business.data as {
          LegalRepresentative?: LegalRepresentativeDto;
        };

        const appointmentsMulti = await this.prisma.appointments.findMany({
          where: {
            businessProfile_id: business.id,
            date: {
              gte: rangeDateAppointmentDto.startDate,
              lt: rangeDateAppointmentDto.endDate,
            },
          },
        });

        const chunkDates = appointmentsMulti.map((appointment) => ({
          id: appointment.id,
          name: dataLegalRepresentative.LegalRepresentative
            .NameLegalRepresentative,
          document_number:
            dataLegalRepresentative.LegalRepresentative
              .IdentificationLegalRepresentative,
          date: appointment.date,
          attendance: appointment.attendance,
        }));

        multiResponse = [...multiResponse, ...chunkDates];
      }
    }

    if (multiResponse.length) {
      return multiResponse;
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        id: rangeDateAppointmentDto.businessId,
      },
    });

    const dataLegalRepresentative = businessProfile.data as {
      LegalRepresentative?: LegalRepresentativeDto;
    };

    const appointments = await this.prisma.appointments.findMany({
      where: {
        businessProfile_id: businessProfile.id,
        date: {
          gte: rangeDateAppointmentDto.startDate,
          lt: rangeDateAppointmentDto.endDate,
        },
      },
    });

    const response = appointments.map((appointment) => ({
      id: appointment.id,
      name: dataLegalRepresentative.LegalRepresentative.NameLegalRepresentative,
      document_number:
        dataLegalRepresentative.LegalRepresentative
          .IdentificationLegalRepresentative,
      date: appointment.date,
      attendance: appointment.attendance,
    }));

    return response;
  }

  async getAppointmentHoursByBusiness(token: string) {
    let response: BusinessHoursReportList = [];

    const businessList = await this.prisma.businessProfile.findMany();

    for (const business of businessList) {
      let infoBusinessRow: BusinessHoursReport = {
        businessId: '',
        businessName: '',
        businessNit: '',
        hoursExecuted: '',
        hoursPlaned: '',
        hoursExecutedComplete: '',
        hoursPlanedComplete: '',
      };

      const businessInfo = business.data as {
        DataBusiness?: DataBusinessDto;
      };

      // Set basic business info
      infoBusinessRow.businessId = business.id;
      infoBusinessRow.businessName = businessInfo.DataBusiness?.BusinessName;
      infoBusinessRow.businessNit = businessInfo.DataBusiness?.RUT.toString();

      const appointments = await this.prisma.appointments.findMany({
        where: { businessProfile_id: business.id },
      });

      let hoursExecutedCount = 0;
      let hoursExecutedCountComplete = 0;

      for (const appointment of appointments) {
        const techRecords = await this.prisma.techAssistanceRecord.findMany({
          where: {
            appointment_id: appointment.id,
          },
          include: {
            TechRecordRevision: {
              where: {
                status: TECH_REVISION_STATUS.approved,
              },
            },
          },
        });

        for (const techRecord of techRecords) {
          let assistanceInfo: AssistanceRecordForm =
            techRecord.information as {} as AssistanceRecordForm;

          if (
            assistanceInfo &&
            !Number.isNaN(assistanceInfo.interventionTime) &&
            techRecord.TechRecordRevision.length >= 1
          ) {
            const approved = techRecord.TechRecordRevision.filter((rev) => {
              if (rev.status == TECH_REVISION_STATUS.approved) {
                return rev;
              }
            });

            if (approved.length >= 1 && appointment.type == 'CONSULT') {
              hoursExecutedCount += Number.parseInt(
                assistanceInfo.interventionTime,
              );
            } else if (approved.length >= 1) {
              hoursExecutedCountComplete += Number.parseInt(
                assistanceInfo.interventionTime,
              );
            }
          }
        }
      }

      // Set Hours executed for the business.
      infoBusinessRow.hoursPlaned = '42'; // Constant Value.
      infoBusinessRow.hoursExecuted = hoursExecutedCount.toString();
      infoBusinessRow.hoursPlanedComplete = '52'; // Constant Value.
      infoBusinessRow.hoursExecutedComplete = (
        hoursExecutedCount + hoursExecutedCountComplete
      ).toString();

      response.push(infoBusinessRow);
    }

    return response;
  }

  async getAppointmentHoursByOneBusiness(business_id: string) {
    let response: BusinessHoursReportList = [];

    const business = await this.prisma.businessProfile.findUnique({
      where: {
        id: business_id,
      },
    });

    let infoBusinessRow: BusinessHoursReport = {
      businessId: '',
      businessName: '',
      businessNit: '',
      hoursExecuted: '',
      hoursPlaned: '',
      hoursExecutedComplete: '',
      hoursPlanedComplete: '',
    };

    const businessInfo = business.data as {
      DataBusiness?: DataBusinessDto;
    };

    // Set basic business info
    infoBusinessRow.businessId = business.id;
    infoBusinessRow.businessName = businessInfo.DataBusiness?.BusinessName;
    infoBusinessRow.businessNit = businessInfo.DataBusiness?.RUT.toString();

    const appointments = await this.prisma.appointments.findMany({
      where: { businessProfile_id: business.id },
    });

    let hoursExecutedCount = 0;
    let hoursExecutedCountComplete = 0;

    for (const appointment of appointments) {
      const techRecords = await this.prisma.techAssistanceRecord.findMany({
        where: {
          appointment_id: appointment.id,
        },
        include: {
          TechRecordRevision: {
            where: {
              status: TECH_REVISION_STATUS.approved,
            },
          },
        },
      });

      for (const techRecord of techRecords) {
        let assistanceInfo: AssistanceRecordForm =
          techRecord.information as {} as AssistanceRecordForm;

        if (
          assistanceInfo &&
          !Number.isNaN(assistanceInfo.interventionTime) &&
          techRecord.TechRecordRevision.length >= 1
        ) {
          const approved = techRecord.TechRecordRevision.filter((rev) => {
            if (rev.status == TECH_REVISION_STATUS.approved) {
              return rev;
            }
          });

          if (approved.length >= 1 && appointment.type == 'CONSULT') {
            hoursExecutedCount += Number.parseInt(
              assistanceInfo.interventionTime,
            );
          } else if (approved.length >= 1) {
            hoursExecutedCountComplete += Number.parseInt(
              assistanceInfo.interventionTime,
            );
          }
        }
      }
    }

    // Set Hours executed for the business.
    infoBusinessRow.hoursPlaned = '42'; // Constant Value.
    infoBusinessRow.hoursExecuted = hoursExecutedCount.toString();
    infoBusinessRow.hoursPlanedComplete = '52'; // Constant Value.
    infoBusinessRow.hoursExecutedComplete = (
      hoursExecutedCount + hoursExecutedCountComplete
    ).toString();

    return infoBusinessRow;
  }

  /////////////////////////////////
  // eMail Notifications

  async notifyCertificateConsultor(
    tech_record_id: string,
    reject_observation: string,
  ) {
    const techRecord = await this.prisma.techAssistanceRecord.findUnique({
      where: {
        id: tech_record_id,
      },
    });

    if (techRecord) {
      //Logger.debug(techRecord);

      const appointment = await this.prisma.appointments.findUnique({
        where: { id: techRecord.appointment_id },
      });

      //Logger.debug(appointment);

      if (appointment) {
        const consultor = await this.prisma.userProfile.findFirst({
          where: {
            role: UserRoles.CONSULTOR_PYMES,
            businessProfile: {
              some: {
                id: appointment.businessProfile_id,
              },
            },
          },
        });

        //Logger.debug(consultor);

        const infoConsultant: UserRole = consultor.type as {} as UserRole;
        const registeredEmail = consultor.email && consultor.email != '';

        if (registeredEmail) {
          const appointmentDate = appointment.date.toLocaleDateString();
          const techRecordInfo =
            techRecord.information as {} as AssistanceRecordForm;
          const techRecordDate = `${new Date(techRecordInfo.date).toLocaleDateString()} ${new Date(techRecordInfo.date).toLocaleTimeString()}`;
          const techRegisterCreationDate =
            techRecord.created_at.toLocaleDateString();
          const TechRegisterDate = new Date(
            techRecordInfo.date,
          ).toLocaleDateString();
          const techRegisterAppointmentDate = `${TechRegisterDate} - ${techRecordInfo.startTime}`;

          const consultor_email = consultor.email;
          const email_subject = `El acta para la empresa ${techRecordInfo.businessName} ha sido rechazada`;
          const html_body = techRegisterRejectNotificationMailBody(
            techRegisterAppointmentDate,
            techRecordDate,
            techRecordInfo.businessName,
            reject_observation,
          );
          const plain_body = techRegisterRejectNotificationTextMailBody(
            techRegisterAppointmentDate,
            techRecordDate,
            techRecordInfo.businessName,
            reject_observation,
          );
          const sendStatus = await this.emailService.sendEmailComplete(
            consultor_email,
            email_subject,
            html_body,
            plain_body,
          );

          //Logger.debug(sendStatus);
          return true;
        }
      }
    }

    Logger.debug(
      `No se ha encontrado el email del consultor para la cita ${tech_record_id}`,
    );
  }

  async notifyNewCertificateToSign(
    consultorName: string,
    businessName: string,
    createdDate: string,
    business_id: string,
  ) {
    const businessInfo = await this.prisma.businessProfile.findUnique({
      where: {
        id: business_id,
      },
    });

    const data = businessInfo.data as {
      Contact: ContactDto;
    };

    if (data.Contact.MailContact) {
      const email_subject = `Nueva acta pendiente para firma, empresa ${businessName}`;
      const html_body = techRegisterSignPendingNotificationMailBody(
        createdDate,
        consultorName,
        businessName,
      );
      const plain_body = techRegisterSignPendingNotificationTextBody(
        createdDate,
        consultorName,
        businessName,
      );
      const sendStatus = await this.emailService.sendEmailComplete(
        data.Contact.MailContact,
        email_subject,
        html_body,
        plain_body,
      );

      return sendStatus;
    }

    Logger.fatal(
      `The business profile Id ${business_id} not have an eMail registered: ${data.Contact.MailContact}`,
    );
    return;
  }

  ////////////////////////////////////
  // Tech Support Certificates
  ////////////////////////////////////

  async createCertificate(
    token: string,
    createTechAssistanceDto: CreateTechAssistanceDto,
  ) {
    const client: KeycloakResponse = this.userInfo.jwtDecodeRann(token);
    const register = await this.prisma.techAssistanceRecord.findFirst({
      where: {
        AND: [
          { identification_type: client.identification_type },
          { identification_number: client.identification_number },
          { appointment_id: createTechAssistanceDto.appointmentId },
        ],
      },
    });
    if (!register) {
      let saveData = createTechAssistanceDto;
      const mediaInfo: {
        evidences: Array<string>;
        signOneEvidence: string;
        signTwoEvidence: string;
      } = {
        evidences: undefined,
        signOneEvidence: undefined,
        signTwoEvidence: undefined,
      };

      // AWS S3 storage
      if (
        createTechAssistanceDto.evidence &&
        'length' in createTechAssistanceDto.evidence
      ) {
        const evidences = [];

        for (const element of createTechAssistanceDto.evidence) {
          evidences.push(await this.s3Service.uploadBase64File(element));
        }
        //Logger.debug('AWS S3 Push');
        //Logger.debug(evidences);
        mediaInfo.evidences = evidences;
      }
      //else {
      //  Logger.error('invalid data');
      //  Logger.error(createTechAssistanceDto.evidence);
      //}

      if (
        createTechAssistanceDto.signOneEvidence
        //&& createTechAssistanceDto.signTwoEvidence
      ) {
        mediaInfo.signOneEvidence = await this.s3Service.uploadBase64File(
          createTechAssistanceDto.signOneEvidence[0],
        );
        //mediaInfo.signTwoEvidence = await this.s3Service.uploadBase64File(
        //  createTechAssistanceDto.signTwoEvidence[0],
        //);
      }

      //else {
      //  Logger.error('invalid data');
      //  Logger.error(createTechAssistanceDto.signOneEvidence);
      //  Logger.error(createTechAssistanceDto.signTwoEvidence);
      //}
      // AWS S3 storage

      saveData.evidence = undefined;
      saveData.signOneEvidence = undefined;
      //saveData.signTwoEvidence = undefined;

      let informationJson: {} = { ...saveData };

      const newCertificate = await this.prisma.techAssistanceRecord.create({
        data: {
          updated_at: new Date().toISOString(),
          identification_type: client.identification_type,
          identification_number: client.identification_number,
          appointment_id: createTechAssistanceDto.appointmentId,
          information: informationJson,
          download_links: mediaInfo,
        },
      });

      if (newCertificate) {
        const consultorName = createTechAssistanceDto.assignedConsultor;
        const businessName = createTechAssistanceDto.businessName;
        const createdDate = newCertificate.updated_at.toLocaleTimeString();
        const business_id = createTechAssistanceDto.businessId;

        await this.notifyNewCertificateToSign(
          consultorName,
          businessName,
          createdDate,
          business_id,
        );

        // update appointment status:
        await this.prisma.appointments.update({
          where: {
            id: createTechAssistanceDto.appointmentId,
          },
          data: {
            attendance: 'Signing',
          },
        });
        return newCertificate;
      }
    }
  }

  async patchCertificate(
    token: string,
    patchTechAssistanceDto: PatchTechAssistanceDto,
  ) {
    const client: KeycloakResponse = this.userInfo.jwtDecodeRann(token);
    const registers = await this.prisma.techAssistanceRecord.findMany({
      where: {
        appointment_id: patchTechAssistanceDto.appointmentId,
      },
    });
    if (registers) {
      const regNumber = registers.length + 1;

      let saveData = patchTechAssistanceDto;

      const original = await this.prisma.techAssistanceRecord.findFirstOrThrow({
        where: {
          id: patchTechAssistanceDto.originalId,
        },
      });

      interface mediaInfoObj {
        evidences: Array<any>;
        signOneEvidence: string;
        signTwoEvidence: string;
      }

      const mediaInfo: mediaInfoObj =
        original.download_links as {} as mediaInfoObj;

      // remove elements
      if (patchTechAssistanceDto.imagesMarkedToRemove) {
        mediaInfo.evidences = mediaInfo.evidences.filter((ev, index) => {
          if (patchTechAssistanceDto.imagesMarkedToRemove.includes(index)) {
            //Logger.debug('Filter number' + index);
          } else {
            return ev;
          }
        });
      }

      // AWS S3 storage
      if (
        patchTechAssistanceDto.evidence &&
        'length' in patchTechAssistanceDto.evidence
      ) {
        const evidences = [];

        for (const element of patchTechAssistanceDto.evidence) {
          evidences.push(await this.s3Service.uploadBase64File(element));
        }
        //Logger.debug('AWS S3 Push');
        //Logger.debug(evidences);
        mediaInfo.evidences = [...mediaInfo.evidences, ...evidences];
      }
      /* else {
        Logger.error('invalid data');
        Logger.error(patchTechAssistanceDto.evidence);
      }*/

      if (patchTechAssistanceDto.signOneEvidence) {
        mediaInfo.signOneEvidence = await this.s3Service.uploadBase64File(
          patchTechAssistanceDto.signOneEvidence[0],
        );
      }
      if (patchTechAssistanceDto.signTwoEvidence) {
        mediaInfo.signTwoEvidence = await this.s3Service.uploadBase64File(
          patchTechAssistanceDto.signTwoEvidence[0],
        );
      }
      // AWS S3 storage

      saveData.evidence = undefined;
      saveData.signOneEvidence = undefined;
      saveData.signTwoEvidence = undefined;

      let informationJson: {} = { ...saveData, consecutive: regNumber };

      //Logger.debug(informationJson);
      //Logger.debug(mediaInfo);

      ///////////////
      // Creates a new register because is necessary to store history.
      return await this.prisma.techAssistanceRecord.create({
        data: {
          updated_at: new Date().toISOString(),
          identification_type: client.identification_type,
          identification_number: client.identification_number,
          appointment_id: patchTechAssistanceDto.appointmentId,
          information: informationJson,
          download_links: mediaInfo as {},
        },
      });
    }
  }

  async listCertificatesAnalyst(token: string, query: queryByBusinessDto) {
    /*
    const registers = await this.prisma.appointments.findMany({
      select:{
        businessProfile:{
          select:{
            id:true,
            data:true,
          }     
        },
        TechAssistanceRecord:{
          select:{
            id:true,
            appointment_id:true,
            created_at:true,
            TechRecordRevision:{
              select:{
                id:true,
                status:true,
              },              
            }
          },
        }
      },
      where:{
        businessProfile_id:query.businessId,        
      }
    });
    */

    const registers = await this.prisma.$queryRaw`
    SELECT 
    "Appointments".id as appointment_id,
    "Appointments"."businessProfile_id" as business_id,
    "TechAssistanceRecord".id as tech_record_id,
    "TechRecordRevision".id as tech_record_revision_id,

    "Appointments"."createdAt" as appointment_created_at,
    "TechAssistanceRecord".created_at as tech_assistance_created_at,
    "TechRecordRevision".created_at as tech_revision_created_at,

    "Appointments".date as appointment_date,
    "Appointments".attendance as appointment_attendance,
    "TechRecordRevision".status as tech_revision_status

    FROM "Appointments"
    INNER JOIN "BusinessProfile" ON "Appointments"."businessProfile_id" = "BusinessProfile".id
    INNER JOIN "TechAssistanceRecord" ON "Appointments".id = "TechAssistanceRecord".appointment_id
    LEFT JOIN "TechRecordRevision" ON "TechAssistanceRecord".id = "TechRecordRevision".record_id
    WHERE 
    "BusinessProfile".id = ${query.businessId}::uuid
    AND "TechAssistanceRecord"."signStatus" = 'SIGNED'`;

    //Logger.debug(registers);

    // filter by status / create pending-status on register?

    // return formatted array to print in the table.

    return registers;
  }

  async getCertificateAnalyst(token: string, id: string) {
    return await this.prisma.techAssistanceRecord.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createCertificateRevision(
    token: string,
    query: CreateTechAssistanceRevision,
  ) {
    const client: KeycloakResponse = this.userInfo.jwtDecodeRann(token);
    const register = await this.prisma.techRecordRevision.findFirst({
      where: {
        record_id: query.record_id,
      },
      include: {
        TechAssistanceRecord: {
          include: {
            Appointments: {
              include: {
                businessProfile: true,
              },
            },
          },
        },
      },
    });
    if (!register) {
      const techAssistance = await this.prisma.techAssistanceRecord.findFirst({
        where: {
          id: query.record_id,
        },
      });

      switch (query.status) {
        case TECH_REVISION_STATUS.approved:
          // update appointment status:
          await this.prisma.appointments.update({
            where: {
              id: techAssistance.appointment_id,
            },
            data: {
              attendance: 'Attended',
            },
          });
          break;

        case TECH_REVISION_STATUS.rejected:
          const observation = query.review.revision.observation ?? '';
          await this.notifyCertificateConsultor(query.record_id, observation);

          // update appointment status:
          await this.prisma.appointments.update({
            where: {
              id: techAssistance.appointment_id,
            },
            data: {
              attendance: 'Rejected',
            },
          });
          break;

        default:
          throw new Error('Invalid revision status');
      }

      const techRecordRevision = await this.prisma.techRecordRevision.create({
        data: {
          record_id: query.record_id,
          review: query.review as {},
          status: query.status,
          identification_type: client.identification_type,
          identification_number: client.identification_number,
          updated_at: new Date().toISOString(),
        },
      });

      if (techRecordRevision) {
        const businessProfile = await this.prisma.businessProfile.findFirst({
          where: {
            appointments: {
              some: {
                TechAssistanceRecord: {
                  some: {
                    id: query.record_id,
                  },
                },
              },
            },
          },
        });

        const appointments = await this.prisma.appointments.findMany({
          where: { businessProfile_id: businessProfile.id },
        });

        let hoursExecutedCount = 0;
        let hoursExecutedCountComplete = 0;

        for (const appointment of appointments) {
          const techRecords = await this.prisma.techAssistanceRecord.findMany({
            where: {
              appointment_id: appointment.id,
            },
            include: {
              TechRecordRevision: {
                where: {
                  status: TECH_REVISION_STATUS.approved,
                },
              },
            },
          });

          for (const techRecord of techRecords) {
            let assistanceInfo: AssistanceRecordForm =
              techRecord.information as {} as AssistanceRecordForm;

            if (
              assistanceInfo &&
              !Number.isNaN(assistanceInfo.interventionTime) &&
              techRecord.TechRecordRevision.length >= 1
            ) {
              const approved = techRecord.TechRecordRevision.filter((rev) => {
                if (rev.status == TECH_REVISION_STATUS.approved) {
                  return rev;
                }
              });

              if (approved.length >= 1 && appointment.type == 'CONSULT') {
                hoursExecutedCount += Number.parseInt(
                  assistanceInfo.interventionTime,
                );
              } else if (approved.length >= 1) {
                hoursExecutedCountComplete += Number.parseInt(
                  assistanceInfo.interventionTime,
                );
              }
            }
          }
        }

        console.log(hoursExecutedCount, hoursExecutedCountComplete);
        const dataBusiness = businessProfile.data as {
          DataBusiness: DataBusinessDto;
        };
        if (hoursExecutedCount + hoursExecutedCountComplete >= 52) {
          await this.emailService.sendEmail(
            'juan.males@olsoftware.com',
            'Notificación de horas completadas para la empresa ' +
              dataBusiness.DataBusiness.BusinessName,
            businessCompletedHourNotificationTextMailBody(
              dataBusiness.DataBusiness.BusinessName,
              dataBusiness.DataBusiness.RUT.toString(),
            ),
          );
        }
      }

      return techRecordRevision;
    }
  }

  async getConsultantBusinessReport(token: string) {
    let response: BusinessAttendedReportList = [];

    const consultants = await this.prisma.userProfile.findMany({
      where: {
        role: UserRoles.CONSULTOR_PYMES,
      },
      include: {
        businessProfile: true,
      },
    });

    for (const consultant of consultants) {
      let infoBusinessRow: BusinessAttendedReport = {
        consultantId: '',
        consultantName: '',
        consultantIdentification: '',
        businessAttended: '',
        businessList: [],
      };

      const consultantInfo = consultant.type as {} as UserRole;

      // Set basic business info
      infoBusinessRow.consultantId = consultant.id;
      infoBusinessRow.consultantName = consultant.name;
      infoBusinessRow.consultantIdentification =
        consultant.identification_number;

      /*const businessList = await this.prisma.userProfile.findMany({
        where: {
          information: {
            path: ['consultantId'],
            equals: consultant.id,
          },
        },
      });*/

      let businessAttendedCount = consultant.businessProfile.length ?? 0;

      for (const business of consultant.businessProfile) {
        /*const businessProfile = await this.prisma.businessProfile.findUnique({
          where: {
            id: business.id,
          },
        });*/

        //Logger.debug('tech rev records', techRecordRev);
        const businessData = business.data as {
          DataBusiness?: DataBusinessDto;
        };

        if (businessData) {
          infoBusinessRow.businessList.push({
            name: businessData.DataBusiness.BusinessName,
            nit: businessData.DataBusiness.RUT.toString(),
            city: businessData.DataBusiness.City,
            department: businessData.DataBusiness.Department,
          } as BusinessGeneralInfo);
        }
      }

      infoBusinessRow.businessAttended = businessAttendedCount.toString();

      response.push(infoBusinessRow);
    }

    return response;
  }

  async listRejectedCertificateRevision(token: string) {
    const userInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const consultant = await this.prisma.userProfile.findFirstOrThrow({
      where: {
        AND: [
          {
            role: UserRoles.CONSULTOR_PYMES,
          },
          {
            identification_number: userInfo.identification_number,
          },
          {
            identification_type: userInfo.identification_type,
          },
        ],
      },
    });

    if (consultant) {
      // Select last revisions for the tech certificates
      const registers = await this.prisma.$queryRaw`
        SELECT 
        DISTINCT ON (appointment_id)
        "Appointments".id as appointment_id,
        "Appointments"."businessProfile_id" as business_id,
        "TechAssistanceRecord".id as tech_record_id,
        "TechRecordRevision".id as tech_record_revision_id,

        "Appointments"."createdAt" as appointment_created_at,
        "TechAssistanceRecord".created_at as tech_assistance_created_at,
        "TechRecordRevision".created_at as tech_revision_created_at,

        "Appointments".date as appointment_date,
        "Appointments".attendance as appointment_attendance,
        "TechRecordRevision".status as tech_revision_status

        FROM "Appointments"
        INNER JOIN "BusinessProfile" ON "Appointments"."businessProfile_id" = "BusinessProfile".id
        INNER JOIN "TechAssistanceRecord" ON "Appointments".id = "TechAssistanceRecord".appointment_id
        LEFT JOIN "TechRecordRevision" ON "TechAssistanceRecord".id = "TechRecordRevision".record_id
        WHERE             
        "TechAssistanceRecord".identification_type = ${consultant.identification_type} AND
        "TechAssistanceRecord".identification_number = ${consultant.identification_number}
        ORDER BY appointment_id, tech_assistance_created_at  DESC`;

      // from the last revisions filter rejected ones.
      if (Array.isArray(registers) && registers.length >= 1) {
        const rejectedRevisions = registers.filter(
          (reg) => reg.tech_revision_status == TECH_REVISION_STATUS.rejected,
        );
        return rejectedRevisions;
      }
      return [];
    }
    return [];
  }

  // For Utopia

  async listCertificatesSignPendingBusiness(token: string) {
    const clientData: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const documentTypeId = await this.prisma.document_Type.findFirstOrThrow({
      where: {
        name: clientData.identification_type,
      },
    });

    const businessInfo = await this.prisma.businessProfile.findFirstOrThrow({
      where: {
        AND: [
          { document_type_id: documentTypeId.id },
          { document_number: clientData.identification_number },
        ],
      },
    });

    const registers = await this.prisma.$queryRaw`
      SELECT 
      "Appointments".id as appointment_id,
      "Appointments"."businessProfile_id" as business_id,
      "TechAssistanceRecord".id as tech_record_id,
      "TechRecordRevision".id as tech_record_revision_id,

      "Appointments"."createdAt" as appointment_created_at,
      "TechAssistanceRecord".created_at as tech_assistance_created_at,
      "TechRecordRevision".created_at as tech_revision_created_at,

      "Appointments".date as appointment_date,
      "Appointments".attendance as appointment_attendance,
      "TechRecordRevision".status as tech_revision_status,

      jsonb_path_query("TechAssistanceRecord".information::jsonb, '$.assignedConsultor') AS consultant_name        

      FROM "Appointments"
      INNER JOIN "BusinessProfile" ON "Appointments"."businessProfile_id" = "BusinessProfile".id
      INNER JOIN "TechAssistanceRecord" ON "Appointments".id = "TechAssistanceRecord".appointment_id
      LEFT JOIN "TechRecordRevision" ON "TechAssistanceRecord".id = "TechRecordRevision".record_id
      WHERE 
      "BusinessProfile".id = ${businessInfo.id}::uuid
      AND "TechRecordRevision".id is NULL
      AND "TechAssistanceRecord"."signStatus" = 'PENDING'`;

    // from the last revisions filter rejected ones.
    //if (Array.isArray(registers) && registers.length >= 1) {
    //  const rejectedRevisions = registers.filter(
    //    (reg) => reg.tech_revision_status == TECH_REVISION_STATUS.approved,
    //  );
    //  return rejectedRevisions;
    //}

    return registers ?? [];
  }

  async signCertificateByBusiness(
    token: any,
    businessSignQuery: BusinessSignQueryDto,
  ) {
    const original = await this.prisma.techAssistanceRecord.findFirstOrThrow({
      where: {
        id: businessSignQuery.id,
      },
    });

    interface mediaInfoObj {
      evidences: Array<any>;
      signOneEvidence: string;
      signTwoEvidence: string | undefined;
    }

    const mediaInfo: mediaInfoObj =
      original.download_links as {} as mediaInfoObj;

    if (businessSignQuery.signTwoEvidence) {
      mediaInfo.signTwoEvidence = await this.s3Service.uploadBase64File(
        businessSignQuery.signTwoEvidence[0],
      );
    }
    // AWS S3 storage
    //businessSignQuery.signTwoEvidence = undefined;

    const originalInfo = original.information as {};
    let businessSignData = {
      signTwoName: businessSignQuery.signTwoName,
      signTwoDocument: businessSignQuery.signTwoDocument,
    };

    const updatedInfo = { ...originalInfo, ...businessSignData };

    const updatedRecord = await this.prisma.techAssistanceRecord.update({
      where: {
        id: businessSignQuery.id,
      },
      data: {
        updated_at: new Date().toISOString(),
        information: updatedInfo,
        download_links: mediaInfo as {},
        signStatus: 'SIGNED',
      },
    });

    // update appointment status:
    await this.prisma.appointments.update({
      where: {
        id: updatedRecord.appointment_id,
      },
      data: {
        attendance: 'Revision',
      },
    });

    return updatedRecord;
  }
}

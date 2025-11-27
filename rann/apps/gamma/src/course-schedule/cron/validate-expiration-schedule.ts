import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '@app/shared/email/email.service';
import {
  getCourseCancelNotifyMailBody,
  getCourseCancelNotifyTextMailBody,
  getCourseNotificationMailBody,
  getCourseNotificationTextMailBody,
} from '../entities/emailTemplates';
import {
  QueryCourseRegistration,
  RegistrationInformation,
  UserCourse,
} from '../../crea-api-client/entities/crea-api-client.entity';
import { CreaApiClientService } from '../../crea-api-client/crea-api-client.service';
import {
  MallaItemData,
  QueryMallaInformation,
} from '../../crea-api-client/entities/crea-api-malla.entity';
import { $Enums } from '@prisma/client';

@Injectable()
export class ValidateExpirationSchedule {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly emailService: EmailService,
    private readonly creaApiClient: CreaApiClientService,
  ) {}

  @Cron('0 0 0 * * *')
  async handleCron() {
    await this.validateExpirationSchedule();
  }

  // Unemployed Courses validation
  @Cron('0 0 0 * * *')
  async handleMinuteCron() {
    await this.validateUnemployedExpirationDate();
  }

  // Aux Functions
  private async findCreaProgramId(courseDbInfo) {
    let creaMallaQuery = {
      items_per_page: 100,
      page: 1,
    } as QueryMallaInformation;

    let courseIdFromCrea: MallaItemData;
    let terminate = false;
    do {
      //Logger.debug("query malla:")
      //Logger.debug(creaMallaQuery)
      const mallasCrea =
        await this.creaApiClient.getMallaInformation(creaMallaQuery);

      //Logger.debug(mallasCrea.total_pages);

      if (mallasCrea) {
        courseIdFromCrea = mallasCrea.data.find((malla) => {
          //Logger.debug(`>${malla.nombre.trim().to()}< =  >${courseDbInfo.name.trim().to()}<`)
          return (
            malla.nombre.trim().toLowerCase() ==
            courseDbInfo.name.trim().toLowerCase()
          );
        });
        //Logger.debug(courseIdFromCrea)
        if (courseIdFromCrea) {
          terminate = true;
        }
        if (!courseIdFromCrea && !mallasCrea.has_more) {
          terminate = true;
        } else if (!courseIdFromCrea && mallasCrea.has_more) {
          creaMallaQuery.page = creaMallaQuery.page + 1;
        }
      } else {
        Logger.fatal('Invalid response from Crea API:' + mallasCrea);
        terminate = true;
      }
    } while (!terminate);

    Logger.debug(courseIdFromCrea);

    return courseIdFromCrea;
  }

  private async validateEntrepreneurshipCourse(courseDbInfo): Promise<boolean> {
    var courseNameNorm = courseDbInfo.name
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    if (
      courseNameNorm.toLowerCase().contains('emprendimiento') ||
      courseNameNorm.toLowerCase().contains('innovacion') ||
      courseNameNorm.toLowerCase().contains('creactivate')
    ) {
      return true;
    }
    return false;
  }

  private async createPsyTestForProgram(
    courseRegistration: QueryCourseRegistration,
    scheduleId: string,
  ) {
    const defaultPsyTest = 'Test Empresarial';

    const schedule = await this.prisma.courseSchedule.findUnique({
      where: {
        id: scheduleId,
      },
    });

    const courseDbInfo = await this.prisma.course.findUnique({
      where: {
        id: schedule.course_id,
      },
    });

    let newGroup = await this.prisma.psyTestGroup.findFirst({
      where: {
        crea_course_id: schedule.id,
      },
    });

    if (!newGroup) {
      newGroup = await this.prisma.psyTestGroup.create({
        data: {
          name: `${courseDbInfo.name}_${new Date().toISOString()}`,
          number_persons: courseRegistration.datos.Usuarios.length,
          file_name: 'Matricula Crea',
          md5_sum: '',
          current_status: 'PENDING',
          updated_at: new Date(),
          crea_course_id: schedule.id,
          crea_entrepreneurship: true,
        },
      });
    }

    const personsCreated = await Promise.all(
      courseRegistration.datos.Usuarios.map((person) => {
        const existent = this.prisma.psyTestPerson.findFirst({
          where: {
            AND: [
              { document_type: person.tipo_identificacion.toUpperCase() },
              { document_number: person.identificacion },
            ],
          },
        });

        const newReg =
          existent ??
          this.prisma.psyTestPerson.create({
            data: {
              document_number: person.identificacion,
              email: person.email,
              name: `${person.nombre1} ${person.nombre2}`,
              last_name: `${person.apellido1} ${person.apellido2}`,
              updated_at: new Date(),
            },
          });
        return newReg;
      }),
    );

    //Logger.debug(personsCreated);

    if (personsCreated && personsCreated.length) {
      const examInfo = await this.prisma.psyTestExam.findFirst({
        where: {
          name: defaultPsyTest,
        },
      });

      for (const newPerson of personsCreated) {
        await this.prisma.psyTestGroupAssignation.create({
          data: {
            PsyTestExam_id: examInfo.id,
            PsyTestGroup_id: newGroup.id,
            PsyTestPerson_id: newPerson.id,
          },
        });
      }
    }
  }

  private async notifyClosedCourseAnalysts(
    scheduleId: string,
    registerCount: number,
    minimumReq: number,
  ) {
    const scheduleInfo = await this.prisma.courseSchedule.findUnique({
      where: {
        id: scheduleId,
      },
      include: {
        course: true,
      },
    });

    if (scheduleInfo) {
      const analystsList = await this.prisma.userProfile.findMany({
        where: {
          role: 'analista_pymes',
        },
      });

      if (analystsList.length) {
        for (const analyst of analystsList) {
          const fullEmailBody = getCourseCancelNotifyMailBody(
            scheduleInfo.course.name,
            scheduleInfo.name,
            registerCount,
            minimumReq,
          );
          const plainEmailBody = getCourseCancelNotifyTextMailBody(
            scheduleInfo.course.name,
            scheduleInfo.name,
            registerCount,
            minimumReq,
          );

          await this.emailService.sendEmailComplete(
            analyst.email,
            `Curso sin inscritos suficientes ${scheduleInfo.name}`,
            fullEmailBody,
            plainEmailBody,
          );
        }
      } else {
        Logger.warn(
          'There is no analysts found to notify the closing course, with id: ',
          scheduleId,
        );
      }
    } else {
      Logger.fatal('invalid schedule to notify the analysts: ', scheduleId);
    }
  }

  /////////////////////////////////////
  // Validate Expiration
  private async validateExpirationSchedule(): Promise<void> {
    console.log('VALIDATE EXPIRATION SCHEDULE');
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const scheduleAlreadyStarted = await this.prisma.courseSchedule.findMany({
      where: {
        startDate: {
          lte: todayEnd,
        },
      },
    });

    for (const schedule of scheduleAlreadyStarted) {
      const curriculumCount = await this.prisma.courseCurriculumMesh.count({
        where: {
          courseSchedule_id: schedule.id,
        },
      });

      if (
        curriculumCount <=
        this.config.getOrThrow('numberEmployeesToStartCourse')
      ) {
        await this.prisma.courseSchedule.update({
          where: { id: schedule.id },
          data: { state: 'Created' },
        });
        await this.emailService.sendEmail(
          'juan.males@olsoftware.com',
          'Prueba correo',
          '<html lang="en"><body><h1>Prueba correo</h1></body></html>',
        );
        console.log(
          `Schedule ${schedule.id} desactivado: solo ${curriculumCount} contenidos.`,
        );
      } else {
        console.log(
          `Schedule ${schedule.id} sigue activo: ${curriculumCount} contenidos.`,
        );
      }
    }
  }

  /////////////////////////////////////
  // Unemployed Courses validation
  private async validateUnemployedExpirationDate(): Promise<void> {
    Logger.warn(
      `START unemployed courses check  - ${new Date().toISOString()}`,
    );

    const MIN_NUM_PERSONS_REGISTERED = 30; //this.config.getOrThrow('numberEmployeesToStartCourse')
    const ENABLE_EMAIL_NOTIFY = true;

    const today = new Date();

    today.setHours(23, 59, 59, 999);
    const inTwoDaysNight = new Date(today); // clone the date
    inTwoDaysNight.setDate(today.getDate() + 2);

    today.setHours(0, 0, 0, 0);
    const inTwoDaysMorning = new Date(today); // clone the date
    inTwoDaysMorning.setDate(today.getDate() + 2);

    Logger.debug(
      'in two days ' +
        inTwoDaysMorning.toISOString() +
        ' - ' +
        inTwoDaysNight.toISOString(),
    );

    const scheduleAboutToStart = await this.prisma.courseSchedule.findMany({
      where: {
        startDate: {
          gte: inTwoDaysMorning,
          lte: inTwoDaysNight,
        },
      },
      include: {
        course: true,
      },
    });

    Logger.debug('Courses found: ' + scheduleAboutToStart.length.toString());

    for (const schedule of scheduleAboutToStart) {
      const courseRegisterCount = await this.prisma.courseRegistration.findMany(
        {
          where: {
            courseSchedule_id: schedule.id,
          },
        },
      );

      Logger.debug(
        'Persons registered: ' + courseRegisterCount.length.toString(),
      );

      if (courseRegisterCount.length < MIN_NUM_PERSONS_REGISTERED) {
        await this.prisma.courseSchedule.update({
          where: { id: schedule.id },
          data: { state: 'Cancelled' },
        });

        await this.notifyClosedCourseAnalysts(
          schedule.id,
          courseRegisterCount.length,
          MIN_NUM_PERSONS_REGISTERED,
        );

        await this.prisma.creaCourseRegisterHistory.create({
          data:{
            students_min: MIN_NUM_PERSONS_REGISTERED,
            students_num: courseRegisterCount.length,
            new_state: 'Cancelled',
            courseSchedule_id: schedule.id,            
          }
        });
      } else {
        // Get course information
        const courseDbInfo = await this.prisma.course.findUnique({
          where: {
            id: schedule.course_id,
          },
        });

        //find programId on crea.
        const courseIdFromCrea = await this.findCreaProgramId(courseDbInfo);

        if (!courseIdFromCrea) {
          Logger.fatal(
            `No se encuentra el Id del curso en Crea para el curso.${courseDbInfo.name}`,
          );
        }

        let courseRegistration: QueryCourseRegistration = {
          datos: undefined,
        };

        let courseInformation: RegistrationInformation = {
          id_regional: parseInt(schedule.id_regional),
          id_programa: parseInt(courseIdFromCrea.id),
          codigo_matricula: schedule.id,
          capacidad: 40, // TODO:FALTA (CONST 30)
          costo: schedule.cost,
          fecha_desde: schedule.startDate.toISOString().slice(0, 10),
          fecha_hasta: schedule.endDate.toISOString().slice(0, 10),
          Usuarios: [],
        };

        for (const registeredPerson of courseRegisterCount) {
          Logger.debug(
            'registered Person: ' + registeredPerson.document_number,
          );

          courseInformation.Usuarios.push({
            nombre1: registeredPerson.firstName,
            nombre2: registeredPerson.firstLastName,
            apellido1: registeredPerson.middleName,
            apellido2: registeredPerson.middleLastName,
            celular: parseInt(registeredPerson.phoneNumber),
            email: registeredPerson.email,
            genero: registeredPerson.gender, // TODO:FALTA Activo
            identificacion: registeredPerson.document_number,
            tipo_identificacion: registeredPerson.document_type,
          } as UserCourse);
        }

        // Add Registration Information.
        courseRegistration.datos = courseInformation;

        Logger.debug(courseRegistration);
        Logger.debug(courseInformation);

        // Query CREA API
        const registration =
          await this.creaApiClient.createCourseRegistration(courseRegistration);

        Logger.debug('Registration Status:');
        Logger.debug(registration);

        if (!registration || JSON.stringify(registration).includes('error')) {
          Logger.fatal('ERROR ON REGISTER CREA COURSE: ' + registration);
          return;
        }

        // Notify Persons if register success (Get registered persons eMails).
        if (registration.status == 'success') {
          // Email Notify
          if (ENABLE_EMAIL_NOTIFY) {
            for (const registeredPerson of courseRegistration.datos.Usuarios) {
              await this.emailService.sendEmailComplete(
                registeredPerson.email,
                `Bienvenido al curso ${schedule.course.name}`,
                getCourseNotificationMailBody(
                  schedule.course.name,
                  schedule.startDate.toLocaleString(),
                ),
                getCourseNotificationTextMailBody(
                  schedule.course.name,
                  schedule.startDate.toLocaleString(),
                ),
              );
            }

            await this.prisma.courseSchedule.update({
              where: { id: schedule.id },
              data: { state: 'Active' },
            });

            await this.prisma.creaCourseRegisterHistory.create({
              data:{
                students_min: MIN_NUM_PERSONS_REGISTERED,
                students_num: courseRegisterCount.length,
                new_state: 'Active',
                courseSchedule_id: schedule.id,            
              }
            });
          } else {
            Logger.warn(
              `/!\\ The eMail notification is disabled, ${courseRegisterCount.length} eMails skipped.`,
            );
          }

          // PsyTest for programs
          if (await this.validateEntrepreneurshipCourse(courseDbInfo)) {
            await this.createPsyTestForProgram(courseRegistration, schedule.id);
          }
        }
      }
    }
    Logger.warn(`END unemployed courses check  - ${new Date().toISOString()}`);
  }
}

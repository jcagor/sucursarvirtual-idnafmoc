import { Injectable, Logger } from '@nestjs/common';
import { DataBusinessDto } from './dto/dataBusinessDto';
import { KeycloakResponse } from './types/KeycloakResponse';
import { LegalRepresentativeDto } from './dto/LegalRepresentativeDto';
import { ContactDto } from './dto/ContactDto';
import { PrismaService } from './prisma/prisma.service';
import { DescriptionDto } from './dto/DescriptionDto';
import { DescriptionInfrastructureAndCapacityDto } from './dto/DescriptionInfrastructureAndCapacityDto';
import { FinancialInformationDto } from './dto/FinancialInformationDto';
import { LegalRepresentativeAndContactDto } from './dto/LegalRepresentativeAndContactDto';
import { RuesDto } from './dto/RuesDto';
import { CityService } from './city/city.service';
import { HttpService } from '@nestjs/axios';
import { HealthCheckService } from './health-check/health-check.service';
import { FormProgramDto } from './dto/FormProgramDto';
import { UserInfoService } from './user-info/user-info.service';
import { ErrorInformation } from './types/GeneralTypes.type';

@Injectable()
export class GammaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly city: CityService,
    private readonly httpService: HttpService,
    private readonly healthCheckService: HealthCheckService,
    private readonly userInfo: UserInfoService,
  ) {}

  async findAllCities() {
    // SERVER VERSION <monthDay> 605 june-05
    const SERVER_VERSION = '820';

    try {
      //const cities = await this.city.findAll();
      const views = await this.healthCheckService.checkPostgres();

      if (views && 'length' in views) {
        Logger.debug('main health check OK, read views:', views.length);

        const formattedDate = new Date().toISOString().split('.')[0] + 'Z';

        const response = {
          serviceName: 'RANN',
          serverTime: formattedDate,
          version: SERVER_VERSION,
        };
        return response;
      }
    } catch (error) {
      Logger.fatal('HEALTH CHECK ERROR', error);
      return false;
    }
  }

  async isFormBusinessProfileCompleted(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (!businessProfile) {
      return false;
    }

    const profileData = businessProfile.data as {
      DataBusiness?: DataBusinessDto;
      LegalRepresentative?: LegalRepresentativeDto;
      Contact?: ContactDto;
      Description?: DescriptionDto;
      DescriptionInfrastructureAndCapacity?: DescriptionInfrastructureAndCapacityDto;
      FinancialInformation?: FinancialInformationDto;
    };

    if (
      !profileData.DataBusiness ||
      !profileData.LegalRepresentative ||
      !profileData.Contact ||
      !profileData.Description ||
      !profileData.DescriptionInfrastructureAndCapacity ||
      !profileData.FinancialInformation
    ) {
      return false;
    }

    return true;
  }

  async getProgram(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (!businessProfile) {
      throw new Error('Business profile not found');
    }

    const profileData = businessProfile.data as {
      id_program?: FormProgramDto;
    };

    return {
      id_program: profileData.id_program,
    };
  }

  async getDataBusiness(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const profileData = businessProfile.data as {
      DataBusiness?: DataBusinessDto;
    };

    if (!profileData.DataBusiness) {
      throw new Error('Data business not found');
    }

    return profileData.DataBusiness;
  }

  async getDataLegalRepresentativeAndContact(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const profileData = businessProfile.data as {
      LegalRepresentative?: LegalRepresentativeDto;
      Contact?: ContactDto;
    };

    return { ...profileData.LegalRepresentative, ...profileData.Contact };
  }

  async getDataBusinessDescription(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const profileData = businessProfile.data as {
      Description?: DescriptionDto;
    };

    return profileData.Description;
  }

  async getDataDescriptionInfrastructureAndCapacity(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const profileData = businessProfile.data as {
      DescriptionInfrastructureAndCapacity?: DescriptionInfrastructureAndCapacityDto;
    };

    return profileData.DescriptionInfrastructureAndCapacity;
  }

  async getDataFinancialInformation(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const profileData = businessProfile.data as {
      FinancialInformation?: FinancialInformationDto;
    };

    return profileData.FinancialInformation;
  }

  async saveProgram(token: string, formProgram: FormProgramDto) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });
    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (businessProfile) {
      const data = businessProfile.data as {
        data: object;
      };

      return await this.prisma.businessProfile.update({
        where: { id: businessProfile.id },
        data: {
          data: {
            ...data,
            id_program: formProgram.id_program,
          },
        },
      });
    } else {
      return await this.prisma.businessProfile.create({
        data: {
          document_number: identification_number,
          document_type_id: documentType.id,
          data: { id_program: formProgram.id_program },
        },
      });
    }
  }

  async createDataBusiness(token: string, dataBusiness: DataBusinessDto) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    const businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type: documentType,
      },
    });

    if (!businessProfile) {
      throw new Error('Business profile not found');
    }

    const data = businessProfile.data as {
      data: object;
    };

    return await this.prisma.businessProfile.update({
      where: { id: businessProfile.id },
      data: {
        data: {
          ...data,
          DataBusiness: dataBusiness,
        },
      },
    });
  }

  async createDataLegalRepresentativeAndContact(
    token: string,
    dataLegalRepresentativeAndContact: LegalRepresentativeAndContactDto,
  ) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    let businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    const LegalRepresentative = {
      NameLegalRepresentative:
        dataLegalRepresentativeAndContact.NameLegalRepresentative,
      IdentificationLegalRepresentative:
        dataLegalRepresentativeAndContact.IdentificationLegalRepresentative,
      PhoneLegalRepresentative:
        dataLegalRepresentativeAndContact.PhoneLegalRepresentative,
      MailLegalRepresentative:
        dataLegalRepresentativeAndContact.MailLegalRepresentative,
    };

    const Contact = {
      NameContact: dataLegalRepresentativeAndContact.NameContact,
      IdentificationContact:
        dataLegalRepresentativeAndContact.IdentificationContact,
      PhoneContact: dataLegalRepresentativeAndContact.PhoneContact,
      MailContact: dataLegalRepresentativeAndContact.MailContact,
    };

    if (businessProfile) {
      const data = businessProfile.data as {
        data: object;
      };

      return await this.prisma.businessProfile.update({
        where: { id: businessProfile.id },
        data: {
          data: {
            ...data,
            LegalRepresentative: LegalRepresentative,
            Contact: Contact,
          },
        },
      });
    } else {
      throw new Error('Business profile not found');
    }
  }

  async createDataBusinessDescription(
    token: string,
    dataDescription: DescriptionDto,
  ) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    let businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (businessProfile) {
      const data = businessProfile.data as {
        Description?: DescriptionDto;
      };

      return await this.prisma.businessProfile.update({
        where: { id: businessProfile.id },
        data: {
          data: {
            ...data,
            Description: dataDescription,
          },
        },
      });
    } else {
      throw new Error('Business profile not found');
    }
  }

  async createDataDescriptionInfrastructureAndCapacity(
    token: string,
    dataDescriptionInfrastructureAndCapacity: DescriptionInfrastructureAndCapacityDto,
  ) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    let businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (businessProfile) {
      const data = businessProfile.data as {
        DescriptionInfrastructureAndCapacity?: DescriptionInfrastructureAndCapacityDto;
      };

      return await this.prisma.businessProfile.update({
        where: { id: businessProfile.id },
        data: {
          data: {
            ...data,
            DescriptionInfrastructureAndCapacity:
              dataDescriptionInfrastructureAndCapacity,
          },
        },
      });
    } else {
      throw new Error('Business profile not found');
    }
  }

  async createDataFinancialInformation(
    token: string,
    dataFinancialInformationDto: FinancialInformationDto,
  ) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    if (!documentType) {
      throw new Error('Document type not found');
    }

    let businessProfile = await this.prisma.businessProfile.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
      },
    });

    if (businessProfile) {
      const data = businessProfile.data as {
        FinancialInformation?: FinancialInformationDto;
      };

      return await this.prisma.businessProfile.update({
        where: { id: businessProfile.id },
        data: {
          data: {
            ...data,
            FinancialInformation: dataFinancialInformationDto,
          },
        },
      });
    } else {
      throw new Error('Business profile not found');
    }
  }

  async getBusinessByConsultant(token: string) {
    const businessProfile = await this.prisma.businessProfile.findMany();

    return businessProfile.map((item) => {
      const dataBusiness = item.data as {
        DataBusiness?: DataBusinessDto;
      };

      const dataReturn = {
        id: item.id,
        name: dataBusiness.DataBusiness.BusinessName,
      };
      return dataReturn;
    });
  }

  async businessToAssignConsultant() {
    const businessProfile = await this.prisma.businessProfile.findMany({
      include: {
        userProfile: true,
      },
    });

    const response = businessProfile.map((item) => {
      const dataBusiness = item.data as {
        DataBusiness?: DataBusinessDto;
      };

      let numAdmin = 0;
      let numConsultant = 0;

      item.userProfile.forEach((assign) => {
        if (assign.role == 'consultor_pymes') {
          numConsultant++;
        }
        if (assign.role == 'administrador_pymes') {
          numAdmin++;
        }
      });

      const dataReturn = {
        id: item.id,
        name: dataBusiness.DataBusiness.BusinessName,
        document_number: item.document_number,
        numberOfConsultantsAssigned: numConsultant,
        numberOfAdministratorsAssigned: numAdmin,
      };
      return dataReturn;
    });

    return response;
  }

  async assignConsultantToBusiness(AssignConsultantToBusinessDto) {
    if (Array.isArray(AssignConsultantToBusinessDto.consultant_id)) {
      let errorList = [];
      for (const user of AssignConsultantToBusinessDto.consultant_id) {
        if ('label' in user && 'value' in user) {
          const assign = await this.prisma.businessProfile.update({
            where: {
              id: AssignConsultantToBusinessDto.business_id,
            },
            data: {
              userProfile: {
                connect: {
                  id: user.value,
                },
              },
            },
            include: {
              userProfile: true,
            },
          });

          if (!assign.userProfile || assign.userProfile.length === 0) {
            errorList.push(user.value);
          }
        }

        if (errorList.length) {
          return {
            error: true,
            message: 'Se encontraron usuarios inválidos.',
            data: errorList,
          } as ErrorInformation;
        }
      }
    } else if (typeof AssignConsultantToBusinessDto.consultant_id == 'string') {
      const assign = await this.prisma.businessProfile.update({
        where: {
          id: AssignConsultantToBusinessDto.business_id,
        },
        data: {
          userProfile: {
            connect: {
              id: AssignConsultantToBusinessDto.consultant_id,
            },
          },
        },
        include: {
          userProfile: true,
        },
      });

      if (!assign.userProfile || assign.userProfile.length === 0) return false;
    } else {
      return {
        error: true,
        message: 'Solicitud invalida, revisa los datos',
      } as ErrorInformation;
    }
    return true;
  }
}

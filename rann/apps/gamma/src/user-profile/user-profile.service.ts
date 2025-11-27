import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoles } from '../user-info/entities/rol.entity';
import {
  AssignAdminBusinessDto,
  ASSIGNATION_OPERATION,
} from './dto/businessAdministratos.dto';

@Injectable()
export class UserProfileService {
  LALANDE_CC_TYPE = 'cc';
  constructor(private readonly prisma: PrismaService) {}

  async findConsultantsToBusiness(business_id: string) {
    return this.prisma.userProfile.findMany({
      where: {
        role: UserRoles.CONSULTOR_PYMES,
        businessProfile: {
          some: {
            id: business_id,
          },
        },
      },
    });
  }

  async findAdminsToBusiness(business_id: string) {
    return this.prisma.userProfile.findMany({
      where: {
        role: UserRoles.ADMINISTRADOR_PYMES,
        businessProfile: {
          some: {
            id: business_id,
          },
        },
      },
    });
  }

  // Business Administrators API
  // Endpoints to be used via swagger or external tools, not use for WEB UI functions.

  // UTIL FUNCTIONS
  private async findBusinessByNit(nit: string) {
    return await this.prisma.businessProfile.findFirst({
      select: {
        id: true,
      },
      where: {
        data: {
          path: ['DataBusiness', 'RUT'],
          equals: nit,
        },
      },
    });
  }

  private async findUserByDocument(
    documentType: string,
    documentNumber: string,
  ) {
    return await this.prisma.userProfile.findFirst({
      where: {
        role: UserRoles.ADMINISTRADOR_PYMES,
        identification_number: documentNumber,
        identification_type: documentType,
      },
    });
  }

  private async assignAdminToBusiness(userUuid: string, businessUuid: string) {
    return await this.prisma.businessProfile.update({
      where: {
        id: businessUuid,
      },
      data: {
        userProfile: {
          connect: {
            id: userUuid,
          },
        },
      },
      include: {
        userProfile: true,
      },
    });
  }

  private async removeAdminToBusiness(userUuid: string, businessUuid: string) {
    return await this.prisma.businessProfile.update({
      where: {
        id: businessUuid,
      },
      data: {
        userProfile: {
          disconnect: {
            id: userUuid,
          },
        },
      },
      include: {
        userProfile: true,
      },
    });
  }

  private async saveAssignationHistory(
    document_number: string,
    document_type: string,
    operation: ASSIGNATION_OPERATION,
    user_id: string,
    business_nit: string,
    business_id: string,
    additionalInfo: {} | undefined,
  ) {
    return await this.prisma.businessAdminUserAssignationHistory.create({
      data: {
        business_nit: business_nit,
        identification_number: document_number,
        identification_type: document_type,
        operation: operation,
        user_id: user_id,
        business_id: business_id,
        additional_info: additionalInfo,
      },
    });
  }

  // API SERVICE FUNCTIONS
  async registerBusinessAdministrators(
    adminUserId: string,
    businessInfoDto: AssignAdminBusinessDto,
  ) {
    // Validate empty body
    if (!businessInfoDto.businessId && !businessInfoDto.businessIdList) {
      throw new BadRequestException(
        'Please define at least one business for assignation',
      );
    }

    // One register
    if (businessInfoDto.businessId) {
      if (businessInfoDto.businessId == '') {
        throw new BadRequestException('The business nit received is invalid');
      }

      const business_id = await this.findBusinessByNit(
        businessInfoDto.businessId,
      );

      if (!business_id) {
        throw new BadRequestException(
          `The business nit ${businessInfoDto.businessId} is not found`,
        );
      }

      const userAdminObj = await this.findUserByDocument(
        this.LALANDE_CC_TYPE,
        adminUserId,
      );

      if (!userAdminObj) {
        throw new BadRequestException(
          `The user with document ${this.LALANDE_CC_TYPE} - ${adminUserId} is not found`,
        );
      }

      const assign = await this.assignAdminToBusiness(
        business_id.id,
        userAdminObj.id,
      );

      if (!assign.userProfile || assign.userProfile.length === 0) {
        throw new InternalServerErrorException(
          `Internal error to validate the assignation`,
        );
      }

      await this.saveAssignationHistory(
        this.LALANDE_CC_TYPE,
        adminUserId,
        ASSIGNATION_OPERATION.ASSIGN,
        userAdminObj.id,
        businessInfoDto.businessId,
        business_id.id,
        {
          source: 'api_endpoint',
        },
      );

      return {
        assignStatus: 'ok',
        business: business_id.id,
        adminUser: userAdminObj.id,
      };
    }

    // List registers
    else if (businessInfoDto.businessIdList) {
      if (
        !Array.isArray(businessInfoDto.businessIdList) ||
        !businessInfoDto.businessIdList.length
      ) {
        throw new BadRequestException(
          'The business nit list received is invalid',
        );
      }

      let assignList = [];
      for (const reg of businessInfoDto.businessIdList) {
        const business_id = await this.findBusinessByNit(
          businessInfoDto.businessId,
        );

        if (!business_id) {
          throw new BadRequestException(
            `The business nit ${businessInfoDto.businessId} is not found`,
          );
        }
        assignList.push(business_id);
      }

      const userAdminObj = await this.findUserByDocument(
        this.LALANDE_CC_TYPE,
        adminUserId,
      );

      if (!userAdminObj) {
        throw new BadRequestException(
          `The user with document ${this.LALANDE_CC_TYPE} - ${adminUserId} is not found`,
        );
      }

      let businessAssigned = [];
      for (const businessObj of assignList) {
        const assign = await this.assignAdminToBusiness(
          businessObj.id,
          userAdminObj.id,
        );

        if (!assign.userProfile || assign.userProfile.length === 0) {
          throw new InternalServerErrorException(
            `Internal error to validate the assignation`,
          );
        }

        await this.saveAssignationHistory(
          this.LALANDE_CC_TYPE,
          adminUserId,
          ASSIGNATION_OPERATION.ASSIGN,
          userAdminObj.id,
          businessInfoDto.businessId,
          businessObj.id,
          {
            source: 'api_endpoint',
          },
        );

        businessAssigned.push(businessObj.id);
      }

      return {
        assignStatus: 'ok',
        businessList: businessAssigned,
        adminUser: userAdminObj.id,
      };
    }

    throw new BadRequestException('Invalid body definition received');
  }

  async readBusinessAdministrators(adminUserId: string) {
    return await this.prisma.userProfile.findMany({
      where: {
        role: UserRoles.ADMINISTRADOR_PYMES,
        identification_number: adminUserId,
      },
      include: {
        businessProfile: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async readBusinessAdministratorsHistory(adminUserId: string) {
    const userId = await this.prisma.userProfile.findFirst({
      select: {
        id: true,
      },
      where: {
        identification_number: adminUserId,
        identification_type: this.LALANDE_CC_TYPE,
      },
    });

    if (userId) {
      return await this.prisma.businessAdminUserAssignationHistory.findMany({
        where: {
          user_id: userId.id,
        },
      });
    }

    return [];
  }

  async deleteBusinessAdministrator(businessId: string, adminUserId: string) {
    const business = await this.findBusinessByNit(businessId);
    if (!business) {
      throw new BadRequestException(
        `The business nit ${businessId} is not found`,
      );
    }
    const user = await this.findUserByDocument(
      this.LALANDE_CC_TYPE,
      adminUserId,
    );

    if (!user) {
      throw new BadRequestException(
        `The user with document ${this.LALANDE_CC_TYPE} - ${adminUserId} is not found`,
      );
    }

    const remove_assign = await this.removeAdminToBusiness(
      user.id,
      business.id,
    );

    await this.saveAssignationHistory(
      this.LALANDE_CC_TYPE,
      adminUserId,
      ASSIGNATION_OPERATION.REMOVE,
      user.id,
      businessId,
      business.id,
      {
        source: 'api_endpoint',
      },
    );

    return {
      removeStatus: 'ok',
      business: businessId,
      adminUser: adminUserId,
    };
  }

  // Business Administrators API
}

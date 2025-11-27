import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { jwtDecode } from 'jwt-decode';
import { PrismaService } from '../prisma/prisma.service';
import { DataBusinessDto } from '../dto/dataBusinessDto';
import { isArray } from 'class-validator';
import { BusinessInfo } from './entities/user-info.entity';
import { SelectOption } from '../curriculum/entities/curriculum.entity';
import { tokenRoleMap } from './entities/rol.entity';

@Injectable()
export class UserInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async getBusinessData(businessId: string) {
    const business = await this.prisma.businessProfile.findUnique({
      where: {
        id: businessId,
      },
    });

    if (!business) {
      return;
    }

    const dataBusiness = business.data as {
      DataBusiness?: DataBusinessDto;
    };

    return {
      label: dataBusiness.DataBusiness.BusinessName,
      value: dataBusiness.DataBusiness.RUT,
      shorthand: business.id,
    };
  }

  async getInfo(token: string) {
    const client: KeycloakResponse = this.jwtDecodeRann(token);

    const register = await this.prisma.userProfile.findFirst({
      where: {
        AND: [
          { identification_type: client.identification_type },
          { identification_number: client.identification_number },
        ],
      },
      include: {
        businessProfile: true,
      },
    });

    if (register) {
      let userSelect = [];
      let businessList = [];
      for (const business of register.businessProfile) {
        const data = register.business as {} as BusinessInfo;
        const info = await this.getBusinessData(business.id);
        if (info) {
          //Logger.debug(info);
          userSelect.push(info);
          businessList.push(business.id);
        }
      }

      if (userSelect.length >= 1) {
        let process = { ...register, businessProfile: undefined };
        process.business = {
          BUSINESS: businessList,
          BUSINESS_SELECT: userSelect,
        }; //as BusinessInfo;
        //Logger.debug(process);
        return process;
      }
    }

    /*if (register && 'business' in register) {
      const data = register.business as {} as BusinessInfo;

      let userSelect = [];
      for (const businessId of data.BUSINESS) {
        const info = await this.getBusinessData(businessId);
        if (info) {
          //Logger.debug(info);
          userSelect.push(info);
        }
      }

      if (userSelect.length >= 1) {
        let process = { ...register };
        process.business = { ...data, BUSINESS_SELECT: userSelect };
        //Logger.debug(process);
        return process;
      }
    }*/
    return register;
  }

  /**
   * /!\ CHANGES HERE AFFECT ALL BACKEND APPLICATION.
   *
   * function to process and complete the user information from the
   * received token.
   *
   * @param token KeyClock token
   * @returns KeycloakResponse or undefined if error.
   */
  jwtDecodeRann(token: string): KeycloakResponse | undefined {
    try {
      const userData: KeycloakResponse = jwtDecode(token);

      // if the token have the identification information return.
      // used in TITAN
      if (userData.identification_number && userData.identification_type) {
        return userData;
      }
      // If not have information try to complete it.
      else {
        // find the identification information in format "nit9017374510" / "cc9017374510"
        // used in UTOPIA and LALANDE.
        if (userData.preferred_username && userData.preferred_username != '') {
          const preferred_username = userData.preferred_username
            .trim()
            .toLowerCase();

          // data validation
          const allowed_doc_types = [
            'CC',
            'NIT',
            'SIE',
            'NUIP',
            'SC',
            'TI',
            'PA',
            'CE',
            'RC',
            'PEP',
            'CD',
            'TE',
            'PPT',
          ];

          const identification_type = allowed_doc_types.find((type) => {
            if (
              preferred_username.toLowerCase().startsWith(type.toLowerCase())
            ) {
              return type;
            }
          });

          if (identification_type) {
            const identification_type_lc = identification_type.toLowerCase();
            const identification_number = preferred_username.replace(
              identification_type_lc,
              '',
            );
            return {
              ...userData,
              identification_number: identification_number,
              identification_type: identification_type_lc,
            };
          }
        }
      }
      // return undefined if the structure not complains.
      return;
    } catch (error) {
      // log errors and return undefined.
      Logger.fatal(`Error on decode token: ${token} -- ${error}`);
      return;
    }
  }

  async isUserRegistered(token: string) {
    const tokenData: KeycloakResponse = this.jwtDecodeRann(token);
    const register = await this.prisma.userProfile.findFirst({
      where: {
        AND: [
          { identification_type: tokenData.identification_type },
          { identification_number: tokenData.identification_number },
        ],
      },
    });

    if (!register) {
      if (!tokenData.email || !tokenData.name) {
        return 'El token no contiene la información de email y name.';
      }

      const userRoles = tokenData.realm_access?.roles
        ?.filter((role) => tokenRoleMap[role])
        ?.map((role) => tokenRoleMap[role]);

      if (!userRoles || userRoles.length === 0) {
        return 'El usuario no tiene ningún rol válido para registrarse.';
      }

      if (userRoles.length > 1) {
        return `El usuario tiene múltiples roles válidos: [${userRoles.join(
          ', ',
        )}]. Solo debe tener un rol asignado.`;
      }

      await this.prisma.userProfile.create({
        data: {
          identification_type: tokenData.identification_type,
          identification_number: tokenData.identification_number,
          updated_at: new Date(),
          email: tokenData.email,
          name: tokenData.name,
          role: userRoles[0],
        },
      });
    }

    return 'Usuario está registrado.';
  }
}

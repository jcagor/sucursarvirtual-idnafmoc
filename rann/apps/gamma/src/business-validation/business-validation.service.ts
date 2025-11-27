import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FormProgramDto } from '../dto/FormProgramDto';
import { KeycloakResponse } from '../types/KeycloakResponse';
import { prevalidadorValidation } from './validations/prevalidador-validation';
import { ruesValidation } from './validations/rues-validation';
import { ValidationStatus } from './entities/BusinessValidationStatus';
import { ContactDto } from '../dto/ContactDto';
import { DataBusinessDto } from '../dto/dataBusinessDto';
import { LegalRepresentativeDto } from '../dto/LegalRepresentativeDto';
import { AppointmentService } from '../appointment/appointment.service';
import {
  BillingStatusResponse,
  BillingStatusResponseList,
} from './entities/BillingStatusResponse';
import { prevalidadorValidationStatus } from './validations/prevalidador-validation-status';
import { UserInfoService } from '../user-info/user-info.service';
import * as ExcelJS from 'exceljs';
import { ErrorInformation } from '../types/GeneralTypes.type';

@Injectable()
export class BusinessValidationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appointments: AppointmentService,
    private readonly userInfo: UserInfoService,
  ) {}

  async IsValited(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const documentType = await this.prisma.document_Type.findFirst({
      where: { name: identification_type },
    });

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const IsValited = await this.prisma.businessValidation.findFirst({
      where: {
        document_number: identification_number,
        document_type_id: documentType.id,
        status: ValidationStatus.APPROVED,
        validatedAt: {
          gte: oneMonthAgo,
        },
      },
    });

    if (!IsValited) {
      await this.createUnregisteredHistoryEvent(
        identification_type,
        identification_number,
      );
      return false;
    }

    return true;
  }

  async prevalidationBusiness(token: string, formProgram: FormProgramDto) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const PrevalidadorValidation = await prevalidadorValidation(
      identification_type,
      identification_number,
      formProgram,
      this.prisma,
    );

    // Si hay errores, detener ejecución
    if (PrevalidadorValidation.isValid === false) {
      return PrevalidadorValidation;
    }

    // // YA NO SE VA A USAR REGISTRO DE EMPRESAS
    // const businessRegistrationValidationResult =
    //   await businessRegistrationValidation(
    //     identification_type,
    //     identification_number,
    //     this.prisma,
    //   );

    // // Si hay errores, detener ejecución
    // if (businessRegistrationValidationResult.isValid === false) {
    //   return businessRegistrationValidationResult;
    // }

    return { isValid: true };
  }

  async ruesValidation(token: string, formProgram: FormProgramDto) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const RuesValidation = await ruesValidation(
      identification_type,
      identification_number,
      formProgram,
      this.prisma,
    );

    // Si hay errores, detener ejecución
    if (RuesValidation.isValid === false) {
      return RuesValidation;
    }

    return { isValid: true };
  }

  async checkUnregisteredBusiness(token: string) {
    let businessInfo: KeycloakResponse = this.userInfo.jwtDecodeRann(token);

    const isValidated = await this.IsValited(token);

    if (!isValidated) {
      return await this.createUnregisteredHistoryEvent(
        businessInfo.identification_type,
        businessInfo.identification_number,
      );
    }
    return undefined;
  }

  async createUnregisteredHistoryEvent(
    identification_type: string,
    identification_number: string,
  ) {
    return await this.prisma.businessUnregisteredHistory.create({
      data: {
        identification_type: identification_type,
        identification_number: identification_number,
        updated_at: new Date('now'),
      },
    });
  }

  async getUnvalidatedBusiness() {
    return this.prisma.businessValidation.findMany({
      where: {
        status: ValidationStatus.REJECTED,
      },
    });
  }

  async checkBusinessBillingStatus(token: string) {
    const DEFAULT_BILLING_REGION = 'CALI';
    const DEFAULT_PROGRAM_PROVIDER = 'Desarrollo Empresarial';
    const DEFAULT_TEMPLATE_TYPE = 'Cobro';
    const CONSULTANT_PERCENT_TO_BILL = 20;

    let response: BillingStatusResponseList = [];

    const registeredBusiness = await this.prisma.businessProfile.findMany();

    for (const business of registeredBusiness) {
      const businessInfo = business.data as {
        Contact: ContactDto;
        DataBusiness: DataBusinessDto;
        LegalRepresentative: LegalRepresentativeDto;
        id_program?: string;
      };

      const programInfo = await this.prisma.program.findUnique({
        where: { id: businessInfo.id_program },
      });

      const programScheduleInfo = await this.prisma.programSchedule.findFirst({
        where: {
          program_id: programInfo.id,
        },
      });

      const validationInfo = await this.prisma.businessValidation.findFirst({
        where: {
          document_type_id: business.document_type_id,
          document_number: business.document_number,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const appointmentsInfo =
        await this.appointments.getAppointmentHoursByOneBusiness(business.id);
      let hoursExecutedPercent = '-1';
      try {
        hoursExecutedPercent = (
          (parseInt(appointmentsInfo.hoursPlanedComplete) / 100) *
          parseInt(appointmentsInfo.hoursExecuted)
        ).toString();
      } catch (error) {
        Logger.error(
          'checkBusinessBillingStatus, ERROR on calculate advance percent for:' +
            business.id,
        );
      }

      if (
        programInfo &&
        programScheduleInfo &&
        validationInfo &&
        appointmentsInfo &&
        parseInt(hoursExecutedPercent) >= CONSULTANT_PERCENT_TO_BILL
      ) {
        const statusRow = {
          nit: businessInfo.DataBusiness.RUT.toString(),
          businessName: businessInfo.DataBusiness.BusinessName,
          representativeDocument:
            businessInfo.LegalRepresentative.IdentificationLegalRepresentative.toString(),
          representativeName:
            businessInfo.LegalRepresentative.NameLegalRepresentative,
          address: businessInfo.DataBusiness.Address,
          telephone: businessInfo.Contact.PhoneContact,
          city: businessInfo.DataBusiness.City,
          email: businessInfo.Contact.MailContact,
          regionHome: businessInfo.DataBusiness.Department,
          program: programInfo.name,
          priceValue: programScheduleInfo.value,
          regionBilling: DEFAULT_BILLING_REGION,
          initialValidationDate: validationInfo.updatedAt.toISOString(),
          deliveryDateBilling: new Date().toISOString(),
          advancePercent: hoursExecutedPercent,
          programStartDate: programScheduleInfo.startDate.toISOString(),
          programEndDate: programScheduleInfo.endDate.toISOString(),
          provider: DEFAULT_PROGRAM_PROVIDER,
          remissionDate: validationInfo.updatedAt.toISOString(),
          templateType: DEFAULT_TEMPLATE_TYPE,
        } as BillingStatusResponse;
        response.push(statusRow);
      }
    }
    return response;
  }

  async businessStatus(token: string) {
    const { identification_type, identification_number }: KeycloakResponse =
      this.userInfo.jwtDecodeRann(token);

    const PrevalidadorValidation = await prevalidadorValidationStatus(
      identification_type,
      identification_number,
      this.prisma,
    );

    return PrevalidadorValidation.Status;
  }

  async generateExcelReport(
    token: string,
  ): Promise<ExcelJS.Buffer | ErrorInformation> {
    const MAX_NUM_REGISTERS = 100000;

    const workbook = new ExcelJS.Workbook();
    const worksheetResult = workbook.addWorksheet('Resultados');
    const worksheetCause = workbook.addWorksheet('Causas');
    const worksheetDetail = workbook.addWorksheet('Detalles');

    const businessEventsCount = await this.prisma.businessValidation.count({
      where: {
        status: ValidationStatus.REJECTED,
      },
    });

    if (businessEventsCount >= MAX_NUM_REGISTERS) {
      return {
        error: true,
        message: `El numero de resultados supera el limite definido de ${MAX_NUM_REGISTERS}.`,
      } as ErrorInformation;
    } else if (businessEventsCount == 0) {
      return {
        error: true,
        message: `No hay registros a exportar en este momento.`,
      } as ErrorInformation;
    }

    const businessEvents = await this.prisma.businessValidation.findMany({
      where: {
        status: ValidationStatus.REJECTED,
      },
    });

    worksheetResult.columns = [
      { header: 'Nit', key: 'nit', width: 22 },
      { header: 'Fecha validación', key: 'date', width: 32 },
      { header: 'Errores', key: 'errors', width: 42 },
    ];

    if (businessEvents.length) {
      for (const item of businessEvents) {
        const nit = item.document_number;

        const date = new Date(item.updatedAt).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });

        const errors =
          item.reason.length > 0
            ? item.reason.map((reason, index) => ({ id: index, error: reason }))
            : 'Sin errores';

        if (Array.isArray(errors)) {
          for (const error of errors) {
            if (error.id == 0) {
              worksheetResult.addRow({
                nit: nit,
                date: date,
                errors: error.error,
              });
            } else {
              worksheetResult.addRow({
                nit: '',
                date: '',
                errors: error.error,
              });
            }
          }
        } else {
          worksheetResult.addRow({ nit: '', date: '', errors: errors });
        }
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}

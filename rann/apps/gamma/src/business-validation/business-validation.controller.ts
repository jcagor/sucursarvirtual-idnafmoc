import { Controller, Post, Body, Req, Get, Res, Logger } from '@nestjs/common';
import { BusinessValidationService } from './business-validation.service';
import { FormProgramDto } from './dto/FormProgramDto';
import { ErrorInformation } from '../types/GeneralTypes.type';

@Controller('business-validation')
export class BusinessValidationController {
  constructor(
    private readonly businessValidationService: BusinessValidationService,
  ) {}

  @Get()
  async IsValited(@Req() request) {
    const token = request.headers.authorization;
    return this.businessValidationService.IsValited(token);
  }

  @Post('/prevalidation')
  async prevalidationBusiness(
    @Req() request,
    @Body() formProgram: FormProgramDto,
  ) {
    const token = request.headers.authorization;
    return this.businessValidationService.prevalidationBusiness(
      token,
      formProgram,
    );
  }

  @Post('/rues')
  async ruesValidation(@Req() request, @Body() formProgram: FormProgramDto) {
    const token = request.headers.authorization;
    return this.businessValidationService.ruesValidation(token, formProgram);
  }

  @Get('check-unregistered')
  async checkUnregisteredBusiness(@Req() request) {
    const token = request.headers.authorization;
    return await this.businessValidationService.checkUnregisteredBusiness(
      token,
    );
  }

  @Get('/unvalidated-business')
  async getUnvalidatedBusiness() {
    return this.businessValidationService.getUnvalidatedBusiness();
  }

  //@Public()
  @Get('billing-status')
  async checkBillingStatus(@Req() request) {
    const token = request.headers.authorization;
    return await this.businessValidationService.checkBusinessBillingStatus(
      token,
    );
  }

  @Get('/business-status')
  async businessStatus(@Req() request) {
    const token = request.headers.authorization;
    return this.businessValidationService.businessStatus(token);
  }

  @Get('download/rejected/excel-report')
  async downloadExcelReport(@Res() res, @Req() request) {
    const token = request.headers.authorization;
    const buffer =
      await this.businessValidationService.generateExcelReport(token);

    const currentDate = new Date().toISOString();

    if (
      typeof buffer == 'object' &&
      buffer != null &&
      'error' in buffer &&
      'message' in buffer
    ) {
      //Logger.debug("error message");
      res.json(buffer);
    } else if ('byteLength' in buffer) {
      //Logger.debug("Excel file");
      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=Empresas_Rechazadas_${currentDate}.xlsx`,
        'Content-Length': buffer.byteLength,
      });

      res.end(buffer);
    } else {
      const code = new Date().getTime();
      Logger.fatal(
        `ERROR Cant determine the response type for the excel report COD[${code}]:`,
        buffer,
      );
      res.set({
        'Content-Type': 'application/json',
      });
      res.end({
        error: true,
        message: `Error interno al generar el reporte, contacta a soporte técnico, código: ${code}`,
      } as ErrorInformation);
    }
  }
}

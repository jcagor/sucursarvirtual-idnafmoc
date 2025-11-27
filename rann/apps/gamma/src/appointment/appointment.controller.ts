import { Controller, Get, Post, Body, Req, Param, Patch } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  BusinessSignQueryDto,
  CreateAppointmentDto,
  CreateTechAssistanceDto,
  CreateTechAssistanceRevision,
  PatchTechAssistanceDto,
} from './dto/create-appointment.dto';
import {
  queryByBusinessDto,
  rangeDateAppointmentBusinessDto,
  rangeDateAppointmentDto,
} from './dto/range-appointment.dto';
import { Public } from '@app/shared/interceptors/public.interceptor';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Post('/reschedule')
  reschedule(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.reschedule(createAppointmentDto);
  }

  @Post('/tech-assistance-cert')
  async createCertificate(
    @Req() request,
    @Body() createTechAssistanceDto: CreateTechAssistanceDto,
  ) {
    const token = request.headers.authorization;
    //console.log('FormData:', createTechAssistanceDto);
    return await this.appointmentService.createCertificate(
      token,
      createTechAssistanceDto,
    );
  }

  @Patch('/tech-assistance-cert')
  async patchCertificate(
    @Req() request,
    @Body() patchTechAssistanceDto: PatchTechAssistanceDto,
  ) {
    const token = request.headers.authorization;
    //console.log('FormData:', createTechAssistanceDto);
    return await this.appointmentService.patchCertificate(
      token,
      patchTechAssistanceDto,
    );
  }

  /**
   * Returns the certificates for the Analyst User in lalande.
   */
  @Post('/tech-assistance-cert/analyst/list')
  listCertificatesByBusiness(
    @Req() request,
    @Body() query: queryByBusinessDto,
  ) {
    const token = request.headers.authorization;
    return this.appointmentService.listCertificatesAnalyst(token, query);
  }

  /**
   * Returns the appointment hours report for the Analyst User in lalande.
   */
  @Get('/tech-assistance-cert/analyst/hours-report')
  appointmentHoursReportByBusiness(@Req() request) {
    const token = request.headers.authorization;
    return this.appointmentService.getAppointmentHoursByBusiness(token);
  }

  /**
   * Returns the consultant attended business report for the Analyst User in lalande.
   */
  @Get('/tech-assistance-cert/analyst/business-report')
  appointmentConsultantBusinessReport(@Req() request) {
    const token = request.headers.authorization;
    return this.appointmentService.getConsultantBusinessReport(token);
  }

  /**
   * Returns one certificate for the Analyst User in lalande.
   */
  @Get('/tech-assistance-cert/:id')
  certificateById(@Req() request, @Param('id') id: string) {
    const token = request.headers.authorization;
    return this.appointmentService.getCertificateAnalyst(token, id);
  }

  /**
   * Create a certificate revision for the Analyst User in lalande.
   */
  @Post('/tech-assistance-cert/revision')
  saveCertificateRevision(
    @Req() request,
    @Body() query: CreateTechAssistanceRevision,
  ) {
    const token = request.headers.authorization;
    return this.appointmentService.createCertificateRevision(token, query);
  }

  /**
   * List rejected certificate revision for the Consultant User in lalande.
   */
  @Get('/tech-assistance-cert/consultant/rejected')
  listRejectedCertificateRevision(@Req() request) {
    const token = request.headers.authorization;
    return this.appointmentService.listRejectedCertificateRevision(token);
  }

  /**
   * Returns the certificates pending to sign by the business in Utopia.
   */
  @Get('/tech-assistance-cert/sign-pending/list')
  listCertificatesSignPendingByBusiness(@Req() request) {
    const token = request.headers.authorization;
    return this.appointmentService.listCertificatesSignPendingBusiness(token);
  }

  /**
   *  Allow business to sign a certificate from Utopia.
   * @param request body
   * @returns updated certificate.
   */
  @Post('/tech-assistance-cert/business-sign')
  queryCertificatesSignByBusiness(
    @Req() request,
    @Body() businessSignQuery: BusinessSignQueryDto,
  ) {
    const token = request.headers.authorization;
    return this.appointmentService.signCertificateByBusiness(
      token,
      businessSignQuery,
    );
  }

  @Post('/by-business')
  findByBusiness(
    @Req() request,
    @Body() rangeDateAppointmentDto: rangeDateAppointmentDto,
  ) {
    const token = request.headers.authorization;
    return this.appointmentService.findAppointmentsByConsultant(
      rangeDateAppointmentDto,
      token,
    );
  }

  /**
   * Returns the appointments for the Admin User in lalande.
   *
   * @param request
   * @param rangeDateAppointmentDto
   * @returns
   */
  @Post('/by-business/admin')
  findByCustomBusiness(
    @Body() rangeDateAppointmentDto: rangeDateAppointmentBusinessDto,
  ) {
    return this.appointmentService.findAppointmentsByAdmin(
      rangeDateAppointmentDto,
    );
  }
}

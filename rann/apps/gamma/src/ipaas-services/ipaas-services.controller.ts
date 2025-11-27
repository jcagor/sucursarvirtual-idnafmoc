import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { IpaasServicesService } from './ipaas-services.service';
import {
  CreateIpaasServiceDto,
  MpacValidationRequest,
  SiseValidationRequest,
} from './dto/create-ipaas-service.dto';
import { UpdateIpaasServiceDto } from './dto/update-ipaas-service.dto';
import { VacantRegisterForm } from './dto/fomento.dto';
import { JupiterStatusQuery } from './dto/jupiter.dto';

@Controller('ipaas-services')
export class IpaasServicesController {
  constructor(private readonly ipaasServicesService: IpaasServicesService) {}

  // SISE ENDPOINTS

  @Post('/v1/sise/validate')
  async validateSise(
    @Req() request,
    @Body() validationRequest: SiseValidationRequest,
  ) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.requestSiseValidation(validationRequest, token);
  }

  @Get('/v1/sise/resume/:id')
  async findOne(@Req() request, @Param('id') identification: string) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.requestSiseUserResume(
      identification,
      token,
    );
  }

  // MPAC ENDPOINTS

  @Post('/v1/mpac/validate')
  async validateMpac(
    @Req() request,
    @Body() validationRequest: MpacValidationRequest,
  ) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.requestMpacStatus(validationRequest, token);
  }


  // FOMENTO ENDPOINTS

  @Get('/unemployed/find-postulation/:id')
  async validateFospec(@Req() request, @Param('id') identification: string) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.requestFospecValidation(
      identification,
      token,
    );
  }

  @Get('/unemployed/find-appointment-assignment/:id')
  async validateMeetFospec(
    @Req() request,
    @Param('id') identification: string,
  ) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.requestFospecMeetValidation(
      identification,
      token,
    );
  }

  @Get('/unemployed/find-user-training/:id')
  async findFospecTraining(
    @Req() request,
    @Param('id') identification: string,
  ) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.requestFospecTraining(
      identification,
      token,
    );
  }

  @Get('/employment-agency/offer/open-jobs')
  async findFospecOpenJobs(
    @Req() request,
    @Param('id') identification: string,
  ) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.requestFospecOpenJobs(token);
  }

  @Post('/job-vacancy')
  async saveFospecOpenJob(
    @Req() request,
    @Body() formData: VacantRegisterForm,
  ) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.saveJobVacancyForm(formData, token);
  }

  // JUPITER ENDPOINTS
  
  @Post('/jupiter/validate')
  async queryJupiterValidation(
    @Req() request,
    @Body() query: JupiterStatusQuery,
  ) {
    const token = request.headers.authorization;
    return await this.ipaasServicesService.requestJupiterStatus(query, token);
  }
}

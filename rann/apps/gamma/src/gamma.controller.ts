import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { GammaService } from './gamma.service';
import { DataBusinessDto } from './dto/dataBusinessDto';
import { DescriptionDto } from './dto/DescriptionDto';
import { DescriptionInfrastructureAndCapacityDto } from './dto/DescriptionInfrastructureAndCapacityDto';
import { FinancialInformationDto } from './dto/FinancialInformationDto';
import { LegalRepresentativeAndContactDto } from './dto/LegalRepresentativeAndContactDto';
import { RuesDto } from './dto/RuesDto';
import { Public } from '@app/shared/interceptors/public.interceptor';
import { FormProgramDto } from './dto/FormProgramDto';
import { AssignConsultantToBusinessDto } from './dto/assing-consultant-to-business.dto';

@Controller()
export class GammaController {
  constructor(private readonly gammaService: GammaService) {}

  // Main path "/" for Health-Check
  @Get()
  @Public()
  async serviceCheck(@Req() req: Request) {
    const query = await this.gammaService.findAllCities();
    if (query) {
      return query;
    } else {
      throw new InternalServerErrorException('RANN service failed');
    }
  }

  @Get('/isFormBusinessProfileCompleted')
  async isFormBusinessProfileCompleted(@Req() request) {
    const token = request.headers.authorization;
    return this.gammaService.isFormBusinessProfileCompleted(token);
  }

  @Get('/getDataProgram')
  async getProgram(@Req() request) {
    const token = request.headers.authorization;
    return this.gammaService.getProgram(token);
  }

  @Get('/getDataBusiness')
  async getDataBusiness(@Req() request) {
    const token = request.headers.authorization;
    return this.gammaService.getDataBusiness(token);
  }

  @Get('/getDataLegalRepresentativeAndContact')
  async getDataLegalRepresentativeAndContact(@Req() request) {
    const token = request.headers.authorization;
    return this.gammaService.getDataLegalRepresentativeAndContact(token);
  }

  @Get('/getDataBusinessDescription')
  async getDataBusinessDescription(@Req() request) {
    const token = request.headers.authorization;
    return this.gammaService.getDataBusinessDescription(token);
  }

  @Get('/getDataDescriptionInfrastructureAndCapacity')
  async getDataDescriptionInfrastructureAndCapacity(@Req() request) {
    const token = request.headers.authorization;
    return this.gammaService.getDataDescriptionInfrastructureAndCapacity(token);
  }

  @Get('/getDataFinancialInformation')
  async getDataFinancialInformation(@Req() request) {
    const token = request.headers.authorization;
    return this.gammaService.getDataFinancialInformation(token);
  }

  @Post('/saveProgram')
  async saveProgram(@Req() request, @Body() formProgram: FormProgramDto) {
    const token = request.headers.authorization;
    return this.gammaService.saveProgram(token, formProgram);
  }

  @Post('/dataBusiness')
  async createDataBusiness(
    @Req() request,
    @Body() dataBusiness: DataBusinessDto,
  ) {
    const token = request.headers.authorization;
    return this.gammaService.createDataBusiness(token, dataBusiness);
  }

  @Post('/dataLegalRepresentativeAndContact')
  async createDataLegalRepresentativeAndContact(
    @Req() request,
    @Body()
    dataLegalRepresentativeAndContact: LegalRepresentativeAndContactDto,
  ) {
    const token = request.headers.authorization;
    return this.gammaService.createDataLegalRepresentativeAndContact(
      token,
      dataLegalRepresentativeAndContact,
    );
  }

  @Post('/dataBusinessDescription')
  async createDataBusinessDescription(
    @Req() request,
    @Body()
    dataDescription: DescriptionDto,
  ) {
    const token = request.headers.authorization;
    return this.gammaService.createDataBusinessDescription(
      token,
      dataDescription,
    );
  }

  @Post('/dataDescriptionInfrastructureAndCapacity')
  async createDataDescriptionInfrastructureAndCapacity(
    @Req() request,
    @Body()
    dataDescriptionInfrastructureAndCapacity: DescriptionInfrastructureAndCapacityDto,
  ) {
    const token = request.headers.authorization;
    return this.gammaService.createDataDescriptionInfrastructureAndCapacity(
      token,
      dataDescriptionInfrastructureAndCapacity,
    );
  }

  @Post('/dataFinancialInformation')
  async createDataFinancialInformation(
    @Req() request,
    @Body()
    dataFinancialInformationDto: FinancialInformationDto,
  ) {
    const token = request.headers.authorization;
    return this.gammaService.createDataFinancialInformation(
      token,
      dataFinancialInformationDto,
    );
  }

  @Get('/getBusinessByConsultant')
  async getBusinessByConsultant(@Req() request) {
    const token = request.headers.authorization;
    return this.gammaService.getBusinessByConsultant(token);
  }

  @Get('/business-to-assign-consultant')
  async businessToAssignConsultant() {
    return this.gammaService.businessToAssignConsultant();
  }

  @Post('/assign-consultant')
  async assignConsultantToBusiness(
    @Body() AssignConsultantToBusinessDto: AssignConsultantToBusinessDto,
  ) {
    return this.gammaService.assignConsultantToBusiness(
      AssignConsultantToBusinessDto,
    );
  }
}

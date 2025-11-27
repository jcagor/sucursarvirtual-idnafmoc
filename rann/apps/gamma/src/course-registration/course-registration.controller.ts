import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseRegistrationService } from './course-registration.service';
import { CreateCourseRegistrationDto } from './dto/create-course-registration.dto';
import { CreateCourseRegistrationByBusinessDto, CreateCourseUnemployedRegistrationDto, CreateCourseWorkerRegistrationDto } from './dto/create-course-registration-by-business.dto';
import { query } from 'express';
import { queryUserAndCourseValidationDto, queryUserValidationDto } from './dto/coursePreValidation';
import { Public } from '@app/shared/interceptors/public.interceptor';
import { ApiKeyGuard } from '@app/shared/modules/auth/guards/api-key.guard';

@Controller('courses')
export class CourseRegistrationController {
  constructor(
    private readonly courseRegistrationService: CourseRegistrationService,
  ) {}

  @Post('register')
  async create(
    @Body() createCourseRegistrationDto: CreateCourseRegistrationDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      return {
        success: false,
        message: 'Token de autorización no proporcionado',
      };
    }

    return this.courseRegistrationService.create(createCourseRegistrationDto);
  }

  @Get('user/:documentNumber')
  findCoursesByDocument(@Param('documentNumber') documentNumber: string) {
    return this.courseRegistrationService.findCoursesByDocument(documentNumber);
  }

  @Post('business')
  createByBusiness(
    @Body()
    createCourseRegistrationByBusinessDto: CreateCourseRegistrationByBusinessDto,
    @Req() request,
  ) {
    const token = request.headers.authorization;
    return this.courseRegistrationService.createByBusiness(
      createCourseRegistrationByBusinessDto,
      token,
    );
  }

  @Post('/register/unemployed')
  createRegisterUnemployed(
    @Body()
    query: CreateCourseUnemployedRegistrationDto,
    @Req() request,
  ) {
    const token = request.headers.authorization;
    return this.courseRegistrationService.createUnemployedRegistration(
      query,
      token,
    );
  }

  @Post('/register/employee')
  createRegisterEmployee(
    @Body()
    query: CreateCourseWorkerRegistrationDto,
    @Req() request,
  ) {
    const token = request.headers.authorization;
    return this.courseRegistrationService.createWorkerRegistration(
      query,
      token,
    );
  }

  @Get('business/registered-employees/:courseScheduleId')
  findRegisteredEmployees(@Param('courseScheduleId') courseScheduleId: string) {
    return this.courseRegistrationService.findRegisteredEmployeesByCourseSchedule(
      courseScheduleId,
    );
  }

  @Delete('/business/registered-employees/:id')
  deleteRegisteredEmployees(@Param('id') postulationId: string, @Headers('authorization') token: string) {
    return this.courseRegistrationService.deleteRegisteredEmployeesByCourseSchedule(
      postulationId,
      token,
    );
  }

  // Validate unemployed information from Tione Fomento
  
  @Public()
  @UseGuards(ApiKeyGuard)
  @Post('/validate/courses-taken')
  async UnEmployedCoursesValidation(
    @Body() query: queryUserAndCourseValidationDto,
    @Req() request,
  ) {
    const token = request.headers.authorization;
    return await this.courseRegistrationService.courseAssignationPreValidation(
      query,      
    );
  }

  @Public()
  @UseGuards(ApiKeyGuard)
  @Post('/validate/unemployed-user')
  async UnEmployedPreValidation(
    @Body() query: queryUserValidationDto,
    @Req() request,
  ) {
    const token = request.headers.authorization;
    return await this.courseRegistrationService.courseAssignationUserPreValidation(
      query,      
    );
  }
}

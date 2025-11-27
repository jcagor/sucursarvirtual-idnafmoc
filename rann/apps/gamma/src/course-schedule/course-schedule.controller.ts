import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CourseScheduleService } from './course-schedule.service';
import {
  CreateCourseScheduleDto,
  FindCourseScheduleDto,
  QueryValidateEmployeeForCourseDto,
} from './dto/create-course-schedule.dto';
import { UpdateCourseDto } from '../courses/dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AssignBusinessToBScheduleDto } from './dto/assign-business-tob-schedule.dto';

@Controller('course-schedule')
export class CourseScheduleController {
  constructor(private readonly courseScheduleService: CourseScheduleService) {}

  @Get('/by-course/:id')
  findByCourse(@Req() request, @Param('id') id: string) {
    const token = request.headers.authorization;
    return this.courseScheduleService.findByCourse(id, token);
  }

  @Get('/by-session/:session_id')
  findBySupplier(@Param('session_id') session_id: string) {
    return this.courseScheduleService.findBySession(session_id);
  }

  @Post()
  create(@Body() createCourseScheduleDto: CreateCourseScheduleDto) {
    return this.courseScheduleService.create(createCourseScheduleDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateCourseDto: UpdateCourseDto) {
    return this.courseScheduleService.update(id, UpdateCourseDto);
  }

  @Get('/employees-available-by-bussiness/:id')
  findEmployeesAvailableByBussiness(
    @Headers('authorization') token: string,
    @Param('id') id_schedule: string,
  ) {
    return this.courseScheduleService.findEmployeesAvailableByBussiness(
      id_schedule,
      token,
    );
  }

  @Post('bulk-loading')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    return this.courseScheduleService.bulkLoading(file.buffer);
  }

  @Post('/find')
  findSchedule(
    @Body() queryInformation: FindCourseScheduleDto,
    @Headers('authorization') token: string,
  ) {
    return this.courseScheduleService.findCourseSchedule(
      queryInformation,
      token,
    );
  }

  @Post('validate-check/employee')
  ValidateEmployee(
    @Body() queryInformation: QueryValidateEmployeeForCourseDto,
    @Headers('authorization') token: string,
  ) {
    return this.courseScheduleService.validateEmployeeCourseRegister(
      queryInformation,
      token,
    );
  }

  @Get('/business-authorized-by-schedule/:id')
  findBusinessAuthorizedBySchedule(@Param('id') id: string) {
    return this.courseScheduleService.findBusinessAuthorizedBySchedule(id);
  }

  @Post('/assign-business-to-schedule/:id')
  assignBusinessToSchedule(
    @Param('id') id: string,
    @Body() assignBusinessToScheduleDto: AssignBusinessToBScheduleDto,
  ) {
    return this.courseScheduleService.assignBusinessToSchedule(
      assignBusinessToScheduleDto,
      id,
    );
  }

  @Get('/beneficiary')
  findBeneficiarySchedules() {
    return this.courseScheduleService.findBeneficiarySchedules();
  }

  @Get()
  findAll() {
    return this.courseScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseScheduleService.findOne(id);
  }
}

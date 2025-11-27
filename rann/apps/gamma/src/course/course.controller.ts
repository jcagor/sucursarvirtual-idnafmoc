import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Public } from '@app/shared/interceptors/public.interceptor';
import { EnrollmentStatusDto } from './dto/enrollment-status.DTO';
import { FormationByFomentoDto } from './dto/formationsByFomento.DTO';
import { ApiKeyGuard } from '@app/shared/modules/auth/guards/api-key.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Post('bulk-loading')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    const serviceEnabled = false;
    if (!serviceEnabled) {
      //Notify disabled service:
      throw new HttpException('Service has been disabled', 503);
    }

    return this.courseService.bulkLoading(file.buffer);
  }

  @Public()
  @UseGuards(ApiKeyGuard)
  @Post('enrollment-status')
  async getEnrollmentStatus(
    @Body() getEnrollmentStatusDto: EnrollmentStatusDto[],
  ) {
    return this.courseService.getEnrollmentStatus(getEnrollmentStatusDto);
  }

  @Public()
  @Post('/by-fomento/course-availables')
  async getCoursesAvailablesByFomento(
    @Body() formationByFomentoDto: FormationByFomentoDto[],
  ) {
    return this.courseService.getCoursesAvailablesByFomento(
      formationByFomentoDto,
    );
  }
}

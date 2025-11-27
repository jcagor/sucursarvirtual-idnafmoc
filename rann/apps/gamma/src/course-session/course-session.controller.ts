import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CourseSessionService } from './course-session.service';
import { CreateCourseSessionDto } from './dto/create-course-session.dto';
import { UpdateCourseSessionDto } from './dto/update-course-session.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('course-session')
export class CourseSessionController {
  constructor(private readonly courseSessionService: CourseSessionService) {}

  @Post()
  create(@Body() createCourseSessionDto: CreateCourseSessionDto) {
    return this.courseSessionService.create(createCourseSessionDto);
  }

  @Get('/by-schedule/:schedule_id')
  findOne(@Param('schedule_id') schedule_id: string) {
    return this.courseSessionService.findBySchedule(schedule_id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.courseSessionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateCourseDto: UpdateCourseSessionDto,
  ) {
    return this.courseSessionService.update(id, UpdateCourseDto);
  }

  @Post('bulk-loading')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    return this.courseSessionService.bulkLoading(file.buffer);
  }
}

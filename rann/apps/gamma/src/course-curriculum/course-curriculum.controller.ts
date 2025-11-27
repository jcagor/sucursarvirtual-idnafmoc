import { Controller, Get, Param } from '@nestjs/common';
import { CourseCurriculumService } from './course-curriculum.service';

@Controller('course-curriculum')
export class CourseCurriculumController {
  constructor(
    private readonly courseCurriculumService: CourseCurriculumService,
  ) {}

  @Get('/by-course-schedule/:id')
  findByCourseSchedule(@Param('id') id: string) {
    return this.courseCurriculumService.findByCourseSchedule(id);
  }
}

import { Module } from '@nestjs/common';
import { CourseCurriculumService } from './course-curriculum.service';
import { CourseCurriculumController } from './course-curriculum.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CourseCurriculumController],
  providers: [CourseCurriculumService, PrismaService],
})
export class CourseCurriculumModule {}

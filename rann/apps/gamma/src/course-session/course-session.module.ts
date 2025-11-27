import { Module } from '@nestjs/common';
import { CourseSessionService } from './course-session.service';
import { CourseSessionController } from './course-session.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CourseSessionController],
  providers: [CourseSessionService, PrismaService],
})
export class CourseSessionModule {}

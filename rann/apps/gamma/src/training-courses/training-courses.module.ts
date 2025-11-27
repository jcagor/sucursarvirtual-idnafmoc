import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrainingCoursesController } from './training-courses.controller';
import { TrainingCoursesService } from './training-courses.service';
import { UserInfoService } from '../user-info/user-info.service';
import { CourseRegistrationService } from '../course-registration/course-registration.service';
import { IpaasServicesService } from '../ipaas-services/ipaas-services.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TrainingCoursesController],
  providers: [
    TrainingCoursesService,
    PrismaService,
    UserInfoService,
    CourseRegistrationService,
    IpaasServicesService,
    ConfigService,
  ],
  exports: [TrainingCoursesService],
})
export class TrainingCoursesModule {}

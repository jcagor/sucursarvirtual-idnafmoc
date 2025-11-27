import { Module } from '@nestjs/common';
import { CourseRegistrationService } from './course-registration.service';
import { CourseRegistrationController } from './course-registration.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { IpaasServicesService } from '../ipaas-services/ipaas-services.service';
import { HttpModule } from '@nestjs/axios';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  imports: [HttpModule], // <- IpaasServicesService dep.
  controllers: [CourseRegistrationController],
  providers: [
    CourseRegistrationService,
    PrismaService,
    ConfigService,
    IpaasServicesService,
    UserInfoService,
  ],
})
export class CourseRegistrationModule {}

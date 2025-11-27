import { Module } from '@nestjs/common';
import { CourseScheduleService } from './course-schedule.service';
import { CourseScheduleController } from './course-schedule.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ValidateExpirationSchedule } from './cron/validate-expiration-schedule';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '@app/shared/email/email.service';
import { CreaApiClientService } from '../crea-api-client/crea-api-client.service';
import { HttpModule } from '@nestjs/axios';
import { UserInfoService } from '../user-info/user-info.service';
import { CourseRegistrationService } from '../course-registration/course-registration.service';
import { IpaasServicesService } from '../ipaas-services/ipaas-services.service';

@Module({
  imports: [HttpModule],
  controllers: [CourseScheduleController],
  providers: [
    CourseScheduleService,
    PrismaService,
    ConfigService,
    ValidateExpirationSchedule,
    EmailService,
    CreaApiClientService,
    UserInfoService,
    CourseRegistrationService,
    IpaasServicesService,
  ],
})
export class CourseScheduleModule {}

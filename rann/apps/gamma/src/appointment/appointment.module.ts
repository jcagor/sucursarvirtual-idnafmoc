import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '@app/shared/email/email.service';
import { AwsS3ClientService } from '../aws-s3-client/aws-s3-client.service';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    PrismaService,
    EmailService,
    AwsS3ClientService,
    UserInfoService
  ],
})
export class AppointmentModule {}

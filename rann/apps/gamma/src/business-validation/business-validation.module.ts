import { Module } from '@nestjs/common';
import { BusinessValidationService } from './business-validation.service';
import { BusinessValidationController } from './business-validation.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentService } from '../appointment/appointment.service';
import { EmailService } from '@app/shared/email/email.service';
import { AwsS3ClientService } from '../aws-s3-client/aws-s3-client.service';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  controllers: [BusinessValidationController],
  providers: [
    BusinessValidationService,
    PrismaService,
    AppointmentService,
    EmailService, //<- appointment service dep
    AwsS3ClientService, //<- appointment service dep
    UserInfoService,
  ],
})
export class BusinessValidationModule {}

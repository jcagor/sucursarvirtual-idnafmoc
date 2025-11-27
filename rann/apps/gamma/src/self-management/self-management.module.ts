import { Module } from '@nestjs/common';
import { SelfManagementService } from './self-management.service';
import { SelfManagementController } from './self-management.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoService } from '../user-info/user-info.service';
import { EmailService } from '@app/shared/email/email.service';

@Module({
  controllers: [SelfManagementController],
  providers: [
    SelfManagementService,
    PrismaService,
    UserInfoService,
    EmailService,
  ],
})
export class SelfManagementModule {}

import { Module } from '@nestjs/common';
import { FormUtilsService } from './form-utils.service';
import { FormUtilsController } from './form-utils.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  controllers: [FormUtilsController],
  providers: [FormUtilsService, PrismaService, UserInfoService],
})
export class FormUtilsModule {}

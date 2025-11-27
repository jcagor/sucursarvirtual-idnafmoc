import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService, PrismaService],
})
export class UserInfoModule {}

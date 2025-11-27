import { Module } from '@nestjs/common';
import { UserSiseService } from './user-sise.service';
import { UserSiseController } from './user-sise.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserSiseController],
  providers: [UserSiseService, PrismaService],
})
export class UserSiseModule {}

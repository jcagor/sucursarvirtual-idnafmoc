import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  controllers: [ProgramController],
  providers: [ProgramService, PrismaService, UserInfoService],
})
export class ProgramModule {}

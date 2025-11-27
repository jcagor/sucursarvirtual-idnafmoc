import { Module } from '@nestjs/common';
import { PsychologistTestService } from './psychologist-test.service';
import { PsychologistTestController } from './psychologist-test.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  controllers: [PsychologistTestController],
  providers: [PsychologistTestService, PrismaService, UserInfoService],
})
export class PsychologistTestModule {}

import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  controllers: [CurriculumController],
  providers: [CurriculumService, PrismaService, UserInfoService],
  exports: [CurriculumService],
})
export class CurriculumModule {}

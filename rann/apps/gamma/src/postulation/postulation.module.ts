import { Module } from '@nestjs/common';
import { PostulationService } from './postulation.service';
import { PostulationController } from './postulation.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CurriculumService } from '../curriculum/curriculum.service';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  controllers: [PostulationController],
  providers: [
    PostulationService,
    PrismaService,
    CurriculumService, 
    UserInfoService,
  ],
  imports:[],
})
export class PostulationModule {}

import { Module } from '@nestjs/common';
import { WorkPlanService } from './work-plan.service';
import { WorkPlanController } from './work-plan.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WorkPlanController],
  providers: [WorkPlanService, PrismaService],
})
export class WorkPlanModule {}

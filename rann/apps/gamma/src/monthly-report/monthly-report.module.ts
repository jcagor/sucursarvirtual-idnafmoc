import { Module } from '@nestjs/common';
import { MonthlyReportService } from './monthly-report.service';
import { MonthlyReportController } from './monthly-report.controller';
import { PrismaService } from '../prisma/prisma.service';
import { WorkPlanService } from '../work-plan/work-plan.service';
import { UserInfoService } from '../user-info/user-info.service';

@Module({
  controllers: [MonthlyReportController],
  providers: [
    MonthlyReportService,
    PrismaService,
    WorkPlanService,
    UserInfoService,
  ],
})
export class MonthlyReportModule {}

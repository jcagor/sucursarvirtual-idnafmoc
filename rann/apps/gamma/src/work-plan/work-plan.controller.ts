import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkPlanService } from './work-plan.service';
import { CreateWorkPlanDto } from './dto/create-work-plan.dto';
import { QueryWorkPlanDto } from './dto/query-work-plan.dto';

@Controller('work-plan')
export class WorkPlanController {
  constructor(private readonly workPlanService: WorkPlanService) {}

  @Post()
  create(@Body() createWorkPlanDto: CreateWorkPlanDto) {
    return this.workPlanService.create(createWorkPlanDto);
  }

  @Post("/generate-report")
  generateReport(@Body() queryReport: QueryWorkPlanDto) {
    return this.workPlanService.getWorkPlansForReport(queryReport);
  }
}


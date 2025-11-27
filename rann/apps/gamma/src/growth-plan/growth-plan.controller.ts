import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GrowthPlanService } from './growth-plan.service';
import { CreateGrowthPlanDto, CreateGrowthPlanReportDto, UpdateGrowthPlanReportDto } from './dto/create-growth-plan.dto';
import { Public } from '@app/shared/interceptors/public.interceptor';

@Controller('growth-plan')
export class GrowthPlanController {
  constructor(private readonly growthPlanService: GrowthPlanService) {}

  @Post()
  create(@Body() createGrowthPlanDto: CreateGrowthPlanDto) {
    return this.growthPlanService.create(createGrowthPlanDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.growthPlanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrowthPlanDto: any) {
    return this.growthPlanService.update(id, updateGrowthPlanDto);
  }

  // Report Endpoints  
  @Post('report')
  createReport(@Body() createGrowthPlanReportDto: CreateGrowthPlanReportDto) {
    return this.growthPlanService.createReport(createGrowthPlanReportDto);
  }

  @Get('report/:pillar_id')
  findOneReport(@Param('id') id: string) {
    return this.growthPlanService.findReports(id);
  }

  @Patch('report/:id')
  updateReport(@Param('id') id: string, @Body() updateGrowthPlanReportDto: UpdateGrowthPlanReportDto) {
    return this.growthPlanService.updateReport(id, updateGrowthPlanReportDto);
  }
}

import { Injectable } from '@nestjs/common';
import {
  CreateGrowthPlanDto,
  CreateGrowthPlanReportDto,
  UpdateGrowthPlanReportDto,
} from './dto/create-growth-plan.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GrowthPlanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGrowthPlanDto: CreateGrowthPlanDto) {
    const businessProfileExists = await this.prisma.businessProfile.findFirst({
      where: { id: createGrowthPlanDto.businessProfile_id },
    });

    if (!businessProfileExists) {
      throw new Error('Business profile not found');
    }

    return await this.prisma.growthPlan.create({
      data: {
        businessProfile_id: createGrowthPlanDto.businessProfile_id,
        growthPlan: createGrowthPlanDto.growthPlan,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.growthPlan.findFirst({
      where: { businessProfile_id: id },
    });
  }

  async update(id: string, updateGrowthPlanDto: CreateGrowthPlanDto) {
    return this.prisma.growthPlan.update({
      where: { id },
      data: { growthPlan: updateGrowthPlanDto.growthPlan },
    });
  }

  // Growth Plan Report
  async updateReport(
    id: string,
    updateGrowthPlanDto: UpdateGrowthPlanReportDto,
  ) {
    const timeNow = new Date();
    return await this.prisma.growthPlanReport.update({
      where: { id: updateGrowthPlanDto.id },
      data: { ...updateGrowthPlanDto, updated_at: timeNow },
    });
  }
  async findReports(id: string) {
    return await this.prisma.growthPlanReport.findMany({
      where: { pillar_id: id },
    });
  }
  async createReport(createGrowthPlanReportDto: CreateGrowthPlanReportDto) {
    const timeNow = new Date();

    const growthPlanPillar = await this.prisma.growthPlan.findUnique({
      where: { id: createGrowthPlanReportDto.pillar_id },
    });

    if (!growthPlanPillar) {
      throw new Error('Growth plan not found');
    }

    return await this.prisma.growthPlanReport.create({
      data: {
        ...createGrowthPlanReportDto,
        pillar_id: growthPlanPillar.id,
        updated_at: timeNow,
      },
    });
  }
}

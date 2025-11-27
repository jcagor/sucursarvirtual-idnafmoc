import { Injectable } from '@nestjs/common';
import { CreateWorkPlanDto } from './dto/create-work-plan.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryWorkPlanDto } from './dto/query-work-plan.dto';
import { DataBusinessDto } from '../dto/dataBusinessDto';

@Injectable()
export class WorkPlanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkPlanDto: CreateWorkPlanDto) {
    const businessProfileExists = await this.prisma.businessProfile.findFirst({
      where: { id: createWorkPlanDto.businessProfile_id },
    });

    if (!businessProfileExists) {
      throw new Error('Business profile not found');
    }

    return await this.prisma.workPlan.create({
      data: {
        businessProfile_id: createWorkPlanDto.businessProfile_id,
        workPlan: {
          keyActivity: createWorkPlanDto.keyActivity,
          indicators: Array.isArray(createWorkPlanDto.indicators)
            ? createWorkPlanDto.indicators.map((indicator) => ({
                ...indicator,
              }))
            : [],
          topicsToDiscuss: createWorkPlanDto.topicsToDiscuss,
        },
      },
    });
  }

  /**
   * Function to read the work plans and generate reports for lalande
   */
  async getWorkPlansForReport(query: QueryWorkPlanDto) {
    if (query.businessProfile_id) {
      const businessProfileExists = await this.prisma.businessProfile.findFirst(
        {
          where: { id: query.businessProfile_id },
        },
      );

      if (!businessProfileExists) {
        throw new Error('Business profile not found');
      }

      const dataBusiness = businessProfileExists.data as {
        DataBusiness: DataBusinessDto;
      };

      const businessName = dataBusiness.DataBusiness.BusinessName;

      const workPlans = await this.prisma.workPlan.findMany({
        where: {
          businessProfile_id: query.businessProfile_id,
        },
      });

      return workPlans.map((wp) => {
        return { ...wp, businessName: businessName };
      });
    } else {
      const businessProfiles = await this.prisma.businessProfile.findMany();

      let businessPlans = [];
      for (const business of businessProfiles) {
        const dataBusiness = business.data as {
          DataBusiness: DataBusinessDto;
        };

        const businessName = dataBusiness.DataBusiness.BusinessName;

        const workPlan = await this.prisma.workPlan.findMany({
          where: {
            businessProfile_id: query.businessProfile_id,
          },
        });

        const businessPlanList = workPlan.map((wp) => {
          return { ...wp, businessName: businessName };
        });

        businessPlans = [...businessPlans, ...businessPlanList];
      }

      return businessPlans;
    }
  }
}

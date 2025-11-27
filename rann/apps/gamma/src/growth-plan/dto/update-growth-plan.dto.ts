import { PartialType } from '@nestjs/swagger';
import { CreateGrowthPlanDto } from './create-growth-plan.dto';

export class UpdateGrowthPlanDto extends PartialType(CreateGrowthPlanDto) {}

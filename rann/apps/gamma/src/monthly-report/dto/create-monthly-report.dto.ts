import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateMonthlyReportDto {
  @IsNotEmpty()
  @IsString()
  introduction: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  businessId: string;

  @IsNotEmpty()
  @IsNumber()
  budgetedHoursPerMonth: number;

  @IsNotEmpty()
  @IsNumber()
  hoursExecutedPerMonth: number;

  @IsNotEmpty()
  @IsNumber()
  expectedProgressPercentage: number;

  @IsNotEmpty()
  @IsNumber()
  totalProgress: number;

  @IsNotEmpty()
  @IsString()
  lineOfIntervention: string;

  @IsNotEmpty()
  @IsString()
  associatedIndicators: string;

  @IsNotEmpty()
  @IsString()
  conclusions: string;

  @IsNotEmpty()
  @IsString()
  interventionCompanyName: string;

  @IsNotEmpty()
  @IsString()
  prioritisedLineOfIntervention: string;

  @IsNotEmpty()
  @IsNumber()
  indicatorsProgress: number;

  @IsNotEmpty()
  @IsString()
  actionPlanDuringTheExecutionPeriod: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  complianceWithResults: string;

  @IsNotEmpty()
  @IsNumber()
  hoursRecorded: number;

  @IsNotEmpty()
  valueBeforeIVA: string | number;

  @IsNotEmpty()
  valueIVA: string | number;

  @IsNotEmpty()
  valueIncludedIVA: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MilestoneDto)
  milestones: MilestoneDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MilestoneInterventionDto)
  milestoneInterventions: MilestoneInterventionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReportFindingDto)
  reportFindings: ReportFindingDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnnexDto)
  annexes: AnnexDto[];

  @IsNotEmpty()
  @IsString()
  urlPowerBi: string;

  [key: string]: string | number | boolean | object | null;
}

export class QueryReportByBusinessDto {
  @IsNotEmpty()
  @IsString()
  businessId: string;
}

class MilestoneDto {
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsNumber()
  percentageOfProgress: number;

  @IsOptional()
  description: string;

  @IsOptional()
  file: any;
}

class MilestoneInterventionDto {
  @IsOptional()
  @IsString()
  capital: string;

  @IsOptional()
  @IsString()
  newMarkets: string;

  @IsOptional()
  @IsString()
  newSuppliers: string;

  @IsOptional()
  @IsString()
  others: string;

  @IsOptional()
  @IsString()
  observations: string;
}

class ReportFindingDto {
  @IsOptional()
  @IsString()
  improvementOpportunity: string;

  @IsOptional()
  @IsString()
  actionPlan: string;

  @IsOptional()
  @IsString()
  correctionDate: Date;
}

class AnnexDto {
  @IsOptional()
  @IsString()
  annexType: string;

  @IsOptional()
  @IsString()
  quantity: string;

  @IsOptional()
  @IsString()
  detail: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGrowthPlanDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  businessProfile_id: string;

  @IsNotEmpty()
  growthPlan: {
    Name: string;
    Vision: string;
    Purpose: string;
    Roles: string;
    Challenges: string;
    Resources: string;
    Results: string;
  }[];
}

export class CreateGrowthPlanReportDto {
  //id                  String     @id @db.Uuid
  @IsNotEmpty()
  @IsString()
  pillar_id: string; //@db.Uuid

  @IsNotEmpty()
  @IsString()
  pillar_indicator: string;

  @IsNotEmpty()
  @IsString()
  data_source: string;

  @IsOptional()
  @IsNumber()
  base_line: number;

  @IsOptional()
  @IsNumber()
  pillar_proposed_goal: number;

  @IsOptional()
  @IsNumber()
  month_one_goal: number;

  @IsOptional()
  @IsNumber()
  month_one_real: number;

  @IsOptional()
  @IsNumber()
  month_two_goal: number;

  @IsOptional()
  @IsNumber()
  month_two_real: number;

  @IsOptional()
  @IsNumber()
  month_three_goal: number;

  @IsOptional()
  @IsNumber()
  month_three_real: number;

  @IsOptional()
  @IsNumber()
  month_four_goal: number;

  @IsOptional()
  @IsNumber()
  month_four_real: number;

  @IsOptional()
  @IsNumber()
  month_five_goal: number;

  @IsOptional()
  @IsNumber()
  month_five_real: number;

  @IsOptional()
  @IsNumber()
  month_six_goal: number;

  @IsOptional()
  @IsNumber()
  month_six_real: number;

  //created_at: string; //?  @db.Timestamptz(6)
  //updated_at: string; //?  @db.Timestamptz(6)
  //state: boolean; //?
}

export class UpdateGrowthPlanReportDto extends CreateGrowthPlanReportDto {
  @IsNotEmpty()
  @IsString()
  id: string; //@db.Uuid
}

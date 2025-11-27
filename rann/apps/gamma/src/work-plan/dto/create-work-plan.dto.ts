import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWorkPlanDto {
  @IsString()
  @IsNotEmpty()
  businessProfile_id: string;

  @IsString()
  @IsNotEmpty()
  keyActivity: string;

  @IsArray()
  @IsNotEmpty()
  indicators: IndicatorsDto[];

  @IsArray()
  @IsNotEmpty()
  topicsToDiscuss: string[];
}

export class IndicatorsDto {
  @IsNumber()
  @IsNotEmpty()
  baseline: number;

  @IsNumber()
  @IsNotEmpty()
  finalValue: number;

  @IsNumber()
  @IsNotEmpty()
  goal: number;

  @IsString()
  @IsNotEmpty()
  indicator: string;

  @IsNumber()
  @IsNotEmpty()
  mobility: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}

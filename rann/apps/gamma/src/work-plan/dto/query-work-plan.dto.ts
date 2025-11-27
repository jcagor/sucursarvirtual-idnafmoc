import { IsOptional, IsString } from 'class-validator';

export class QueryWorkPlanDto {
  @IsString()
  @IsOptional()
  businessProfile_id?: string;
}
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProgramSessionDto {
  @IsString()
  id: string;

  @IsString()
  programSchedule_id: string;

  @IsString()
  name: string;

  @IsString()
  typeSession: string;

  @IsString()
  endDate: Date;

  @IsString()
  value: string;
}

export class BusinessInscriptionDto {
  @IsString()  
  programSchedule_id: string;

  @IsOptional()
  @IsString()
  businessProfile_id: string;
}

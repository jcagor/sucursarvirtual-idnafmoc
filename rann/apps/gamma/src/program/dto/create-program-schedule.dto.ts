import { IsString } from 'class-validator';

export class CreateProgramScheduleDto {
  @IsString()
  program_id: string;

  @IsString()
  name: string;

  @IsString()
  startDate: Date;

  @IsString()
  endDate: Date;

  @IsString()
  description: string;

  @IsString()
  value: string;
}

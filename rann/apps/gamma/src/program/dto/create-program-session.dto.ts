import { IsString } from 'class-validator';

export class CreateProgramSessionDto {
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

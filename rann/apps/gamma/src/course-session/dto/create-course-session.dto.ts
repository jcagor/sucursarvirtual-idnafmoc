import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseSessionDto {
  @IsString()
  @IsNotEmpty()
  schedule_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  typeSession: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsNotEmpty()
  date: Date;
}

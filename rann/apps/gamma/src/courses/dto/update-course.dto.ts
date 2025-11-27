import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  id: string;

  @IsString()
  course_id: string;

  @IsString()
  name: string;

  @IsString()
  modality: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsString()
  typeUser: string;

  @IsString()
  supplier: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  description: string;
}

import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CourseScheduleAccessType } from '../entities/CourseScheduleAccessType';
export class CreateCourseScheduleDto {
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
  description: string;

  @IsString()
  id_regional: string;

  @IsString()
  cost: String;

  @IsString()
  accessType: CourseScheduleAccessType;
}

export class FindCourseScheduleDto {
  @IsString()
  courseName: string;

  @IsBoolean()
  unemployed: boolean;

  @IsString()
  @IsOptional()
  courseCode: string;
}

export class QueryValidateEmployeeForCourseDto {
  @IsString()
  documentType: string;
  @IsString()
  documentNumber: string;
  @IsString()
  courseId: string;
}

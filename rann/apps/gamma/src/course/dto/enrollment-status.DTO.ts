import { IsString, IsNotEmpty } from 'class-validator';

export class EnrollmentStatusDto {
  @IsString()
  @IsNotEmpty()
  document_type: string;

  @IsString()
  @IsNotEmpty()
  document_number: string;

  @IsString()
  @IsNotEmpty()
  nameCourse: string;
}

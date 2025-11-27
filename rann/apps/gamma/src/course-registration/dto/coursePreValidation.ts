import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class queryUserAndCourseValidationDto {
  @IsNotEmpty()
  @IsString()
  identification_type: string;

  @IsNotEmpty()
  @IsString()
  identification_number: string;

  @IsNotEmpty()
  @IsArray()
  courses: Array<string>;
}

export class queryUserValidationDto {
  @IsNotEmpty()
  @IsString()
  identification_type: string;

  @IsNotEmpty()
  @IsString()
  identification_number: string;
}

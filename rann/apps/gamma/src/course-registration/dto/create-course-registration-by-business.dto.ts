import { IsString, IsArray, IsObject } from 'class-validator';

export class RegistrantPerson{
  document_type: string;
  document_number: string;
  firstName: string;
  middleName: string;
  firstLastName: string;
  middleLastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  status: string;
  observations: string;
}

export class CreateCourseRegistrationByBusinessDto {
  @IsString()
  course_schedule_id: string;

  @IsArray()
  employees: RegistrantPerson[];
}

export class CreateCourseUnemployedRegistrationDto {
  @IsString()
  course_schedule_id: string;

  @IsObject()
  unemployed: RegistrantPerson;
}

export class CreateCourseWorkerRegistrationDto {
  @IsString()
  course_schedule_id: string;

  @IsObject()
  employee: RegistrantPerson;
}

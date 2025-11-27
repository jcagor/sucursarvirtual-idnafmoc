export interface CourseType {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
}

export interface QueryValidateEmployeeForCourse{
  documentType:string,
  documentNumber:string,
  courseId:string;
}

export interface QueryDeleteCourseRegistration{
  registrationId:string;
}

export interface UserCourseValidationInterface {
  status: boolean;
  response_code: number;
}

export interface UserCourseDeleteInterface {
  error?: boolean;
  success?: boolean
  message?: string;
}

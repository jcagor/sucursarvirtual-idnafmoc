import { EmployeeType } from "./EmployeeType";

export interface PostulationType {
  id: string;
  courseSchedule_id: string;
  document_number: string;
  courseRegistration: EmployeeType[];
}

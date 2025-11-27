export interface CourseScheduleType {
  id?: string;
  course_id: string;
  name: string;
  modality: string;
  startDate: Date;
  endDate: Date;
  typeUser: string;
  supplier: string;
  sessions?: number;
  id_regional?: string;
  cost?: number;
  accessType?: string;
  state?: string;
  description?: string;
}

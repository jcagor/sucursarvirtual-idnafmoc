export interface CreateScheduleType {
  id?: string;
  course_id: string;
  name: string;
  modality: string;
  startDate: Date;
  endDate: Date;
  typeUser: string;
  sessions?: number;
  state?: string;
  description?: string;
}

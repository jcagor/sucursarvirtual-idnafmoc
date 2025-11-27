export interface CourseCurriculumType {
  id?: string;
  courseSchedule_id: string;
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  sessionType: string;
  session: number;
}

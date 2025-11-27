export interface AppointmentType {
  id: string;
  name?: string;
  businessProfile_id: string;
  document_number: number;
  date: Date;
  attendance: string;
}

export interface AppointmentType {
  id: string;
  name?: string;
  businessProfile_id: string;
  document_number: number;
  date: Date;
  attendance: string;
  type:string;
}

export interface AppointmentTypeList extends Array<AppointmentType>{};
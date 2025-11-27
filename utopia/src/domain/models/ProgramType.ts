export interface ProgramType {
  id_program: string;
  name?: string;
  programSchedules?: Array<BusinessList>;
}

export interface SchedulesInfo {
  BusinessList: Array<BusinessList>;
}

export interface ProgramObject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  minimum_number_workers: number;
  iconUrl: string;
  months_of_constitution: number;
  programSchedules?: Array<SchedulesInfo>;
}

export interface ProgramObjectList extends Array<ProgramObject> {}

export interface BusinessInfo {
  id: string;
}

export interface BusinessList extends Array<BusinessInfo> {}

export interface ScheduleObject {
  id: string;
  program_id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  value: number;
}

export interface ScheduleObjectList extends Array<ScheduleObject> {}

export interface ProgramInscription {
  programSchedule_id: string;
  businessProfile_id?: string;
}

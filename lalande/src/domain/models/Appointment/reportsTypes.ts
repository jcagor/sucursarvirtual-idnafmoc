export interface BusinessHoursReport {
  businessId: string;
  businessName: string;
  businessNit: string;
  hoursPlaned: string;
  hoursExecuted: string;
  hoursPlanedComplete: string;
  hoursExecutedComplete: string;
}

export interface BusinessHoursReportList extends Array<BusinessHoursReport> {}

export interface BusinessGeneralInfo{
  name:string;
  nit:string;
  city:string;
  department:string;
}

export interface BusinessAttendedReport {
  consultantId: string;
  consultantName: string;
  consultantIdentification: string;
  businessAttended: string;
  businessList?:Array<BusinessGeneralInfo>  
}

export interface BusinessAttendedReportList extends Array<BusinessAttendedReport> {}

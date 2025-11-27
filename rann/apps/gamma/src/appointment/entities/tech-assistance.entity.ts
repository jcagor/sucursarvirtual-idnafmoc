export class TechAssistance {}

export interface AssistanceRecordForm {
    appointmentId:string;
    assistance:string;
    businessName:string;    
    businessId?:string;
    operator:string;    
    startTime:string;    
    endTime:string;
    interventionTime:string;    
    date:string;
    assignedConsultor:string;
    consultantId?:string;
    program:string;
    assistant:string;
    sessionScope:string;
    signOneName:string;
    signTwoName:string;
    signOneDocument:string;
    signTwoDocument:string;

    //evidence:FormCustomFileEntity; aws bucket files
    //signOneEvidence:FormCustomFileEntity; aws bucket files
    //signTwoEvidence:FormCustomFileEntity; aws bucket files
}

export interface FormCustomFileEntity{
    name:string,
    type:string,
    size:number,
    data:string,
}

export interface FormCustomFileEntityList extends Array<FormCustomFileEntity>{};

export enum TECH_REVISION_STATUS {
  approved = "APPROVED",
  rejected = "REJECT",
  pending = "PENDING", // UI only
  unknown = "UNKNOWN", // UI only
}

export interface S3FileId extends String{};
export interface S3FileList extends Array<S3FileId>{};
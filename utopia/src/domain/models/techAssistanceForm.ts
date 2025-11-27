import { Blob } from "buffer";
import { TECH_REVISION_STATUS, TextDateMoleculeList, TextRowsMoleculeList } from "lib";

export interface FormCustomFileEntity{
    name:string,
    type:string,
    size:number,
    data:string,
}

export interface FormCustomFileEntityList extends Array<FormCustomFileEntity>{}

// Business sign techRecord types

export interface PendingTechRecordSign{
    id:string;
    tech_record_id:string;
    consultant_name:string;
    appointment_date:string;
}

export interface PendingTechRecordSignList extends Array<PendingTechRecordSign>{}

export interface S3FileId extends String{};
export interface S3FileList extends Array<S3FileId>{};

export interface SaveAssistanceStatusForm{    
    status: TECH_REVISION_STATUS;
}

export interface AssistanceRecordForm {
    appointmentId:string;
    assistance:string;
    businessName:string;
    businessId:string;    
    operator:string;    
    startTime:string;    
    endTime:string;
    interventionTime:string;    
    date:string;
    assignedConsultor:string;
    consultantId:string;
    program:string;
    assistant:string;
    sessionScope:string;
    signOneName:string;
    signTwoName:string;
    signOneDocument:string;
    signTwoDocument:string;
    commitments: TextDateMoleculeList,
    deliverables: TextRowsMoleculeList,
    evidence:FormCustomFileEntity;
    signOneEvidence:FormCustomFileEntity;
    signTwoEvidence:FormCustomFileEntity;
}

export interface TechRecordEvidencesInformation {
    evidences: S3FileList,
    signOneEvidence: S3FileId,
    signTwoEvidence: S3FileId
}

export interface SaveAssistanceRecordFormStatus{
    id:string;
    created_at:string,
    updated_at:string;
    appointment_id:string;
    information:AssistanceRecordForm;
    identification_type:string;
    identification_number:string;
    download_links:TechRecordEvidencesInformation;
    state:string|null;
}

export interface RevisionStructure {
    observation:string;
}
export interface AssistanceRecordBusinessSignQuery {
    id:string;    
    signTwoName:string;    
    signTwoDocument:string;    
    signTwoEvidence:FormCustomFileEntity;
}
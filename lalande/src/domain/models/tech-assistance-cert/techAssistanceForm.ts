import { Blob } from "buffer";
import { APPOINTMENT_ATTENDANCE_STATUS, TECH_REVISION_STATUS, TextDateMoleculeList, TextRowsMoleculeList } from "lib";

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

export interface MultilineInputTextLine {
    textDescription:string;
}

export interface MultilineInputTextLineList extends Array<MultilineInputTextLine>{};

export interface MultilineTextDateInput {
    isoDateString: string;
    textDescription: string;
    timestamp: string;
}

export interface MultilineTextDateInputList extends Array<MultilineTextDateInput>{}

export interface SaveAssistanceStatusForm{    
    status: TECH_REVISION_STATUS;
}

export interface RevisionStructure {
    observation:string;
}

export interface TechRecordRevisionReview {
    revision?: RevisionStructure;
}

export interface SaveAssistanceRecordRevision{
    id?:string;
    record_id:string;
    review: TechRecordRevisionReview
    status: TECH_REVISION_STATUS,    
    identification_type?:string;
    identification_number?:string;    
    created_at?:string,
    updated_at?:string;
    state?:boolean;
}

export interface TechAssistanceRecordRevision{
    appointment_id: string;
    business_id: string;
    tech_record_id: string;
    tech_record_revision_id: string|null;

    appointment_created_at: string;
    appointment_date: string;
    tech_assistance_created_at: string;
    tech_revision_created_at: string|null;

    appointment_attendance: APPOINTMENT_ATTENDANCE_STATUS;
    tech_revision_status: TECH_REVISION_STATUS|null;
}

export interface TechAssistanceCorrection{
    appointment_id: string;
    business_id: string;
    tech_record_id: string;
    tech_record_revision_id: string|null;

    appointment_created_at: string;
    appointment_date: string;
    tech_assistance_created_at: string;
    tech_revision_created_at: string|null;

    appointment_attendance: APPOINTMENT_ATTENDANCE_STATUS;
    tech_revision_status: TECH_REVISION_STATUS|null;
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


export interface FormCustomFileEntity{
    name:string,
    type:string,
    size:number,
    data:string,
}

export interface S3FileId extends String{};

export interface FormCustomFileEntityList extends Array<FormCustomFileEntity>{}
export interface TechAssistanceRecordRevisionList extends Array<TechAssistanceRecordRevision>{};
export interface TechAssistanceCorrectionList extends Array<TechAssistanceCorrection>{};
export interface S3FileList extends Array<S3FileId>{};
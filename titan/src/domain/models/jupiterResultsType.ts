export interface JupiterDocumentQuery{    
    document_abbreviation:string;
    document:string;    
    document_type_id?:string;
}

export interface JupiterDocumentResult{    
    document_abbreviation:string;
    document:string;    
    postulation_state:string;
}

export interface JupiterStatusQuery{    
    documents:Array<JupiterDocumentQuery>;    
}

export interface JupiterStatusResult extends Array<JupiterDocumentResult>{};

export enum JUPITER_STATUS{
    NO_POSTULATION = "No tiene postulación",
    BENEFICIARY_ASSIGNED = "Beneficio asignado",
    BENEFICIARY_ASSIGNED_TRAINING = "Beneficio asignado a capacitación",
}

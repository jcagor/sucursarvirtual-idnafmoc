import { JupiterDocumentResult } from "domain/models/jupiterResultsType";

export interface UserMpacDataInterface {
  OUT_Tipo_Documento_Cliente:string;
  OUT_Numero_Documento_Cliente: string;           
  OUT_IdState:string;
  OUT_Description: string;
  OUT_reason: string;
  OUT_postulateMode?: string;
  OUT_Fecha_Nacimiento_Cliente_Fmt1: string;
  OUT_Nombre_Empresa?: string;
  OUT_Fecha_Retiro_Empresa_Fmt2: string;
  OUT_NIT?:string;
  OUT_Tipo_Actor: string;
  OUT_Salida: string;
  OUT_Salario_Pila: string;
  OUT_Law?: string; // Internally calculated
  jupiterStatus?: JupiterDocumentResult; //additional Jupiter Response.
}

export interface SaveMpacStatusHistoryServerResponse {
  id: string;
  created_at: string;
  updated_at: string;
  identification_number: string;
  identification_type: string;
  validation_pass: string;
  response_data: string;
  law: string;
  business_name: string;
  business_identification: string;
  state: string;
}

export interface SaveMpacStatusHistoryQuery {  
  identificationNumber: string;
  identificationType: string;
  validationPass: boolean;
  responseData: {};
  law: string;
  businessName: string;
  businessIdentification: string;  
}

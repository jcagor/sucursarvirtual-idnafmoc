export interface UnvalidatedBusinessType {
  id: string;
  reason: string[];
  status: string;
  updatedAt: string;
  document_number: string;
  document_type_id: string;
}

export interface ErrorInformation{
    error:boolean,
    message:string,
}
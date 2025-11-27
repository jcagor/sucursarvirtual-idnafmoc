export interface ClientError {
  numeroDocumento: string;
  nombre: string;
  statusDocument: string;
  message: string;
}

export interface DocumentData {
  numeroDocumento: number;
  codTipoDocumento: string;
  tipoDocumento: string;
  bp: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  municipioExpedicion: string;
  departamentoExpedicion: string;
  indFuente: number;
  estadoRNEC: string;
  estadoVivo: string;
  fuenteCert: string;
  cuarentena: number;
  fechaExpedicion: string;
  fechaNacimiento: string;
}

// DocumentResponse interface
export interface DocumentResponse {
  documentDataList?: DocumentData[];
  documentData?: DocumentData;
  listClientError?: ClientError[];
  listNotFound?: ClientError[];
  listDocAlreadyExistWithOtherDocType?: ClientError[];
  listInvalidStatusClientError?: ClientError[];
}

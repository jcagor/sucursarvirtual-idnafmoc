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
}

export enum MPAC_API_USER_TYPE_ENUM {
  ERROR = "ERROR", //- No cumple
  BENEFICIARY = "BENEFICIARIO", //- Beneficiario
  ACTIVE_WORKER = "TRABAJADOR ACTIVO", //- Trabajador activo
  CESANT = "CESANTE", //- Cesante
  RETIRED = "RETIRADO", //- pensionado
  UNIVERSAL = "UNIVERSAL", //- Población universal
}

export enum MPAC_API_RESULT_CODE_ENUM {
  OK = "Consulta exitosa", //-Consulta exitosa
  ERROR = "", //-Error en la consulta [Multiple values and descriptions]
}

export enum MPAC_API_USER_REQUIREMENT_STATUS_ENUM {
  OK = "Cumple", // Usuario cumple
  ERROR = "NO", // Usuario no cumple
}
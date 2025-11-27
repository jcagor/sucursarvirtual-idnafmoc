export interface IWithdrawalResponse {
  ZSUB_TIPO_IDENT_EMPRESA: string;
  ZSUB_NIF_EMPRESA: string;
  ZSUB_DIGITO_VERIFICA_EMPRESA: string;
  ZSUB_TIPO_IDENT: string;
  ZSUB_NIF: string;
  NAME_ORG1: string;
  NAME_ORG2: any;
  NAME_LAST: any;
  NAME_LST2: any;
  NAME_FIRST: any;
  NAMEMIDDLE: any;
  BU_NAMEP_F: string;
  BU_NAMEMID: string;
  BU_NAMEP_L: string;
  BU_NAMEPL2: string;
  ZSUB_FECHA_RET_BP: any;
  ZSUB_MOT_RETIRO: any;
  LOG: Log;
}

export interface Log {
  TipoMensaje: string;
  ID: string;
  NumeroMensaje: string;
  TextoMensaje: string;
  MensajeVariable1: string;
  MensajeVariable2: string;
  MensajeVariable3: string;
  MensajeVariable4: string;
  MensajeVariable5: string;
  MESSAGE_LOG: MessageLog[];
}

export interface MessageLog {
  codigo: string;
  tipo: string;
  desc: string;
}

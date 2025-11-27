export interface DigitalIdentityStatusResponse {
  status: number;
  message: string;
  data: ADOResponse;
}

interface ADOResponse {
  idState: any | null;
  adoBody: any | null;
}

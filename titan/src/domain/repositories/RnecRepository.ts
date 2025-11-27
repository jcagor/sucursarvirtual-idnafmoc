import { DocumentResponse } from "../models/identityWorker";

export interface IRNECRepository {
  validateIdentity(
    accessToken: string,
    documentNumber: string,
    documentType: string
  ): Promise<DocumentResponse | undefined>;
}

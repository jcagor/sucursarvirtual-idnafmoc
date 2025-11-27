import { type AxiosInstance } from "axios";
import { inject, injectable } from "inversify";
import { NETWORK_TYPES } from "../../ioc/containers/network/network.types";
import { DocumentResponse } from "domain/models/identityWorker";
import { IRNECRepository } from "domain/repositories/RnecRepository";

@injectable()
export default class RNECRepositoryImplement implements IRNECRepository {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosRiaInstance) susAxiosInstance: AxiosInstance
  ) {
    this.axiosInstance = susAxiosInstance;
  }
  async validateIdentity(
    accessToken: string,
    documentNumber: string,
    documentType: string
  ): Promise<DocumentResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      const url = `/rnec/validate-document?documentos=${documentNumber}&tipoDocumento=${documentType}`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        throw new Error(
          "/rnec/validate-document  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

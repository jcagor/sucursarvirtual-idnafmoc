import axios, { type AxiosInstance } from "axios";
import { IUserMpacStatusRepository } from "domain/repositories/userMpac.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import { UserMpacDataInterface } from "lib";

interface MpacRequestData {
  documentType: string;
  identification: string;
  userDevice: {
    os: string;
    osVersion: string;
    appVersion: string;
  };
}

@injectable()
export default class UserMpacRepository implements IUserMpacStatusRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosMpacInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;    
  }

  async requestMpacStatus(
    data: MpacRequestData,
    token: string
  ): Promise<UserMpacDataInterface | undefined> {
    try {
      console.log('Solicitud de estado MPAC:', data);
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await this.axiosInstance
        .post("/ipaas-services/v1/mpac/validate", data, config)
        .then((result) => result.data);
      
      console.log('Respuesta del API MPAC:', response);

      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al consultar el estado mpac del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }
}

import axios, { type AxiosInstance } from "axios";
import { IUserSiseValidationRepository } from "domain/repositories/userSiseValidation.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import { UserSiseResumeInformation, UserSiseValidationInterface } from "lib";

@injectable()
export default class UserSiseRepository implements IUserSiseValidationRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosSiseInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async requestSiseValidation (
    data: {},
    token: string
  ): Promise<UserSiseValidationInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await this.axiosInstance
        .post("/ipaas-services/v1/sise/validate", data, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al consultar el estado en SISE del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async requestSiseUserResume (
    data: {
      identification_type:string,
      identification_number:string
    },
    token: string
  ): Promise<UserSiseResumeInformation | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await this.axiosInstance
        .get("/ipaas-services/v1/sise/resume/" + data.identification_number, config)
        .then((result) => result.data);
      if (response) {
        return response;
      }
      return;
    } catch (error) {
      console.log(
        `Error al consultar la HV en SISE del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }
}

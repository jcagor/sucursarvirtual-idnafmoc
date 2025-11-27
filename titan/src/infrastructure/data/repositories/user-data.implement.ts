import axios, { type AxiosInstance } from "axios";
import { ResumeServerResponse } from "domain/models";
import { IUserDataRepository } from "domain/repositories/userData.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import { AvailableTrainingCourse, PostulationListServerResponse, PostulationServerResponse, SaveMpacStatusHistoryServerResponse, SelectOption, SiseUnregisteredUser, UserDataInterface } from "lib";
import { ApiResponse } from "lib/types/userDevice/userDevice.types";
import { CourseRegistrationData } from "presentation/components/templates/training/training.types";
import { jwtDecode } from "jwt-decode";

@injectable()
export default class UserDataRepository implements IUserDataRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosSculptorInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async findUserByKCId(token: string): Promise<ApiResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await this.axiosInstance
        .get("/user-identifier/findUserByKeycloakId", config)
        .then((result) => result.data);
      // DEBUG
      // console.log("findUserByKCId response:",response);
      if (response && response.data) {
        return response.data;
      }
      return;
    } catch (error) {
      console.log(
        `Error al buscar el usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async sendUserData(
    data: {},
    token: string
  ): Promise<ApiResponse | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await this.axiosInstance
        .post("/user-identifier/", data, config)
        .then((result) => result.data);
      if (response && response.data) {
        return response.data;
      }
      return;
    } catch (error) {
      console.log(
        `Error en el envio de datos del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }
}

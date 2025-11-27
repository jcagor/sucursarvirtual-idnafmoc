import { isAxiosError, type AxiosInstance } from "axios";
import { IEnroll } from "domain/models";
import { IKeycloakRepository } from "domain/repositories/keycloak.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";

@injectable()
export default class KeycloakRepositoryImplement
  implements IKeycloakRepository
{
  private axiosInstance: AxiosInstance;
  private sculptorInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosNextInstance) axiosInstance: AxiosInstance,
    @inject(NETWORK_TYPES._AxiosSculptorInstance)
    sculptorInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
    this.sculptorInstance = sculptorInstance;
  }

  // Actualización de datos de usuario
  async updateUserData(
    accessToken: string,
    userData: IEnroll
  ): Promise<boolean | undefined> {
    try {
      const url = "/keycloak/updateUser";

      let data: any = {
        username: userData.username,
        newTipoIdn: userData.identificationType,
        newIdentif: userData.identification,
        newNombre: userData.name,
        newApellido: userData.lastname,
        sexo: userData.gender,
        tipoSangre: userData.bloodType,
        lugarNacimiento: userData.placeOfBirth,
      };
      if (userData.dateOfBirth !== null)
        data = { ...data, fechaNacimiento: userData.dateOfBirth };

      if (userData.identificationExpeditionDate !== null)
        data = {
          ...data,
          fechaExpedicion: userData.identificationExpeditionDate,
        };
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      const response = await this.sculptorInstance
        .post(url, data, config)
        .catch((e) => {
          console.log(e.response.data);
        });
      if (response && response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // Cierre de sesión
  async logout(accessToken: string) {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `/api/auth/logout`;

      const resp = await this.axiosInstance.get(url, config);

      if (resp) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      } else {
        throw error;
      }
    }
  }
}

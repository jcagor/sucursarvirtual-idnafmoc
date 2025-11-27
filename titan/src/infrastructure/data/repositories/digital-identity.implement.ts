import { type AxiosInstance } from "axios";
import { IDigitalIdentityRepository } from "domain/repositories/digitalIdentity.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import { AdoResponseInterface } from "lib";

@injectable()
export class DigitalIdentityRepository implements IDigitalIdentityRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosSculptorInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async findStatusByUser(accessToken: string): Promise<any> {
    // Agregar lógica para enviar el token en la solicitud HTTP
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      // Utilizar la instancia de Axios para realizar la solicitud
      const response = await this.axiosInstance.get(
        `/digital-identity/findTransactionSuccessByUser`,
        requestOptions
      );
      const digitalIdentityStatus = response.data;

      // Verifica si la respuesta es exitosa y devuelve los datos
      if (response && response.status >= 200 && response.status < 299) {
        return digitalIdentityStatus;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "digitalIdentity/consultRequestByUser/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error: any) {
      // Manejar errores de la solicitud
      throw error;
    }
  }

  async getLastTransaction(accessToken: string): Promise<any> {
    // Agregar lógica para enviar el token en la solicitud HTTP
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      // Utilizar la instancia de Axios para realizar la solicitud
      const response = await this.axiosInstance.get(
        `/digital-identity/findLastTransactionByUser`,
        requestOptions
      );
      const digitalIdentityStatus = response.data;

      // Verifica si la respuesta es exitosa y devuelve los datos
      if (response && response.status >= 200 && response.status < 299) {
        return digitalIdentityStatus;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "digitalIdentity/findLastTransactionByUser/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error: any) {
      if (error.response) {
        // Devolver un objeto con el código de estado y el mensaje de error
        return {
          statusCode: error.response.status,
          message: error.response.statusText,
          data: null,
        };
      } else if (error.request) {
        // Manejar el caso en que no hay respuesta del servidor
        return {
          statusCode: 500,
          message: "No se recibió respuesta del servidor",
          data: null,
        };
      } else {
        // Manejar errores en la configuración de la solicitud
        return {
          statusCode: 500,
          message: "Error al configurar la solicitud",
          data: null,
        };
      }
    }
  }

  async pushDatabase(accessToken: string, adoResponse: AdoResponseInterface) {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await this.axiosInstance.post(
        `/external/adoPushDatabase`,
        adoResponse,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        console.log(
          "external/adoPushDatabase/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error: any) {
      console.log(
        "external/adoPushDatabase/  message: Respuesta no exitosa del servidor ",
        error
      );
    }
  }
}

export default DigitalIdentityRepository;

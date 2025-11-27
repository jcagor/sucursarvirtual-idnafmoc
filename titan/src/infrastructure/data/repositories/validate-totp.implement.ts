import { AxiosError, type AxiosInstance } from "axios";
import { IValidateTotpRepository } from "domain/repositories/validateTotp.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";

interface ErrorResponse {
  error: string[],
  message: string
}

@injectable()
export default class ValidatetTotpImplement implements IValidateTotpRepository {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosSculptorInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async getVerifyTotp(totp: string, token: string): Promise<any> {
    try {

      // Estructura del body en la peticion
      const body = {
        totp,
      }
      
      // Estructura de la cabezera
      const headers = {
        headers: {
          Authorization: "Bearer " + token,
        }
      }

      // Utilizar la instancia de Axios para realizar la solicitud
      const response = await this.axiosInstance
        .post('/sts/validateTotpPayment', body, headers)
        .then((result) => result.data);

      // Valida si la respuesta fue exitosa y devuelve los datos
      if(response && response?.data?.valid !== undefined){
        return response.data;
      }
      else{
        throw new Error(
          "validateTotp/verify message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.error("Error al validar el TOTP:", axiosError);
      return { valid: false, message: "Not valid TOTP" };
    }
  }
}
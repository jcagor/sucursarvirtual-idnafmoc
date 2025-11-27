import { AxiosResponse, type AxiosInstance } from "axios";
import { IsNitValidType, RuesType } from "domain/models";
import { IRuesRepository } from "domain/repositories/rues.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";

@injectable()
export class RuesRepository implements IRuesRepository {
  private readonly axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosRuesInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async IsNitValid(
    identification_number: string
  ): Promise<IsNitValidType | undefined> {
    const URL = "http://localhost:5000/validate-nit";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        nit: identification_number,
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async GetRuesInformation(
    identification_number: string
  ): Promise<RuesType | undefined> {
    const URL = "http://localhost:5000/rues";
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        nit: identification_number,
      },
    };

    try {
      const response: AxiosResponse = await this.axiosInstance.get(
        URL,
        requestOptions
      );

      if (response && response.status >= 200 && response.status < 299) {
        return response.data;
      } else {
        throw new Error(
          URL + " " + response.status + " " + response.statusText
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }
}

export default RuesRepository;

import axios, { HttpStatusCode, type AxiosInstance } from "axios";
import { IUserFospecValidationRepository } from "domain/repositories/userFospecValidation.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import { OpenJobsList, UserFospecTrainingInterface, UserFospecValidationInterface } from "lib/types/user-data/userFospecValidation.types";
import { tree } from "next/dist/build/templates/app-page";

@injectable()
export default class UserFospecRepository implements IUserFospecValidationRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosFomentoInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async requestFospecValidation (
    data: {
      documentType: string,
      identification: string
    },
    token: string
  ): Promise<UserFospecValidationInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      
      let result = {
        status: false,
        response_code: HttpStatusCode.NoContent
      }

      const response = await this.axiosInstance        
        .get("/ipaas-services/unemployed/find-postulation/" + data?.identification, config)
        .then((result) => result.data);
        //console.log("FOMENTO RESP:", response);
      
        if (response !== undefined) {
        
        if (response === true){
          result.status = true;
          result.response_code = HttpStatusCode.Ok;
          return result;
        }
        else if(response === false){
          result.response_code = HttpStatusCode.Ok;
          return result;
        }else{
          result.response_code = HttpStatusCode.PayloadTooLarge
          return result;
        }
      }
      return;
    } catch (error) {
      console.log(error)
      console.log(
        `Error al consultar el estado FOSPEC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async requestFospecMeetValidation (
    data: {
      documentType: string,
      identification: string
    },
    token: string
  ): Promise<UserFospecValidationInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      
      let result = {
        status: false,
        response_code: HttpStatusCode.NoContent
      }

      const response = await this.axiosInstance        
        .get("/ipaas-services/unemployed/find-appointment-assignment/" + data?.identification, config)
        .then((result) => result.data);
        //console.log("FOMENTO RESP:", response);
      
        if (response !== undefined) {
        
        if (response === true){
          result.status = true;
          result.response_code = HttpStatusCode.Ok;
          return result;
        }
        else if(response === false){
          result.response_code = HttpStatusCode.Ok;
          return result;
        }else{
          result.response_code = HttpStatusCode.PayloadTooLarge
          return result;
        }
      }
      return;
    } catch (error) {
      console.log(error)
      console.log(
        `Error al consultar el estado FOSPEC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async requestFospecTraining(
    data: {
      documentType: string,
      identification: string
    }, accessToken: string): Promise<UserFospecTrainingInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      const response = await this.axiosInstance        
        .get("/ipaas-services/unemployed/find-user-training/" + data?.identification, config)
        .then((result) => result.data);
        //console.log("FOMENTO Training RESP:", response);
      
        if (response !== undefined) {        
        return response;
      }
      return;
    } catch (error) {
      console.log(error)
      console.log(
        `Error al consultar el listado cursos FOSPEC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }

  async requestFospecOpenJobs(data: {}, accessToken: string): Promise<OpenJobsList | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };

      const response = await this.axiosInstance        
        .get("/ipaas-services/employment-agency/offer/open-jobs", config)
        .then((result) => result.data);
        //console.log("FOMENTO Job List RESP:", response);
      
        if (response !== undefined) {        
        return response;
      }
      return;
    } catch (error) {
      console.log(error)
      console.log(
        `Error al consultar el estado FOSPEC del usuario: ${
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data || {})
            : error
        }`
      );
      return;
    }
  }
}

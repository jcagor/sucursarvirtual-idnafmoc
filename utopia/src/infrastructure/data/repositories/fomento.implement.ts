import axios, { isAxiosError, type AxiosInstance } from "axios";
import { VacantRegisterFormSaveStatus } from "domain/models";
import { IFomentoRepository } from "domain/repositories/fomento.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FomentoRepositoryImplement
  implements IFomentoRepository
{
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosFomentoInstance) axiosInstance: AxiosInstance,

  ) {
    this.axiosInstance = axiosInstance;
  }


  async saveJobVacancyForm(formData: {}, accessToken: string): Promise<VacantRegisterFormSaveStatus | undefined> {
      try {
        const config = {
          headers: {
            Authorization: "Bearer " + accessToken,          
          },
        };
        const response = await this.axiosInstance
          .post("/ipaas-services/job-vacancy", formData, config)
          .then((result) => result.data);      
        
        console.log("Save Vacante de empleo:", response);
        
        if (response) {
          return response;
        }
        return;
      } catch (error) {
        console.log(
          `Error al guardar el formulario de Vacantes de empleo: ${
            axios.isAxiosError(error)
              ? JSON.stringify(error.response?.data || {})
              : error
          }`
        );
        return;
      }
    }

  
}

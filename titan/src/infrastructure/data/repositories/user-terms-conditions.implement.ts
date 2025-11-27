import { AxiosError, type AxiosInstance } from "axios";
import { IUserTermAndConditionRepository } from "domain/repositories/userTermAndCondition.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";
import { inject, injectable } from "inversify";
import {
  ICreateTermAndConditionData,
  ICreateTermAndConditionDataResponse,
} from "lib/types/terms-conditions";

@injectable()
export default class UserTermAndConditionRepository
  implements IUserTermAndConditionRepository
{
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosSculptorInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async createUserTermAndConditionData(
    token: string,
    data: ICreateTermAndConditionData
  ): Promise<ICreateTermAndConditionDataResponse | undefined> {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const body = {
      idTermsAndCondition: data.idTermsAndCondition,
      nameTermAndCondition: data.nameTermAndCondition,
    };

    try {
      const result = await this.axiosInstance.post(
        `user_term_and_conditions/create`,
        body,
        config
      );
      return result.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error al crear los términos y condiciones:", axiosError);
      return undefined;
    }
  }

  async getLastUserTermsAndConditionsByName(
    token: string,
    name: string
  ): Promise<any | undefined> {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const result = await this.axiosInstance.get(
        `user_term_and_conditions/get-user-terms/${name}`,
        config
      );
      return result.data;
    } catch (error) {
      return undefined;
    }
  }
}

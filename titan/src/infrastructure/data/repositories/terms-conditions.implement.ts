import { AxiosError, type AxiosInstance } from "axios";
import { ITermAndConditionRepository } from "domain/repositories/TermAndCondition.repository";
import { NETWORK_TYPES } from "infrastructure/ioc/containers/network/network.types";

import { inject, injectable } from "inversify";
import { IGetTermAndConditionData } from "lib/types/terms-conditions";
@injectable()
export default class TermAndConditionRepository
  implements ITermAndConditionRepository
{
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosSculptorInstance) axiosInstance: AxiosInstance
  ) {
    this.axiosInstance = axiosInstance;
  }

  async getTermAndConditionData(
    token: string,
    name: string
  ): Promise<IGetTermAndConditionData | undefined> {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const result = await this.axiosInstance
      .get(`term_and_conditions/${name}`, config)
      .then((result) => result.data)
      .catch((error: AxiosError) => {
        return error;
      });
    return result;
  }
}

import { type IUserTermAndConditionRepository } from "domain/repositories/userTermAndCondition.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";

import { inject, injectable } from "inversify";
import {
  ICreateTermAndConditionData,
  ICreateTermAndConditionDataResponse,
} from "lib/types/terms-conditions";

@injectable()
export default class CreateUserTermAndConditionUseCase {
  private userTermAndConditionRepository: IUserTermAndConditionRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserTermAndConditionRepository)
    userTermAndConditionRepository: IUserTermAndConditionRepository
  ) {
    this.userTermAndConditionRepository = userTermAndConditionRepository;
  }

  async execute(
    data: ICreateTermAndConditionData,
    accessToken: string | null
  ): Promise<ICreateTermAndConditionDataResponse | any> {
    if (!accessToken) {
      console.log("No estas autenticado");
      return;
    }
    const result =
      await this.userTermAndConditionRepository.createUserTermAndConditionData(
        accessToken,
        data
      );
    if (result && result.data) {
      return result;
    }
  }
}

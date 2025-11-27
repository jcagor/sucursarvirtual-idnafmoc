import type { IUserFospecValidationRepository } from "domain/repositories/userFospecValidation.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { UserFospecTrainingInterface } from "lib";

@injectable()
export default class UserFospecTrainingUseCase {
  private userFospecRepository: IUserFospecValidationRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserFospecRepository)
    userDataMpacRepository: IUserFospecValidationRepository
  ) {
    this.userFospecRepository = userDataMpacRepository;
  }

  async execute(
    data: {},
    accessToken: string
  ): Promise<UserFospecTrainingInterface | undefined> {
    return await this.userFospecRepository.requestFospecTraining(data, accessToken);
  }
}

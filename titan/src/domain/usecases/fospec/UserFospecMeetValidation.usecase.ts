import type { IUserFospecValidationRepository } from "domain/repositories/userFospecValidation.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { UserFospecValidationInterface } from "lib";

@injectable()
export default class UserFospecMeetValidationUseCase {
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
  ): Promise<UserFospecValidationInterface | undefined> {
    return await this.userFospecRepository.requestFospecMeetValidation(data, accessToken);
  }
}

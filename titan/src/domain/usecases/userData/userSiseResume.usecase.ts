import type { IUserSiseValidationRepository } from "domain/repositories/userSiseValidation.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { UserSiseResumeInformation } from "lib";

@injectable()
export default class UserSiseResumeUseCase {
  private userSiseRepository: IUserSiseValidationRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserSiseRepository)
      userSiseRepository: IUserSiseValidationRepository
  ) {
    this.userSiseRepository = userSiseRepository;
  }

  async execute(
    data: {},
    accessToken: string
  ): Promise<UserSiseResumeInformation | undefined> {
    return await this.userSiseRepository.requestSiseUserResume(data, accessToken);
  }
}

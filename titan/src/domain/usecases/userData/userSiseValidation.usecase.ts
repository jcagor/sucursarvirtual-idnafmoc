import type { IUserSiseValidationRepository } from "domain/repositories/userSiseValidation.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { UserSiseValidationInterface } from "lib";

@injectable()
export default class UserSiseValidationUseCase {
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
  ): Promise<UserSiseValidationInterface | undefined> {
    return await this.userSiseRepository.requestSiseValidation(data, accessToken);
  }
}

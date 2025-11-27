import type { IUserDataRepository } from "domain/repositories/userData.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { ApiResponse } from "lib/types/userDevice/userDevice.types";

@injectable()
export default class SendUserDataUseCase {
  private userDataRepository: IUserDataRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserDataRepository)
    userDataRepository: IUserDataRepository
  ) {
    this.userDataRepository = userDataRepository;
  }

  async execute(
    data: {},
    accessToken: string
  ): Promise<ApiResponse | undefined> {
    return await this.userDataRepository.sendUserData(data, accessToken);
  }
}

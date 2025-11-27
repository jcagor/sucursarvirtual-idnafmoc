import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { SiseUnregisteredUser } from "lib";

@injectable()
export default class SaveSiseAbsentUserUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(
    data: {},
    accessToken: string
  ): Promise<SiseUnregisteredUser | undefined> {
    return await this.userRannRepository.saveSiseAbsentUser(data, accessToken);
  }
}

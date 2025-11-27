import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { PostulationServerResponse } from "lib";

@injectable()
export default class SaveJobPostulationUseCase {
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
  ): Promise<PostulationServerResponse | undefined> {
    return await this.userRannRepository.saveJobPostulation(data, accessToken);
  }
}

import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { PostulationListServerResponse } from "lib";

@injectable()
export default class GetJobPostulationListUseCase {
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
  ): Promise<PostulationListServerResponse | undefined> {
    return await this.userRannRepository.getJobPostulations(data, accessToken);
  }
}

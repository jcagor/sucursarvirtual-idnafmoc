import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetUserResumeFileUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(data: {}, accessToken: string): Promise<Blob | undefined> {
    return await this.userRannRepository.getUserResumeFile(data, accessToken);
  }
}

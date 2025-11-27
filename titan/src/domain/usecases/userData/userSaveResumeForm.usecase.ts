import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { ResumeServerResponse } from "domain/models";

@injectable()
export default class SaveUserResumeFormUseCase {
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
  ): Promise<ResumeServerResponse | undefined> {
    return await this.userRannRepository.saveUserResumeForm(data, accessToken);
  }
}

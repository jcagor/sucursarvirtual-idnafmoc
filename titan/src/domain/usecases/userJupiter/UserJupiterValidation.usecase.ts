import { JupiterStatusQuery, JupiterStatusResult } from "domain/models/jupiterResultsType";
import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class UserJupiterValidationUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(data: JupiterStatusQuery, accessToken: string): Promise<JupiterStatusResult | undefined> {
    return await this.userRannRepository.jupiterValidation(data, accessToken);
  }
}

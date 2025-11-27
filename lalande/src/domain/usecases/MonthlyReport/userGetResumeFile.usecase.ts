
import type { IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetSummaryReportFileUseCase {
  private userRannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    userRannRepository: IRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(data: {}, accessToken: string): Promise<Blob | undefined> {
    return await this.userRannRepository.getSummaryReportFile(data, accessToken);
  }
}

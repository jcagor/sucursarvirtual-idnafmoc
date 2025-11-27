import { SaveAssistanceRecordFormStatus } from "domain/models";
import type { IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetAnalystTechReportUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    data: {},
    accessToken?: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined> {
    if (!accessToken) return;
    return await this.rannRepository.getAnalystTechReport(data, accessToken);
  }
}

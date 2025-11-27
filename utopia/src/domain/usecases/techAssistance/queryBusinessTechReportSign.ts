
import type { IRannRepository } from "domain/repositories/business.repository";
import { AssistanceRecordBusinessSignQuery, SaveAssistanceRecordFormStatus } from "domain/models";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";


@injectable()
export default class QueryBusinessTechReportSignUseCase {
  private userDataRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    userDataRepository: IRannRepository
  ) {
    this.userDataRepository = userDataRepository;
  }

  async execute(
    data: AssistanceRecordBusinessSignQuery,
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined> {
    return await this.userDataRepository.queryBusinessTechReportSign(data, accessToken);
  }
}

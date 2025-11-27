import { SaveAssistanceRecordRevision} from "domain/models/tech-assistance-cert/techAssistanceForm";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetBusinessHoursReportUseCase {
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
  ): Promise<BusinessHoursReportList | undefined> {
    if (!accessToken) return;
    return await this.rannRepository.getBusinessHoursReport(data, accessToken);
  }
}

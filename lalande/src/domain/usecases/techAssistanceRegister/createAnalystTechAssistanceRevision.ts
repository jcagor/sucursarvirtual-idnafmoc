import { SaveAssistanceRecordRevision} from "domain/models/tech-assistance-cert/techAssistanceForm";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateAnalystTechRevisionUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    data: SaveAssistanceRecordRevision,
    accessToken?: string
  ): Promise<SaveAssistanceRecordRevision | undefined> {
    if (!accessToken) return;
    return await this.rannRepository.createAnalystTechReportRevision(data, accessToken);
  }
}

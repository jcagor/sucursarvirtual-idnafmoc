import { SaveAssistanceRecordRevision} from "domain/models/tech-assistance-cert/techAssistanceForm";
import { ErrorInformation } from "domain/models/UnvalidatedBusiness/UnvalidatedBusinessType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetRejectedBusinessExcelReportUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    data: {},    
  ): Promise<Blob | ErrorInformation | undefined> {    
    return await this.rannRepository.getRejectedBusinessExcelReport(data);
  }
}

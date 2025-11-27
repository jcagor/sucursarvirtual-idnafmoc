import { SaveAssistanceRecordFormStatus } from "domain/models/tech-assistance-cert/techAssistanceForm";
import type { IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";


@injectable()
export default class SaveAssistanceRecordCorrectionFormUseCase {
  private userDataRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    userDataRepository: IRannRepository
  ) {
    this.userDataRepository = userDataRepository;
  }

  async execute(
    data: {},
    accessToken: string
  ): Promise<SaveAssistanceRecordFormStatus | undefined> {
    return await this.userDataRepository.saveAssistanceRecordCorrectionForm(data, accessToken);
  }
}

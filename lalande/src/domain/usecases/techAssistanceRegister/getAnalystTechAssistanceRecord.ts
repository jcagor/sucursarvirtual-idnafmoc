import { CourseSessionType } from "domain/models/course/CourseSessionType";
import { SaveAssistanceRecordFormStatus, TechAssistanceRecordRevisionList } from "domain/models/tech-assistance-cert/techAssistanceForm";
import { UserInformationData } from "domain/models/user/UserInformation.type";
import { type IRannRepository } from "domain/repositories/rann.repository";
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

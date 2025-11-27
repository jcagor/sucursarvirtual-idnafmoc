import { CourseSessionType } from "domain/models/course/CourseSessionType";
import { TechAssistanceRecordRevisionList } from "domain/models/tech-assistance-cert/techAssistanceForm";
import { UserInformationData } from "domain/models/user/UserInformation.type";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class ListAnalystTechReportsUseCase {
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
  ): Promise<TechAssistanceRecordRevisionList | undefined> {
    if (!accessToken) return;
    return await this.rannRepository.listAnalystTechReports(data, accessToken);
  }
}

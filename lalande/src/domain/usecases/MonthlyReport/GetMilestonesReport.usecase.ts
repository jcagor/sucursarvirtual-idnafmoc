import type { IRannRepository } from "domain/repositories/rann.repository";
import { WorkPlanReportQueryType } from "domain/models/WorkPlan/WorkPlanType";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { MilestonesReportList } from "domain/models/MonthlyReport/MonthlyReportType";


@injectable()
export default class GetMilestonesReportUseCase {
  private userDataRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    userDataRepository: IRannRepository
  ) {
    this.userDataRepository = userDataRepository;
  }

  async execute(
    data: WorkPlanReportQueryType,
    accessToken: string
  ): Promise<MilestonesReportList | undefined> {
    return await this.userDataRepository.getMilestonesReport(data, accessToken);
  }
}

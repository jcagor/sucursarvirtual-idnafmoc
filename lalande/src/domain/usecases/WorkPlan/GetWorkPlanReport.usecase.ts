import type { IRannRepository } from "domain/repositories/rann.repository";
import { WorkPlanReportList, WorkPlanReportQueryType } from "domain/models/WorkPlan/WorkPlanType";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";


@injectable()
export default class GetWorkPlanReportUseCase {
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
  ): Promise<WorkPlanReportList | undefined> {
    return await this.userDataRepository.getWorkPlanReport(data, accessToken);
  }
}

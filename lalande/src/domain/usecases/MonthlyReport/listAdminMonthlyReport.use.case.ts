import { MonthlyReportResponseList, MonthlyReportType, QueryMonthlyReportAdmin } from "domain/models/MonthlyReport/MonthlyReportType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class ListAdminMonthlyReportUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    query: QueryMonthlyReportAdmin,
    accessToken?: string
  ): Promise<MonthlyReportResponseList | undefined> {
    if (!accessToken) return;
    
    const request = await this.rannRepository
      .listAdminMonthlyReport(query, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

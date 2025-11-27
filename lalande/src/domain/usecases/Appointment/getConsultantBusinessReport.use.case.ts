import { BusinessAttendedReportList } from "domain/models/Appointment/reportsTypes";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetConsultantBusinessReportUseCase {
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
  ): Promise<BusinessAttendedReportList | undefined> {
    if (!accessToken) return;
    return await this.rannRepository.getConsultantBusinessReport(data, accessToken);
  }
}

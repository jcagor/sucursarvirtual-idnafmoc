import { TechAssistanceCorrectionList } from "domain/models/tech-assistance-cert/techAssistanceForm";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class ListRejectedTechAssistanceRecordsUseCase {
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
  ): Promise<TechAssistanceCorrectionList | undefined> {
    if (!accessToken) return;
    return await this.rannRepository.listConsultantRejectedTechSupport(
      data,
      accessToken
    );
  }
}

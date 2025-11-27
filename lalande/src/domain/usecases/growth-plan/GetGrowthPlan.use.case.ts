import { GrowthPlanType } from "domain/models/growth-plan/GrowthPlanType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetGrowthPlanUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    businessProfile_id: string
  ): Promise<GrowthPlanType | undefined> {
    const request = await this.rannRepository
      .getGrowthPlan(businessProfile_id)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

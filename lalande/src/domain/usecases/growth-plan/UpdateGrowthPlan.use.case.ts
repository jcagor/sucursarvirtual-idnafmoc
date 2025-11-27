import { GrowthPlanType } from "domain/models/growth-plan/GrowthPlanType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class UpdateGrowthPlanUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    growthPlan: GrowthPlanType
  ): Promise<GrowthPlanType | undefined> {
    const request = await this.rannRepository
      .updateGrowthPlan(growthPlan)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

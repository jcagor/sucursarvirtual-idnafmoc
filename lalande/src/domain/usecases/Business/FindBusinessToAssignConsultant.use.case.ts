import { BusinessToAssignConsultantType } from "domain/models/Business/BusinessToAssignConsultantType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindBusinessToAssignConsultantUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(): Promise<BusinessToAssignConsultantType[] | undefined> {
    const request = await this.rannRepository
      .findBusinessToAssignConsultant()
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

import { ProgramType } from "domain/models/ProgramType";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { BUSINESS_STATUS } from "lib";

@injectable()
export default class GetBusinessStatusUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(): Promise<BUSINESS_STATUS | undefined> {
    const request = await this.rannRepository
      .getBusinessStatus()
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

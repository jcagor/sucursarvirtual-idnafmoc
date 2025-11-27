import { ProgramType } from "domain/models/ProgramType";
import { responseIsValidBusinessType } from "domain/models/responseIsValidBusinesType";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class ValidationRuesBusinessUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    program: ProgramType
  ): Promise<responseIsValidBusinessType | undefined> {
    const request = await this.rannRepository
      .validationRuesBusiness(program)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

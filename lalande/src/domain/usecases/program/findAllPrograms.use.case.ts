import { ProgramType } from "domain/models/program/ProgramType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class findAllProgramsUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(): Promise<ProgramType[] | undefined> {
    const request = await this.rannRepository
      .findAllPrograms()
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }

    return request;
  }
}

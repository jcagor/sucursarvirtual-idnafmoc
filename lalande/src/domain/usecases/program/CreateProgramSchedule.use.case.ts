import { ProgramScheduleType } from "domain/models/program/ProgramScheduleType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateProgramScheduleUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    createScheduleData: ProgramScheduleType
  ): Promise<ProgramScheduleType | undefined> {
    const request = await this.rannRepository
      .createProgramSchedule(createScheduleData)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }

    return request;
  }
}

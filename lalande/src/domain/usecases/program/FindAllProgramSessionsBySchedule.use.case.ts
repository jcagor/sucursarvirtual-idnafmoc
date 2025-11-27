import { ProgramSessionType } from "domain/models/program/ProgramSessionType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindAllProgramSessionsByScheduleUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    schedule_id: string
  ): Promise<ProgramSessionType[] | undefined> {
    const request = await this.rannRepository
      .findAllProgramSessionsBySchedule(schedule_id)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }

    return request;
  }
}

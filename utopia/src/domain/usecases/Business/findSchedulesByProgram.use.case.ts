import {
  ProgramObjectList,
  ScheduleObjectList,
} from "domain/models/ProgramType";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class findSchedulesByProgramId {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    data: { id: string },
    accessToken?: string
  ): Promise<ScheduleObjectList | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .findSchedulesByProgramId(data, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

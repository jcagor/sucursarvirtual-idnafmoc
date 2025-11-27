import { BusinessAuthorizedType } from "domain/models/course/BusinessAuthorizedType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindBusinessAuthorizedByScheduleUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    schedule_id: string
  ): Promise<BusinessAuthorizedType[] | undefined> {
    const request = await this.rannRepository
      .findBusinessAuthorizedBySchedule(schedule_id)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

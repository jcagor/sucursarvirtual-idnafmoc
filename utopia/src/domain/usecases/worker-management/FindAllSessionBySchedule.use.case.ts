import { CourseSessionType } from "domain/models/CourseSessionType";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindAllSessionByScheduleUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    schedule_id: string,
    accessToken?: string
  ): Promise<CourseSessionType[] | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .FindAllSessionBySchedule(schedule_id, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

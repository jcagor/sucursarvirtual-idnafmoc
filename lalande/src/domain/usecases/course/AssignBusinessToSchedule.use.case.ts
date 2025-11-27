import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class AssignBusinessToScheduleUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    bussines_id: string,
    schedule_id: string
  ): Promise<CourseScheduleType | undefined> {
    const request = await this.rannRepository
      .assignBusinessToSchedule(bussines_id, schedule_id)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

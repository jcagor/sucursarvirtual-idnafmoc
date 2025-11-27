import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateScheduleUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    createScheduleData: CourseScheduleType,
    accessToken?: string
  ): Promise<CourseScheduleType | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .createSchedule(accessToken, createScheduleData)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

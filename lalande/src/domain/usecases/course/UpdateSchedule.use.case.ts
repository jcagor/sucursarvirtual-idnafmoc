import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class UpdateScheduleUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    UpdateScheduleData: CourseScheduleType,
    accessToken?: string
  ): Promise<CourseScheduleType | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .updateSchedule(UpdateScheduleData, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

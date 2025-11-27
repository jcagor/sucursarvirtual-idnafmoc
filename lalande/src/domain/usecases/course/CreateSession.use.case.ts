import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import { CourseSessionType } from "domain/models/course/CourseSessionType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateSessionUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    createSessionData: CourseSessionType,
    accessToken?: string
  ): Promise<CourseScheduleType | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .createSession(createSessionData, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

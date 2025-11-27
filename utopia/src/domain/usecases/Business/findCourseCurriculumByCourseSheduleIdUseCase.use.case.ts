import { CourseCurriculumType } from "domain/models/CourseCurriculumType";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class findCourseCurriculumByCourseSheduleIdUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    courseSchedule_id: string,
    accessToken?: string
  ): Promise<CourseCurriculumType[] | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .findCourseCurriculumByCourseSheduleId(courseSchedule_id, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

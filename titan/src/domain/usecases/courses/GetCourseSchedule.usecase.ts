import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import {
  CourseScheduleQuery,
  CourseScheduleTypeList,
} from "presentation/components/templates/training/training.types";

@injectable()
export default class GetCourseScheduleUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(
    data: CourseScheduleQuery,
    accessToken: string
  ): Promise<CourseScheduleTypeList | undefined> {
    return await this.userRannRepository.getCourseSchedule(data, accessToken);
  }
}

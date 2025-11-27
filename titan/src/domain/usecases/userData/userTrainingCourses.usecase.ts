import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { AvailableTrainingCourse } from "lib";
import { injectable, inject } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { CourseScheduleTypeList } from "presentation/components/templates/training/training.types";

@injectable()
export default class UserTrainingCoursesUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(
    userData: { documentType: string; identification: string },
    token: string
  ): Promise<CourseScheduleTypeList|undefined> {
    return await this.userRannRepository.getUserTrainingCourses(
      userData,
      token
    );
  }
}

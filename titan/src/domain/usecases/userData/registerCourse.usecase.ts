import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { CourseRegistrationData } from "presentation/components/templates/training/training.types";

@injectable()
export default class RegisterCourseUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(
    courseData: CourseRegistrationData,
    accessToken: string
  ): Promise<{ success: boolean; message: string } | undefined> {
    return await this.userRannRepository.registerCourse(
      courseData,
      accessToken
    );
  }
}

import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { AvailableTrainingCourse } from "lib";

@injectable()
export default class GetActiveWorkerCoursesUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(
    data: { documentNumber: number },
    accessToken: string
  ): Promise<AvailableTrainingCourse[] | undefined> {
    return await this.userRannRepository.getActiveWorkerCourses(
      data,
      accessToken
    );
  }
}

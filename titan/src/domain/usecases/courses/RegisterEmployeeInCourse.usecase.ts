import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import {
  QueryRegisterEmployeeInCourse,
  QueryRegisterUnemployedInCourse,
  ResponseCreateCourseRegistration,
} from "presentation/components/templates/training/training.types";

@injectable()
export default class RegisterEmployeeInCourseUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(
    data: QueryRegisterEmployeeInCourse,
    accessToken: string
  ): Promise<ResponseCreateCourseRegistration | undefined> {
    return await this.userRannRepository.registerWorkerInCourse(
      data,
      accessToken
    );
  }
}

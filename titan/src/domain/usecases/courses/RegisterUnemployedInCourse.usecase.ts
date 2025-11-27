import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import {
  QueryRegisterUnemployedInCourse,
  ResponseCreateCourseRegistration,
} from "presentation/components/templates/training/training.types";

@injectable()
export default class RegisterUnemployedInCourseUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(
    data: QueryRegisterUnemployedInCourse,
    accessToken: string
  ): Promise<ResponseCreateCourseRegistration | undefined> {
    return await this.userRannRepository.registerUnemployedInCourse(
      data,
      accessToken
    );
  }
}

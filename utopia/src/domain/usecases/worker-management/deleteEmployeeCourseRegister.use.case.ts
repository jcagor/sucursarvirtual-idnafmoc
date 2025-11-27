import type { IRannRepository } from "domain/repositories/business.repository";
import {
  QueryDeleteCourseRegistration,
  UserCourseDeleteInterface,
} from "domain/models";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class DeleteEmployeeCourseRegisterUseCase {
  private userDataRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    userDataRepository: IRannRepository
  ) {
    this.userDataRepository = userDataRepository;
  }

  async execute(
    data: QueryDeleteCourseRegistration,
    accessToken: string
  ): Promise<UserCourseDeleteInterface | undefined> {
    return await this.userDataRepository.deleteEmployeeCourseRegister(
      data,
      accessToken
    );
  }
}

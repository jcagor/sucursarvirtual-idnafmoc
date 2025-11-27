
import type { IRannRepository } from "domain/repositories/business.repository";
import { QueryValidateEmployeeForCourse, UserCourseValidationInterface } from "domain/models";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";


@injectable()
export default class ValidateEmployeeCourseRegisterUseCase {
  private userDataRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    userDataRepository: IRannRepository
  ) {
    this.userDataRepository = userDataRepository;
  }

  async execute(
    data: QueryValidateEmployeeForCourse,
    accessToken: string
  ): Promise<UserCourseValidationInterface | undefined> {
    return await this.userDataRepository.validateEmployeeCourseRegister(data, accessToken);
  }
}

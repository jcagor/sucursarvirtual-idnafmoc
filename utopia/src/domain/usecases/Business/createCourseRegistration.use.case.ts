import { EmployeeType } from "domain/models";
import { ResponseCreateCourseRegistration } from "domain/models/ResponseCreateCourseRegistration";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateCourseRegistrationUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    courseSheeduleId: string,
    employess: EmployeeType[],
    accessToken?: string
  ): Promise<ResponseCreateCourseRegistration | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .createCourseRegistration(courseSheeduleId, employess, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

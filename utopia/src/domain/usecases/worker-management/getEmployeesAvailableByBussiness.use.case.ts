import { EmployeeType } from "domain/models";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetEmployeesAvailableByBussinessUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    courseSheeduleId: string,
    accessToken?: string
  ): Promise<EmployeeType[] | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .getEmployeesAvailableByBussiness(courseSheeduleId, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

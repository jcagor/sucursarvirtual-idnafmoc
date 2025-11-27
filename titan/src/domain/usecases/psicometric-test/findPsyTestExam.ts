import { PsyTestExamType } from "domain/models/PsyTestExamType";
import { type IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindPsyTestExamUseCase {
  private readonly rannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    rannRepository: IUserRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(): Promise<PsyTestExamType | undefined> {
    const request = await this.rannRepository
      .findPsyTestExam()
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

import { PsyTestResultType } from "domain/models/PsyTestResultsType";
import { type IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindPsyTestResultsUseCase {
  private readonly rannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    rannRepository: IUserRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(): Promise<PsyTestResultType | undefined> {
    const request = await this.rannRepository
      .findPsyTestResults()
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

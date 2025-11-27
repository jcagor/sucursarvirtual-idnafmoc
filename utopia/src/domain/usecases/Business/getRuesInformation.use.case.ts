import { RuesType } from "domain/models/RuesType";
import { type IRuesRepository } from "domain/repositories/rues.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetRuesInformationUseCase {
  private readonly ruesRepository: IRuesRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RuesRepository)
    ruesRepository: IRuesRepository
  ) {
    this.ruesRepository = ruesRepository;
  }

  async execute(identification_number: string): Promise<RuesType | undefined> {
    const request = await this.ruesRepository
      .GetRuesInformation(identification_number)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

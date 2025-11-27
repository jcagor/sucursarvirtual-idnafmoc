import { ProgramInscription, ProgramObjectList } from "domain/models/ProgramType";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class createBusinessProgramInscriptionUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(accessToken: string, data:ProgramInscription): Promise<ProgramInscription | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .programBusinessInscription(data, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

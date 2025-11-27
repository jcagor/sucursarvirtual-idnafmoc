import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { Occupation } from "/domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";

@injectable()
export default class GetOccupationUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(accessToken?: string): Promise<Occupation[] | undefined> {
    if (!accessToken) return;
    const occupations = await this.riaRepository
      .getOccupations(accessToken)
      .catch((error) => error);

    if (occupations instanceof Error) {
      console.log("error");

      return;
    }
    return occupations;
  }
}

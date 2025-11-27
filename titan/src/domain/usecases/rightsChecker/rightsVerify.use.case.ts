import { inject, injectable } from "inversify";
import { RightsVerifyInterface } from "domain/models";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import type { IRiaRepository } from "domain/repositories/ria.repository";

@injectable()
export default class RightsVerifyUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    documentNumber: string,
    documentType: string,
    accessToken?: string
  ): Promise<RightsVerifyInterface | undefined> {
    if (!accessToken) return;

    const rights = await this.riaRepository
      .rightsVerify(accessToken, documentNumber, documentType)
      .catch((error) => error);

    if (rights instanceof Error) {
      console.log("error");

      return;
    }

    return rights;
  }
}

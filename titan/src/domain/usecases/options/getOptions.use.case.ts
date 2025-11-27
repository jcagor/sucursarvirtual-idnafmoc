import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";

import type { IRiaRepository } from "domain/repositories/ria.repository";
import { Options } from "domain/models";

@injectable()
export default class GetOptionsUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(accessToken?: string): Promise<Options | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .getOptions(accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.log("error");

      return;
    }
    return request;
  }
}

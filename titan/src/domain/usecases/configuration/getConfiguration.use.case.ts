import type { IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { Configuration } from "domain/models";

@injectable()
export default class GetConfigurationUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    name: string,
    accessToken?: string
  ): Promise<Configuration | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .findConfigByName(name, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.log("error");

      return;
    }
    return request;
  }
}

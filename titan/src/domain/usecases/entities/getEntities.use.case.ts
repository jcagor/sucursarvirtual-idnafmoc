import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";

import type { IRiaRepository } from "domain/repositories/ria.repository";
import { Entities } from "domain/models";

@injectable()
export default class GetEntitiesUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    claseInterlocutor: string,
    accessToken?: string
  ): Promise<Entities | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .getEntities(accessToken, claseInterlocutor)
      .catch((error) => error);

    if (request instanceof Error) {
      console.log(request);

      console.log("error");

      return;
    }
    return request;
  }
}

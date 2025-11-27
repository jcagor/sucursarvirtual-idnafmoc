import { CreateRequest, Log, Pac, Request } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class AffiliatePacUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(accessToken: string, pacForm: Pac): Promise<Log | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .affiliatePAC(accessToken, pacForm)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

import type { IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { IFindAllStatus } from "lib/types/inputs/IFindAllStatus";

@injectable()
export default class FindAllStatusUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(token?: string): Promise<IFindAllStatus | undefined> {
    if (!token) return;
    const request = await this.riaRepository
      .findAll(token)
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}

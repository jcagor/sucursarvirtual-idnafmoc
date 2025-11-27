import { Reserve } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetReserveUseCase {
  private reserveRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    reserveRepository: IRiaRepository
  ) {
    this.reserveRepository = reserveRepository;
  }

  async execute(accessToken?: string): Promise<Reserve[] | undefined> {
    if (!accessToken) return;
    const request = await this.reserveRepository
      .getReserves(accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

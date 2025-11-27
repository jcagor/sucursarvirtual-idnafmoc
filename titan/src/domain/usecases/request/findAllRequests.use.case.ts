import type { IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { IFindAllRequests, RequestFilter } from "lib/types/table";

@injectable()
export default class FindAllRequestsUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    token?: string,
    page?: number,
    pageSize?: number,
    filters?: RequestFilter
  ): Promise<IFindAllRequests | undefined> {
    if (!token) return;

    const request = await this.riaRepository
      .findAllRequest(token, page, pageSize, filters)
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}

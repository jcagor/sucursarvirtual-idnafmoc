import { CreateRequest, Request } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateRequestUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    accessToken: string,
    createRequest: CreateRequest,
    file?: File[]
  ): Promise<Request | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .createRequest(accessToken, createRequest, file)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

import { type IRiaRepository } from "domain/repositories/ria.repository";
import { inject, injectable } from "inversify";
import { Request, UpdateRequest } from "domain/models";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";

@injectable()
export default class UpdateRequestUseCase {
  private riaRepository: IRiaRepository;
  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    requestToUpdateId: string,
    request: UpdateRequest,
    accessToken?: string
  ): Promise<Request | undefined> {
    if (!accessToken) return;
    const updateRequest = await this.riaRepository
      .updateRequest(requestToUpdateId, request, accessToken)
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return updateRequest;
  }
}

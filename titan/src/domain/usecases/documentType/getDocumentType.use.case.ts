import { DocumentType } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetDocumentTypeUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(accessToken?: string): Promise<DocumentType[] | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .getDocumentTypes(accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

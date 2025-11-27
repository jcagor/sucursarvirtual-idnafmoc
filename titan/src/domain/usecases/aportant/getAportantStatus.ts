import { CreateRequest, Request } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetAportantStatusUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    accessToken: string,
    documentNumber: string,
    documentType: string,
    typeAffiliate: string
  ): Promise<any | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .getAportantStatus(
        accessToken,
        documentNumber,
        documentType,
        typeAffiliate
      )
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

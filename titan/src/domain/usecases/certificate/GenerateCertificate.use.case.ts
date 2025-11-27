
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GenerateCertificateUseCase {
  private readonly riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    filedId: string,
    requestType: string,
    requestStatus: string,
    requestDate: string,
    requestId: string,
    contentInfo: Record<string, string>,
    accessToken?: string
  ): Promise<any | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .generateCerticate(
        filedId,
        requestType,
        requestStatus,
        requestDate,
        requestId,
        contentInfo,
        accessToken
      )
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

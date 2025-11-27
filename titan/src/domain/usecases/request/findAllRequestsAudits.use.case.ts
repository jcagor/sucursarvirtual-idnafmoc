
import { IFindAllRequestAuditFiltersDto, IResponseFindAllRequestsAuditsDto } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindAllRequestsAuditsUseCase {
  private readonly riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    radicate: string,
    filters: IFindAllRequestAuditFiltersDto,
    accessToken?: string
  ): Promise<IResponseFindAllRequestsAuditsDto[] | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .getAudits(accessToken, radicate, filters)
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}

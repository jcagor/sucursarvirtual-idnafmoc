
import { IFindMassiveAttachment } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";


@injectable()
export default class FindMassiveAttachmentByFiled {
  private readonly riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    token?: string,
    filedId?: string,
    radicate?: string,
    company?: string
  ): Promise<IFindMassiveAttachment | undefined> {
    if (!token) return;
    const request: IFindMassiveAttachment | undefined =
      await this.riaRepository
        .findMassiveAttachmentByFiled(token, filedId, radicate, company)
        .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}

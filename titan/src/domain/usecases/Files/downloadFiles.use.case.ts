import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class DownloadFilesUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    file: string,
    accessToken?: string
  ): Promise<string | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .download(accessToken, file)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

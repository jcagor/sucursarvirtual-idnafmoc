import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class BulkScheduleLoadingUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(file: File): Promise<Response | undefined> {
    const request = await this.rannRepository
      .bulkScheduleLoading(file)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

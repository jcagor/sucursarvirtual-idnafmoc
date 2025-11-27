import { DataBusinessTypes } from "domain/models/dataBusinessType";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateDataBusinessUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    dataBusiness: DataBusinessTypes,
    accessToken?: string
  ): Promise<DataBusinessTypes | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .createDataBusiness(accessToken, dataBusiness)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

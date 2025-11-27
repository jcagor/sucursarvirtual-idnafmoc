import { City } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetCityUseCase {
  private cityRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    cityRepository: IRiaRepository
  ) {
    this.cityRepository = cityRepository;
  }

  async execute(accessToken?: string): Promise<City[] | undefined> {
    if (!accessToken) return;
    const request = await this.cityRepository
      .getCities(accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

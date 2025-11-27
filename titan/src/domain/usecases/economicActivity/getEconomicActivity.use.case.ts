import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { EconomicActivity } from "/domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";

@injectable()
export default class GetEconomicActivityUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(accessToken?: string): Promise<EconomicActivity[] | undefined> {
    if (!accessToken) return;
    const request = await this.riaRepository
      .getEconomicActivities(accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.log("Error al obtener las actividades económicas");
      return;
    }
    return request;
  }
}

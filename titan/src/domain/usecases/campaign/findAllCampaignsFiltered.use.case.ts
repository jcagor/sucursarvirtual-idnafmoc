import { inject, injectable } from "inversify";
import { Campaign } from "domain/models";
import type { IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { CampaignsFilter } from "lib";

@injectable()
export default class FindAllCampaignsFilteredUseCase {
  private riaRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    riaRepository: IRiaRepository
  ) {
    this.riaRepository = riaRepository;
  }

  async execute(
    accessToken?: string,
    filters?: CampaignsFilter[] | undefined
  ): Promise<Campaign[] | undefined> {
    try {
      if (!accessToken) return;
      const campaigns: Campaign[] | undefined = await this.riaRepository
        .findAllCampaignsFiltered(accessToken, filters)
        .catch((error) => error);
      if (!campaigns) {
        return;
      }
      return campaigns;
    } catch (error) {}
  }
}

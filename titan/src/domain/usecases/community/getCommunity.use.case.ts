import { Community } from "domain/models";
import { type IRiaRepository } from "domain/repositories/ria.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetCommunityUseCase {
  private communityRepository: IRiaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RiaRepository)
    communityRepository: IRiaRepository
  ) {
    this.communityRepository = communityRepository;
  }

  async execute(accessToken?: string): Promise<Community[] | undefined> {
    if (!accessToken) return;
    const request = await this.communityRepository
      .getCommunities(accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }
    return request;
  }
}

import {
  ContactBusinessTypes,
  LegalRepresentativeBusinessTypes,
} from "domain/models";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class GetDataLegalRepresentativeAndContactUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    accessToken?: string
  ): Promise<
    (LegalRepresentativeBusinessTypes & ContactBusinessTypes) | undefined
  > {
    if (!accessToken) return;
    const request = await this.rannRepository
      .getDataLegalRepresentativeAndContact(accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

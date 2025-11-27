import { UnvalidatedBusinessType } from "domain/models/UnvalidatedBusiness/UnvalidatedBusinessType";
import { type IRannRepository } from "domain/repositories/rann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindUnvalidatedBusinessUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(): Promise<UnvalidatedBusinessType[] | undefined> {
    return await this.rannRepository.findUnvalidatedBusiness();
  }
}

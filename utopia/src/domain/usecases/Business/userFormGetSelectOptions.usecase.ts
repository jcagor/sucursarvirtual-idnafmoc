import type { IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { SelectOption } from "lib";

@injectable()
export default class GetSelectOptionsFormUseCase {
  private userDataRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    userDataRepository: IRannRepository
  ) {
    this.userDataRepository = userDataRepository;
  }

  async execute(
    data: {},
    accessToken: string
  ): Promise<Array<SelectOption> | undefined> {
    return await this.userDataRepository.getSelectOptionsForm(data, accessToken);
  }
}

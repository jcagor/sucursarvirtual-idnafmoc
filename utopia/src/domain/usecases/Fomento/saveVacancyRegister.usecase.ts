import { VacantRegisterFormSaveStatus } from "domain/models";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import type{ IFomentoRepository } from "domain/repositories/fomento.repository";


@injectable()
export default class SaveJobVacancyRegisterFormUseCase {
  private fomentoDataRepository: IFomentoRepository;

  constructor(
    @inject(REPOSITORY_TYPES._FomentoRepository)
    fomentoDataRepository: IFomentoRepository
  ) {
    this.fomentoDataRepository = fomentoDataRepository;
  }

  async execute(
    data: {},
    accessToken: string
  ): Promise<VacantRegisterFormSaveStatus | undefined> {
    return await this.fomentoDataRepository.saveJobVacancyForm(data, accessToken);
  }
}

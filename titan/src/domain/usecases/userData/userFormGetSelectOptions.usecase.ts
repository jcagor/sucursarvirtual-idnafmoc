import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { SelectOption } from "lib";

@injectable()
export default class GetSelectOptionsFormUseCase {
  private userRannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userRannRepository: IUserRannRepository
  ) {
    this.userRannRepository = userRannRepository;
  }

  async execute(
    data: { selectOptionsName: string; selectFilterString?: string },
    accessToken: string
  ): Promise<Array<SelectOption> | undefined> {
    return await this.userRannRepository.getSelectOptionsForm(
      data,
      accessToken
    );
  }
}

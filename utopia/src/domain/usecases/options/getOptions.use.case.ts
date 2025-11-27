import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { type IRannRepository } from "domain/repositories/business.repository";
import { SelectOption } from "lib";

@injectable()
export default class GetOptionsUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    selectOptionsName: string,
    accessToken?: string
  ): Promise<Array<SelectOption> | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .getOptions(selectOptionsName, accessToken)
      .catch((error) => error);

    if (request instanceof Error) {
      console.log("error");

      return;
    }
    return request;
  }
}

import { SingleAswerType } from "domain/models/SingleAswerType";
import { type IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class SaveSingleAnswerUseCase {
  private readonly rannRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    rannRepository: IUserRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(answer: SingleAswerType): Promise<SingleAswerType | undefined> {
    const request = await this.rannRepository
      .saveSingleAnswer(answer)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

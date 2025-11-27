
import { AnswerSelfManagementType } from "domain/models";
import { type IRannRepository } from "domain/repositories/business.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class CreateSelfManagementUseCase {
  private readonly rannRepository: IRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._rannRepository)
    rannRepository: IRannRepository
  ) {
    this.rannRepository = rannRepository;
  }

  async execute(
    answerSelfManagement: AnswerSelfManagementType,
    accessToken?: string
  ): Promise<AnswerSelfManagementType | undefined> {
    if (!accessToken) return;
    const request = await this.rannRepository
      .createSelfManagement(accessToken, answerSelfManagement)
      .catch((error) => error);

    if (request instanceof Error) {
      console.error(request.message);
      return;
    }
    return request;
  }
}

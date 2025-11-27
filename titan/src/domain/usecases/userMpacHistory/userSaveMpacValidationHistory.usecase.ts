import type { IUserRannRepository } from "domain/repositories/userRann.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import {
  SaveMpacStatusHistoryQuery,
  SaveMpacStatusHistoryServerResponse,
} from "lib";

@injectable()
export default class SaveMpacValidationHistoryCase {
  private userDataRepository: IUserRannRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserRannRepository)
    userDataRepository: IUserRannRepository
  ) {
    this.userDataRepository = userDataRepository;
  }

  async execute(
    data: SaveMpacStatusHistoryQuery,
    accessToken: string
  ): Promise<SaveMpacStatusHistoryServerResponse | undefined> {
    return await this.userDataRepository.saveMpacStatusHistory(
      data,
      accessToken
    );
  }
}

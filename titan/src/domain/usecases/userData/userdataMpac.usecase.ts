import type { IUserMpacStatusRepository } from "domain/repositories/userMpac.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { inject, injectable } from "inversify";
import { UserMpacDataInterface } from "lib";

interface MpacRequestData {
  documentType: string;
  identification: string;
  userDevice: {
    os: string;
    osVersion: string;
    appVersion: string;
  };
}

@injectable()
export default class UserMpacDataUseCase {
  private userMpacRepository: IUserMpacStatusRepository;

  constructor(
    @inject(REPOSITORY_TYPES._UserMpacRepository)
    userDataMpacRepository: IUserMpacStatusRepository
  ) {
    this.userMpacRepository = userDataMpacRepository;
  }

  async execute(
    data: MpacRequestData,
    accessToken: string
  ): Promise<UserMpacDataInterface | undefined> {
    try {
      return await this.userMpacRepository.requestMpacStatus(data, accessToken);      
    } catch (error) {
      console.error('Error en UserMpacDataUseCase:', error);
      return undefined;
    }
  }
}

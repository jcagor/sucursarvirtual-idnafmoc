import { injectable, inject } from "inversify";
import { DigitalIdentityStatusResponse } from "lib";
import { type IDigitalIdentityRepository } from "domain/repositories/digitalIdentity.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";
import { AdoResponseInterface } from "../../../lib/types/digital-identity/ado-response";

@injectable()
export default class PushDatabaseUseCase {
  private digitalIdentityRepository: IDigitalIdentityRepository;

  constructor(
    @inject(REPOSITORY_TYPES._DigitalIdentityRepository)
    digitalIdentityRepository: IDigitalIdentityRepository
  ) {
    this.digitalIdentityRepository = digitalIdentityRepository;
  }

  async execute(
    adoResponse: AdoResponseInterface,
    token: string
  ): Promise<DigitalIdentityStatusResponse | void> {
    if (token) {
      const response = await this.digitalIdentityRepository.pushDatabase(
        token,
        adoResponse
      );
    } else {
      console.log(
        `Token no suministrado para actualizar el registro de Keycloak `,
        "error"
      );
    }
  }
}

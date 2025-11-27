import { inject, injectable } from "inversify";
import { IEnroll } from "domain/models";
import { type IKeycloakRepository } from "domain/repositories/keycloak.repository";
import { REPOSITORY_TYPES } from "infrastructure/ioc/containers/repositories/repository.types";

@injectable()
export default class UpdateUserInformationUseCase {
  private keycloakRepository: IKeycloakRepository;
  constructor(
    @inject(REPOSITORY_TYPES._KeycloakRepository)
    keycloakRepository: IKeycloakRepository
  ) {
    this.keycloakRepository = keycloakRepository;
  }

  async execute(accessToken: string, userData: IEnroll): Promise<boolean> {
    console.log(userData);
    if (!accessToken) {
      console.log("No estás autenticado");
      return false;
    }
    const userUpdate = await this.keycloakRepository.updateUserData(
      accessToken,
      userData
    );
    return userUpdate || false;
  }
}

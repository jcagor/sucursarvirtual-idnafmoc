import { ContainerModule, interfaces } from "inversify";
import { REPOSITORY_TYPES } from "./repository.types";
import { IKeycloakRepository } from "domain/repositories/keycloak.repository";
import KeycloakRepositoryImplement from "infrastructure/data/repositories/keycloak.implement";
import { IRannRepository } from "domain/repositories/rann.repository";
import RannRepository from "infrastructure/data/repositories/rann.implement";

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IKeycloakRepository>(REPOSITORY_TYPES._KeycloakRepository).to(
    KeycloakRepositoryImplement
  );

  bind<IRannRepository>(REPOSITORY_TYPES._rannRepository).to(RannRepository);
});

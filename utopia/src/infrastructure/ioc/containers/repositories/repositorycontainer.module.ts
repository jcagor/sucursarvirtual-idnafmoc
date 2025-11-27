import { ContainerModule, interfaces } from "inversify";
import { REPOSITORY_TYPES } from "./repository.types";
import { IKeycloakRepository } from "domain/repositories/keycloak.repository";
import KeycloakRepositoryImplement from "infrastructure/data/repositories/keycloak.implement";
import rannRepository from "infrastructure/data/repositories/rann.implement";
import { IRannRepository } from "domain/repositories/business.repository";
import { IRuesRepository } from "domain/repositories/rues.repository";
import RuesRepository from "infrastructure/data/repositories/rues.implement";
import { IFomentoRepository } from "domain/repositories/fomento.repository";
import FomentoRepositoryImplement from "infrastructure/data/repositories/fomento.implement";

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IKeycloakRepository>(REPOSITORY_TYPES._KeycloakRepository).to(
    KeycloakRepositoryImplement
  );

  bind<IRannRepository>(REPOSITORY_TYPES._rannRepository).to(rannRepository);

  bind<IRuesRepository>(REPOSITORY_TYPES._RuesRepository).to(RuesRepository);

  bind<IFomentoRepository>(REPOSITORY_TYPES._FomentoRepository).to(FomentoRepositoryImplement);
});

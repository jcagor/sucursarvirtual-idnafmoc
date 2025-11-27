import { ContainerModule, interfaces } from 'inversify';
import { REPOSITORY_TYPES } from './repository.types';
import { IKeycloakRepository } from '@/domain/repositories/keycloak.repository';
import KeycloakRepositoryImplement from '@/infrastructure/data/repositories/keycloak.implement';

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IKeycloakRepository>(REPOSITORY_TYPES._KeycloakRepository).to(KeycloakRepositoryImplement);

});

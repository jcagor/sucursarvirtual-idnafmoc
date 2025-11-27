import { ContainerModule, interfaces } from 'inversify';
import LogoutKeycloakUseCase from '@/domain/usecases/keycloak/logoutKeycloak.usecase';
import { USECASES_TYPES } from './usecases.types';

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<LogoutKeycloakUseCase>(USECASES_TYPES._LogoutKeycloakUseCase).to(LogoutKeycloakUseCase);
});

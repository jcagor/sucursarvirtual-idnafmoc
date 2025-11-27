import { ContainerModule, interfaces } from "inversify";
import { REPOSITORY_TYPES } from "./repository.types";
import { IKeycloakRepository } from "domain/repositories/keycloak.repository";
import { IDigitalIdentityRepository } from "domain/repositories/digitalIdentity.repository";
import KeycloakRepositoryImplement from "infrastructure/data/repositories/keycloak.implement";
import DigitalIdentityRepository from "infrastructure/data/repositories/digital-identity.implement";
import { IRiaRepository } from "domain/repositories/ria.repository";
import RiaRepository from "infrastructure/data/repositories/ria.implement";
import { IUserDataRepository } from "domain/repositories/userData.repository";
import SendUserDataRepository from "infrastructure/data/repositories/user-data.implement";
import { user } from "@nextui-org/react";
import UserTermAndConditionRepository from "infrastructure/data/repositories/user-terms-conditions.implement";
import { IUserTermAndConditionRepository } from "domain/repositories/userTermAndCondition.repository";
import { ITermAndConditionRepository } from "domain/repositories/TermAndCondition.repository";
import TermAndConditionRepository from "infrastructure/data/repositories/terms-conditions.implement";
import { IValidateTotpRepository } from "domain/repositories/validateTotp.repository";
import ValidateTotpRepository from "infrastructure/data/repositories/validate-totp.implement";
import { IUserSiseValidationRepository } from "domain/repositories/userSiseValidation.repository";
import UserSiseRepository from "infrastructure/data/repositories/user-sise.implements";
import { IUserMpacStatusRepository } from "domain/repositories/userMpac.repository";
import UserMpacRepository from "infrastructure/data/repositories/user-mpac.implements";
import { IUserFospecValidationRepository } from "domain/repositories/userFospecValidation.repository";
import UserFospecRepository from "infrastructure/data/repositories/user-fospec.implements";
import { IUserRannRepository } from "domain/repositories/userRann.repository";
import UserRannRepository from "infrastructure/data/repositories/user-rann.implement";
import { IRNECRepository } from "domain/repositories/RnecRepository";
import RNECRepositoryImplement from "infrastructure/data/repositories/RnecRepository";

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IKeycloakRepository>(REPOSITORY_TYPES._KeycloakRepository).to(
    KeycloakRepositoryImplement
  );

  bind<IDigitalIdentityRepository>(
    REPOSITORY_TYPES._DigitalIdentityRepository
  ).to(DigitalIdentityRepository);

  bind<IUserDataRepository>(REPOSITORY_TYPES._UserDataRepository).to(
    SendUserDataRepository
  );

  // RANN Backend
  bind<IUserRannRepository>(REPOSITORY_TYPES._UserRannRepository).to(
    UserRannRepository
  );

  // SISE Validator
  bind<IUserSiseValidationRepository>(REPOSITORY_TYPES._UserSiseRepository).to(
    UserSiseRepository
  );

  // MPAC Validator
  bind<IUserMpacStatusRepository>(REPOSITORY_TYPES._UserMpacRepository).to(
    UserMpacRepository
  );

  // FOSPEC Validator
  bind<IUserFospecValidationRepository>(
    REPOSITORY_TYPES._UserFospecRepository
  ).to(UserFospecRepository);

  bind<IRiaRepository>(REPOSITORY_TYPES._RiaRepository).to(RiaRepository);

  bind<IUserTermAndConditionRepository>(
    REPOSITORY_TYPES._UserTermAndConditionRepository
  ).to(UserTermAndConditionRepository);

  bind<ITermAndConditionRepository>(
    REPOSITORY_TYPES._TermAndConditionRepository
  ).to(TermAndConditionRepository);

  bind<IValidateTotpRepository>(REPOSITORY_TYPES._ValidateTotpRepository).to(
    ValidateTotpRepository
  );
  bind<IRNECRepository>(REPOSITORY_TYPES._RNECRepository).to(
    RNECRepositoryImplement
  );
});

"use client";

import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import {
  DIGITAL_IDENTITY_STATUS_MESSAGE,
  PREVIOUS_TRANSACTION,
  UserDataInterface,
} from "lib";
import GetLastTransactionUseCase from "domain/usecases/digital-identity/getLastTransaction.usecase";

import { GenerateUserData } from "lib/helpers/generateUserData";
import { jwtDecode } from "jwt-decode";
import PushDatabaseUseCase from "domain/usecases/digital-identity/pushDatabase.usecase";
import SendUserDataUseCase from "domain/usecases/userData/sendUserData.usecase";

export async function digitalIdentityStatus(access_token: string) {
  try {
    if (access_token) {
      const sessionData: UserDataInterface = jwtDecode(access_token);

      // Registramos el usuario en la tabla de sculptor "UserDevice" y en caso de que ya esté le modificamos el valor que tenga en el atributo OS a web.
      const SendUserDataUseCase = appContainer.get<SendUserDataUseCase>(
        USECASES_TYPES._SendUserDataUseCase
      );

      await SendUserDataUseCase.execute(
        GenerateUserData(
          sessionData.identification_number!,
          sessionData.preferred_username!
        ),
        access_token
      );

      // Verificamos que la marca de enrolamiento digital esté en el registro de KC "edcmfndi".
      if (
        sessionData &&
        sessionData.edcmfndi &&
        sessionData.edcmfndi.toUpperCase() === "S"
      ) {
        return DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE;
      } else {
        const GetStatusUseCase = appContainer.get<GetLastTransactionUseCase>(
          USECASES_TYPES._GetLastTransactionUseCase
        );
        const result = await GetStatusUseCase.execute(access_token);

        if (result) {
          if (result.message === DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE) {
            if (result.data.idState.idState != PREVIOUS_TRANSACTION) {
              // Si el usuario está enrolado pero la marca en KC no está "edcmfndi", actualizamos el registro de KC.
              const PushDatabase = appContainer.get<PushDatabaseUseCase>(
                USECASES_TYPES._PushDatabaseUseCase
              );
              await PushDatabase.execute(result.data.adoBody, access_token);
            }
          }
          return result.message;
        }
      }
    }

    return DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE;
  } catch (err) {
    return DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE;
  }
}

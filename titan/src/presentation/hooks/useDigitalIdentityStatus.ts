"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "presentation/store";
import {
  setDigitalIdentitySelected,
  setLoading,
} from "presentation/store/digitalIdentity/digitalIdentitySlice";
import { jwtDecode } from "jwt-decode";
import {
  DIGITAL_IDENTITY_STATUS_MESSAGE,
  PREVIOUS_TRANSACTION,
  UserDataInterface,
} from "lib";
import GetLastTransactionUseCase from "domain/usecases/digital-identity/getLastTransaction.usecase";
import PushDatabaseUseCase from "domain/usecases/digital-identity/pushDatabase.usecase";
import SendUserDataUseCase from "domain/usecases/userData/sendUserData.usecase";
import { GenerateUserData } from "lib/helpers/generateUserData";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import UpdateUserInformationUseCase from "domain/usecases/keycloak/updateUserData.usecase";
import { FindStatusByUserUseCase } from "domain/usecases/digital-identity/findStatusByUser.usecase";

const useDigitalIdentityStatus = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const digitalStatus = useAppSelector((state) => state.digitalIdentity.status);
  const [status, setStatus] = useState(digitalStatus);
  const [updateToken, setUpdateToken] = useState(false);

  const loadingInit = digitalStatus === "LOADING" ? true : false;

  const [isLoading, setIsLoading] = useState(loadingInit);

  const fetchDigitalIdentityStatus = useCallback(async () => {
    if (digitalStatus !== DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE) {
      if (!session?.access_token) {
        setStatus(DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE);
        return;
      }

      try {
        dispatch(setLoading(true));
        setIsLoading(true);

        const accessToken = session.access_token;
        const sessionData: UserDataInterface = jwtDecode(accessToken);

        // 1. Generamos y enviamos los datos del usuario a través de "SendUserDataUseCase"
        const sendUserDataUseCase = appContainer.get<SendUserDataUseCase>(
          USECASES_TYPES._SendUserDataUseCase
        );
        const userData = GenerateUserData(
          sessionData.identification_number!,
          sessionData.preferred_username!
        );

        await sendUserDataUseCase.execute(userData, accessToken);

        // 2. Verificamos si el usuario ya está enrolado en KC
        if (sessionData.edcmfndi?.toUpperCase() === "S") {
          setStatus(DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE);
          dispatch(
            setDigitalIdentitySelected(DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE)
          );

          return;
        }

        //   3. Obtenemos la última transacción del usuario si no está enrolado
        const getLastTransactionUseCase =
          appContainer.get<GetLastTransactionUseCase>(
            USECASES_TYPES._GetLastTransactionUseCase
          );
        const result = await getLastTransactionUseCase.execute(accessToken);

        if (result?.message === DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE) {
          // 4. Buscar el último status exitoso del usuario para actualizar Keycloak
          const findStatusByUser = appContainer.get<FindStatusByUserUseCase>(
            USECASES_TYPES._FindStatusByUserUseCase
          );

          const digitalIdStatus = await findStatusByUser.execute(accessToken);

          // 5. Actualizar el estado de enrolamiento en Keycloak.
          const updateUserInformation =
            appContainer.get<UpdateUserInformationUseCase>(
              USECASES_TYPES._UpdateUserInformationUseCase
            );

          if (digitalIdStatus) {
            await updateUserInformation.execute(
              accessToken,
              digitalIdStatus.data
            );
            setUpdateToken(true);
          }

          // 6. Actualizamos la base de datos si es necesario
          if (result.data.idState.idState != PREVIOUS_TRANSACTION) {
            const pushDatabaseUseCase = appContainer.get<PushDatabaseUseCase>(
              USECASES_TYPES._PushDatabaseUseCase
            );

            await pushDatabaseUseCase.execute(result.data.adoBody, accessToken);
          }
        }

        //  7. Actualizamos el estado

        const newStatus =
          result?.message || DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE;
        setStatus(newStatus);
        dispatch(setDigitalIdentitySelected(newStatus));
      } catch (error) {
        setStatus(DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE);
        dispatch(
          setDigitalIdentitySelected(DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE)
        );
      } finally {
        setIsLoading(false);
        dispatch(setLoading(false));
      }
    }
  }, [session, dispatch]);

  // Exponemos `refetchStatus` para permitir reintentos
  const refetchStatus = useCallback(() => {
    fetchDigitalIdentityStatus();
  }, [fetchDigitalIdentityStatus]);

  useEffect(() => {
    fetchDigitalIdentityStatus();
  }, [fetchDigitalIdentityStatus]);

  return { status, isLoading, refetchStatus, updateToken, setUpdateToken };
};

export default useDigitalIdentityStatus;

"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "presentation/store";
import { setLoading } from "presentation/store/digitalIdentity/digitalIdentitySlice";
import { jwtDecode } from "jwt-decode";
import {
  SISE_API_RESULT_CODE,
  SISE_USER_STATUS_MESSAGE,
  UserDataInterface,
} from "lib";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { GenerateSiseQuery } from "lib/helpers/generateSiseQuery";
import UserSiseValidationUseCase from "domain/usecases/userData/userSiseValidation.usecase";
import { setSiseObservation, setSiseValidationSelected } from "presentation/store/siseValidation/siseValidationSlice";

const useUserSiseStatus = () => {
  const QUERY_SUCCESSFUL = "SISE: Query successfully completed"
  const QUERY_ERROR = "SISE: Query ERROR!"

  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const siseStatus = useAppSelector((state) => state.siseValidation.status);

  const [sise_status, setStatus] = useState(siseStatus);
  const [updateToken, setUpdateToken] = useState(false);

  const loadingInit = siseStatus === "LOADING" ? true : false;

  const [sise_isLoading, setIsLoading] = useState(loadingInit);

  const fetchSiseStatus = useCallback(async () => {
    if (!session?.access_token) {
      setStatus(SISE_USER_STATUS_MESSAGE.INCOMPLETE);
      return;
    }

    try {
      dispatch(setLoading(true));
      setIsLoading(true);
      setStatus(SISE_USER_STATUS_MESSAGE.IN_PROCESS);

      const accessToken = session.access_token;
      const sessionData: UserDataInterface = jwtDecode(accessToken);

      // Generamos y enviamos los datos del usuario al servicio pre-validador MPAC.
      const sendSiseQueryUseCase = appContainer.get<UserSiseValidationUseCase>(
        USECASES_TYPES._UserSiseValidationUseCase
      );
      const userData = GenerateSiseQuery(
        sessionData.identification_type!,
        sessionData.identification_number!
      );

      const dataSise = await sendSiseQueryUseCase.execute(
        userData,
        accessToken
      );

      // 1. Validamos respuesta correcta de la API.
      if (dataSise?.Estado_HV === SISE_API_RESULT_CODE.ACTIVO) {
        
        // TODO: Agregar validaciones adicionales
        setStatus(SISE_USER_STATUS_MESSAGE.COMPLETE);
        dispatch(setSiseObservation(QUERY_SUCCESSFUL));
        return;
        
      } 
      else if (dataSise !== undefined && dataSise?.Estado_HV !== "") {        
        // El estado del usuario no es correcto
        const newStatus = SISE_USER_STATUS_MESSAGE.IN_PROCESS;
        setStatus(newStatus);
        dispatch(setSiseObservation(QUERY_ERROR));
      }
      else{        
        // Error al solicitar la API
        const newStatus = SISE_USER_STATUS_MESSAGE.INCOMPLETE;
        setStatus(newStatus);
        dispatch(setSiseObservation(QUERY_ERROR));
      }
    } catch (error) {      
      setStatus(SISE_USER_STATUS_MESSAGE.INCOMPLETE);
      dispatch(setSiseValidationSelected(SISE_USER_STATUS_MESSAGE.INCOMPLETE));
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  }, [session, dispatch]);

  // Exponemos `refetchStatus` para permitir reintentos
  const sise_refetchStatus = useCallback(() => {
    fetchSiseStatus();
  }, [fetchSiseStatus]);

  useEffect(() => {
    fetchSiseStatus();
  }, [fetchSiseStatus]);

  return { sise_status, sise_isLoading, sise_refetchStatus, updateToken, setUpdateToken };
};

export default useUserSiseStatus;

"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "presentation/store";
import { setLoading } from "presentation/store/digitalIdentity/digitalIdentitySlice";
import { jwtDecode } from "jwt-decode";
import {
  FOSPEC_USER_STATUS_MESSAGE,
  FOSPEC_API_RESULT_CODE,
  UserDataInterface,
} from "lib";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import UserFospecValidationUseCase from "domain/usecases/userData/userFospecValidation.usecase";
import { GenerateFospecQuery } from "lib/helpers/generateFospecQuery";
import { setFospecObservation, setFospecValidationSelected } from "presentation/store/fospecValidation/fospecValidationSlice";
import { HttpStatusCode } from "axios";

const useUserFospecStatus = () => {
  const QUERY_SUCCESSFUL = "FOSPEC: Query successfully completed"
  const QUERY_ERROR = "FOSPEC: Query ERROR!"

  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const fospecStatus = useAppSelector((state) => state.fospecValidation.status);

  const [fospec_status, setStatus] = useState(fospecStatus);
  const [updateToken, setUpdateToken] = useState(false);

  const loadingInit = fospecStatus === "LOADING" ? true : false;

  const [fospec_isLoading, setIsLoading] = useState(loadingInit);

  const fetchFospecStatus = useCallback(async () => {
    if (!session?.access_token) {
      setStatus(FOSPEC_USER_STATUS_MESSAGE.INCOMPLETE);
      return;
    }

    try {
      dispatch(setLoading(true));
      setIsLoading(true);
      setStatus(FOSPEC_USER_STATUS_MESSAGE.IN_PROCESS);

      const accessToken = session.access_token;
      const sessionData: UserDataInterface = jwtDecode(accessToken);

      // Generamos y enviamos los datos del usuario al servicio prevalidador FOSPEC.
      const sendFospecQuery = appContainer.get<UserFospecValidationUseCase>(
        USECASES_TYPES._UserFospecValidationUseCase
      );
      const userData = GenerateFospecQuery(
        sessionData.identification_type!,
        sessionData.identification_number!
      );

      const dataFospec = await sendFospecQuery.execute(
        userData,
        accessToken
      );

      // 1. Validamos respuesta correcta de la API.
      if (dataFospec?.response_code === HttpStatusCode.Ok) {
        
        if (dataFospec?.status){
          setStatus(FOSPEC_USER_STATUS_MESSAGE.COMPLETE);
          dispatch(setFospecObservation(QUERY_SUCCESSFUL));
          return;
        }else{
          setStatus(FOSPEC_USER_STATUS_MESSAGE.INCOMPLETE);
          dispatch(setFospecObservation(QUERY_SUCCESSFUL));
        }

        
      } else if (dataFospec?.response_code === HttpStatusCode.PayloadTooLarge) {
        // El estado del usuario no es correcto
        const newStatus = FOSPEC_USER_STATUS_MESSAGE.ERROR;
        setStatus(newStatus);
        dispatch(setFospecObservation(QUERY_ERROR));
      }else{
        // Error al solicitar la API
        const newStatus = FOSPEC_USER_STATUS_MESSAGE.ERROR;
        setStatus(newStatus);
        dispatch(setFospecObservation(QUERY_ERROR));
      }      
    } catch (error) {
      setStatus(FOSPEC_USER_STATUS_MESSAGE.ERROR);
      dispatch(setFospecValidationSelected(FOSPEC_USER_STATUS_MESSAGE.ERROR));
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  }, [session, dispatch]);

  // Exponemos `refetchStatus` para permitir re-intentos
  const fospec_refetchStatus = useCallback(() => {
    fetchFospecStatus();
  }, [fetchFospecStatus]);

  useEffect(() => {
    fetchFospecStatus();
  }, [fetchFospecStatus]);

  return { fospec_status, fospec_isLoading, fospec_refetchStatus, updateToken, setUpdateToken };
};

export default useUserFospecStatus;

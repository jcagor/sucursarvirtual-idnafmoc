"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "presentation/store";
import { setLoading } from "presentation/store/digitalIdentity/digitalIdentitySlice";
import { jwtDecode } from "jwt-decode";
import {
  MPAC_API_RESULT_CODE,
  MPAC_API_USER_REQUIREMENT_STATUS,
  MPAC_USER_STATUS_MESSAGE,
  UserDataInterface,
} from "lib";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import UserMpacDataUseCase from "domain/usecases/userData/userdataMpac.usecase";
import {
  setMpacDataSelected,
  setMpacObservation,
  setServerResponse,
} from "presentation/store/mpacStatus/mpacStatusSlice";
import { GenerateMpacUser } from "lib/helpers/generateMpacUser";

const useUserMpacStatus = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const mpacStatus = useAppSelector((state) => state.mpacData.status);

  const [mpac_status, setStatus] = useState(mpacStatus);
  const [updateToken, setUpdateToken] = useState(false);

  const loadingInit = mpacStatus === "LOADING" ? true : false;

  const [mpac_isLoading, setIsLoading] = useState(loadingInit);

  const fetchMpacStatus = useCallback(async () => {
    if (!session?.access_token) {
      setStatus(MPAC_USER_STATUS_MESSAGE.INCOMPLETE);
      return;
    }

    try {
      dispatch(setLoading(true));
      setIsLoading(true);
      setStatus(MPAC_USER_STATUS_MESSAGE.IN_PROCESS);

      const accessToken = session.access_token;
      const sessionData: UserDataInterface = jwtDecode(accessToken);

      // Verificamos que los datos de identificación estén disponibles
      if (!sessionData.identification_type || !sessionData.identification_number) {
        console.error('Datos de identificación no disponibles:', sessionData);
        setStatus(MPAC_USER_STATUS_MESSAGE.INCOMPLETE);
        return;
      }

      // Generamos y enviamos los datos del usuario al servicio prevalidador MPAC.
      const sendUserMpacDataUseCase = appContainer.get<UserMpacDataUseCase>(
        USECASES_TYPES._UserMpacDataUseCase
      );

      const userData = GenerateMpacUser(
        sessionData.identification_type,
        sessionData.identification_number
      );

      const dataMpac = await sendUserMpacDataUseCase.execute(
        userData,
        accessToken
      );

      // 1. Validamos respuesta correcta de la API.
      if (dataMpac?.OUT_Salida === MPAC_API_RESULT_CODE.OK) {
        // 2. Verificamos el estado actual del usuario cumple.
        if (dataMpac?.OUT_IdState === MPAC_API_USER_REQUIREMENT_STATUS.OK) {
          // 3. Se actualiza el estado y la descripcion del estado actual.
          setStatus(MPAC_USER_STATUS_MESSAGE.COMPLETE);          
          setMpacObservation(dataMpac.OUT_reason);

          //const validatedData = validateAndSetLaw(processedData);         
          
          dispatch(setServerResponse(dataMpac));
          return;
        }
        // Si el estado actual del usuario no cumple.
        else {
          setStatus(MPAC_USER_STATUS_MESSAGE.OBSERVATIONS);          
          setMpacObservation(dataMpac.OUT_reason);                    
                    
          
          dispatch(setServerResponse(dataMpac));
          return;
        }
      } else {
        // Error al solicitar la API
        const newStatus = MPAC_USER_STATUS_MESSAGE.INCOMPLETE;
        setStatus(newStatus);
        dispatch(setMpacDataSelected(newStatus));
      }
    } catch (error) {
      console.error('Error en fetchMpacStatus:', error);
      setStatus(MPAC_USER_STATUS_MESSAGE.INCOMPLETE);
      dispatch(setMpacDataSelected(MPAC_USER_STATUS_MESSAGE.INCOMPLETE));
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  }, [session, dispatch]);

  // Exponemos `refetchStatus` para permitir reintentos
  const mpac_refetchStatus = useCallback(() => {
    fetchMpacStatus();
  }, [fetchMpacStatus]);

  useEffect(() => {
    fetchMpacStatus();
  }, [fetchMpacStatus]);

  return { mpac_status, mpac_isLoading, mpac_refetchStatus, updateToken, setUpdateToken };
};

export default useUserMpacStatus;

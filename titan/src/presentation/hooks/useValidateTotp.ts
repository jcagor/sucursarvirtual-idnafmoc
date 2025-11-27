"use client";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useAppDispatch } from "presentation/store";
import { useCallback } from "react";
import { setVerifyTotp, reVerifyTotp, setLoading } from "presentation/store/validateTotp/validateTotpSlice";
import GetVerifyTotp from "domain/usecases/verify-totp/getVerifyTotp.use.case";

const useValidateTotp = () => {
  const dispatch = useAppDispatch();

  const getVerifyTotp = appContainer.get<GetVerifyTotp>(
    USECASES_TYPES._GetVerifyTotp
  );

  const fetchVerifyTotp = useCallback(async (
    totp: string, 
    token: string
  ) => {
    try {

      dispatch(setLoading(true));

      const verifyTotp = await getVerifyTotp.execute(
        totp,
        token
      );

      if(verifyTotp){
        dispatch(setLoading(false));
        dispatch(setVerifyTotp({valid: verifyTotp.valid, messageError: verifyTotp.message}));
      }
    } catch (error) {
      console.error("Error al validar el TOTP: ", error);
    }
  }, [dispatch]);

  const newVerifyTotp = useCallback( () => {
    dispatch(reVerifyTotp())
  }, [dispatch]);

  return{
    fetchVerifyTotp,
    newVerifyTotp
  }
}

export default useValidateTotp;
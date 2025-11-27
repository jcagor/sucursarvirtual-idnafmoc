"use client";
import ValidateIdentityUseCase from "domain/usecases/rnec/validateIdentityUseCase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useAppDispatch } from "presentation/store";
import {
  setDataRnec,
  setOnOpenModal,
  setStateRnecFlow,
  setDocumentData,
  setOnOpenModalErrorMessage,
} from "presentation/store/rnec/rnecSlice";

const useRnec = () => {
  const dispatch = useAppDispatch();

  const validateIdentityUseCase = appContainer.get<ValidateIdentityUseCase>(
    USECASES_TYPES._ValidateIdentityUseCase
  );

  const openModal = (value: boolean) => {
    dispatch(setOnOpenModal(value));
  };

  const openModalErrorMessage = (value: boolean) => {
    dispatch(setOnOpenModalErrorMessage(value));
  };

  const validateIdentityHandler = async (
    token: string,
    documentNumber: string,
    documentType: string
  ) => {
    dispatch(setOnOpenModal(false));
    const result = await validateIdentityUseCase.execute(
      token,
      documentNumber,
      documentType
    );
    const documentData = result?.documentData || result?.documentDataList?.[0];
    const dataResp = documentData || undefined;

    if (dataResp?.estadoRNEC.toLowerCase() === "vigente") {
      dispatch(setDataRnec(dataResp));
      dispatch(setStateRnecFlow("SUCCESS"));
      dispatch(setOnOpenModal(true));
    } else {
      dispatch(setStateRnecFlow("FAILED"));
      dispatch(setOnOpenModal(false));
      dispatch(setOnOpenModalErrorMessage(true));
    }

    return dataResp;
  };

  const setDocumentDataHandler = (
    documentType: string,
    documentNumber: string
  ) => {
    dispatch(setDocumentData({ documentType, documentNumber }));
  };

  return {
    validateIdentityHandler,
    openModal,
    setDocumentDataHandler,
    openModalErrorMessage,
  };
};

export default useRnec;

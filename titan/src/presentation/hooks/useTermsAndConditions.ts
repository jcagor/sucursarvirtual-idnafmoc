"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "presentation/store";

import CreateUserTermAndConditionUseCase from "domain/usecases/terms-conditions/createUserTermAndCondition.use.case";

import GetTermAndConditionDataUseCase from "domain/usecases/terms-conditions/getTermAndConditionData.use.case";

import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { ICreateTermAndConditionData } from "lib/types/terms-conditions";
import { setBiometricTermCondition } from "presentation/store/termsConditions/termsConditionsSlice";
import ValidateUserTermsAndConditionsUseCase from "domain/usecases/terms-conditions/validateUserTermAndConditions.use.case";
import { DIGITAL_IDENTITY_STATUS_MESSAGE } from "lib";

const useTermsAndConditions = () => {
  const dispatch = useAppDispatch();

  // Obtener estado de identidad digital desde Redux
  const digitalIdentityStatus = useAppSelector(
    (state) => state.digitalIdentity.status
  );

  const userTermAndConditionsUseCase =
    appContainer.get<CreateUserTermAndConditionUseCase>(
      USECASES_TYPES._CreatUserTermAndConditionUseCase
    );

  const getTermAndConditionData =
    appContainer.get<GetTermAndConditionDataUseCase>(
      USECASES_TYPES._GetTermAndConditionDataUseCase
    );

  const validateUserTermsUseCase =
    appContainer.get<ValidateUserTermsAndConditionsUseCase>(
      USECASES_TYPES._ValidateUserTermsAndConditionsUseCase
    );

  const [termsAndConditions, setTermsAndConditions] = useState<string>("");
  const [termAndConditionCreation, setTermAndConditionCreation] =
    useState<ICreateTermAndConditionData | null>(null);
  const [selectedTerms, setSelectedTerms] = useState(false);
  const [termsAndConditionsName, setTermsAndConditionsName] = useState("");

  const { data: session } = useSession();

  // Solo hace la petición si el estado de identidad es 'incomplete'
  const shouldFetch =
    digitalIdentityStatus === DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE;

  const fetchTermsAndConditions = useCallback(
    async (name: string) => {
      if (!session || !shouldFetch) return;

      try {
        const terms = await getTermAndConditionData.execute(
          name,
          session.access_token || ""
        );

        if (terms) {
          setTermsAndConditions(terms.description);
          setTermAndConditionCreation({
            idTermsAndCondition: terms.id,
            nameTermAndCondition: terms.name,
          });
        }
      } catch (error) {
        console.error("Error al obtener los términos:", error);
      }
    },
    [session, shouldFetch]
  );

  const validateTermsAndConditions = useCallback(
    async (name: string) => {
      if (!session || !shouldFetch) return false;

      try {
        const isValid = await validateUserTermsUseCase.execute(
          name,
          session.access_token || ""
        );
        dispatch(setBiometricTermCondition(isValid || false));
        return isValid;
      } catch (error) {
        console.error("Error al validar términos:", error);
        return false;
      }
    },
    [session, shouldFetch, dispatch]
  );

  const registerUserTerms = useCallback(async () => {
    if (!termAndConditionCreation || !selectedTerms || !session) return false;

    try {
      const response = await userTermAndConditionsUseCase.execute(
        termAndConditionCreation,
        session.access_token || ""
      );

      const success = response.statusCode === 200;
      if (success) dispatch(setBiometricTermCondition(true));

      return success;
    } catch (error) {
      console.error("Error al registrar términos:", error);
      return false;
    }
  }, [termAndConditionCreation, selectedTerms, session, dispatch]);

  const initializeTermsAndConditions = useCallback(async () => {
    if (!termsAndConditionsName || !shouldFetch) return;

    await fetchTermsAndConditions(termsAndConditionsName);
    await validateTermsAndConditions(termsAndConditionsName);
  }, [
    termsAndConditionsName,
    fetchTermsAndConditions,
    validateTermsAndConditions,
    shouldFetch,
  ]);

  return {
    setTermsAndConditionsName,
    initializeTermsAndConditions,
    termsAndConditions,
    selectedTerms,
    setSelectedTerms,
    registerUserTerms,
  };
};

export default useTermsAndConditions;

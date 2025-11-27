"use client";

import { FC, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  DigitalIdComplete,
  Greatment,
  HomeCard,
  LoadingCard,
  PendingCard,
} from "presentation";
import useTermsAndConditions from "presentation/hooks/useTermsAndConditions";
import useDigitalIdentityStatus from "presentation/hooks/useDigitalIdentityStatus";
import {
  DIGITAL_IDENTITY_STATUS_MESSAGE,
  USER_AUTHORIZATION,
  nameFormat,
} from "lib";
import { jwtDecode } from "jwt-decode";
import { RevalidateCard } from "presentation/components/organisms/home/card/RevalidateCard";
import { useIsKiosk } from "presentation/hooks/useIsKiosk";

interface Props {}

export const WelcomeHome: FC<Props> = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("Usuario");

  const isKiosk = useIsKiosk();

  const { status, isLoading, refetchStatus } = useDigitalIdentityStatus(); // Usamos el hook con refetch

  const { setTermsAndConditionsName, initializeTermsAndConditions } =
    useTermsAndConditions();

  // Seteamos el nombre del usuario al cargar
  useEffect(() => {
    if (session?.access_token) {
      const decoded = jwtDecode(session.access_token) as {
        given_name?: string;
      };
      if (decoded?.given_name) setName(nameFormat(decoded.given_name));
    }
  }, [session]);

  // Configuramos los términos solo si el estado digital es INCOMPLETE
  useEffect(() => {
    if (status === DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE) {
      setTermsAndConditionsName(USER_AUTHORIZATION.biometricTermsAndConditions);
      initializeTermsAndConditions();
    }
  }, [status, setTermsAndConditionsName, initializeTermsAndConditions]);

  // Renderiza la card correspondiente al estado digital
  const renderCard = useCallback(() => {
    if (isLoading) {
      return <LoadingCard className="mb-8 md:mb-12" />;
    }

    switch (status) {
      case DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE:
        return <DigitalIdComplete className="mb-8 md:mb-12" />;
      case DIGITAL_IDENTITY_STATUS_MESSAGE.IN_PROCESS:
        return (
          <PendingCard
            isLoading={isLoading}
            retryFunction={refetchStatus} // Retry llama al refetch del hook
            className="mb-8 md:mb-12"
          />
        );
      case DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE:
        return <HomeCard className="mb-8 md:mb-12" />;
      default:
        return (
          <RevalidateCard
            isLoading={isLoading}
            retryFunction={refetchStatus} // Retry llama al refetch del hook
            className="mb-8 md:mb-12"
          />
        );
    }
  }, [status, isLoading, refetchStatus]);

  return (
    <>
      <Greatment text={`Hola, ${name}`} className="mb-2 md:mb-7 md:-mt-3" />
      <div className="w-full flex justify-center md:justify-start">
        {renderCard()}
      </div>
    </>
  );
};

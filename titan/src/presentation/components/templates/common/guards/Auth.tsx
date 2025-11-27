"use client";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { LoadingAnimation } from "presentation";
import { appContainer } from "infrastructure/ioc/inversify.config";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import useDigitalIdentityStatus from "presentation/hooks/useDigitalIdentityStatus";
import { DIGITAL_IDENTITY_STATUS_MESSAGE, USER_AUTHORIZATION } from "lib";
import useTermsAndConditions from "presentation/hooks/useTermsAndConditions";
import { refreshAccessToken } from "actions";

interface Props {
  children: React.ReactNode;
}

export const Auth = ({ children }: Props) => {
  const { data: session, status, update } = useSession();

  const {
    status: identityStatus,
    updateToken,
    setUpdateToken,
  } = useDigitalIdentityStatus();

  const { setTermsAndConditionsName, initializeTermsAndConditions } =
    useTermsAndConditions();

  const logout = async () => {
    const logoutUseCase = appContainer.get<LogoutKeycloakUseCase>(
      USECASES_TYPES._LogoutKeycloakUseCase
    );
    await logoutUseCase.execute(session?.access_token).then(() => {
      signOut({ callbackUrl: "/" });
    });
  };

  const updateTokenInfo = async () => {
    if (updateToken) {
      const refreshData = await refreshAccessToken(session);
      update(refreshData)
        .then(() => {
          setUpdateToken(false);
        })
        .catch(() => {
          setUpdateToken(false);
        })
        .finally(() => {
          setUpdateToken(false);
        });
    }
  };

  useEffect(() => {
    updateTokenInfo();
  }, [updateToken]);

  useEffect(() => {
    if (identityStatus === DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE) {
      setTermsAndConditionsName(USER_AUTHORIZATION.biometricTermsAndConditions);
      initializeTermsAndConditions();
    }
  }, [status, setTermsAndConditionsName, initializeTermsAndConditions]);

  useEffect(() => {
    const handleAuth = async () => {
      if (status === "loading") return;

      if (status === "unauthenticated" || !session) {
        await signIn("keycloak", {
          callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        });
        return;
      } else if (session && session.error === "RefreshAccessTokenError") {
        await logout();
        return;
      }
    };

    handleAuth();
  }, [session, status]);

  // useEffect(() => {
  //   const handleVisibilityChange = async () => {
  //     if (document.visibilityState === "visible" && session) {
  //       // Refresh token when the user returns to the page
  //       const refreshData = await refreshAccessToken(session);
  //       update(refreshData);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [session]);

  if (status === "loading" || status === "unauthenticated") {
    return <LoadingAnimation className="z-[6000]" />;
  }

  return <> {children}</>;
};

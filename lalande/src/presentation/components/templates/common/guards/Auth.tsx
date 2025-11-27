"use client";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { appContainer } from "infrastructure/ioc/inversify.config";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { refreshAccessToken } from "actions";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

interface Props {
  children: React.ReactNode;
}

export const Auth = ({ children }: Props) => {
  const { data: session, status, update } = useSession();


  const logout = async () => {
    const logoutUseCase = appContainer.get<LogoutKeycloakUseCase>(
      USECASES_TYPES._LogoutKeycloakUseCase
    );
    await logoutUseCase.execute(session?.access_token).then(() => {
      signOut({ callbackUrl: "/" });
    });
  };


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

  return <> {children}</>;
};

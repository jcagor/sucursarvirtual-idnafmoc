"use client";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { appContainer } from "infrastructure/ioc/inversify.config";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

import { Status } from "../config/constants";
import { LoadingAnimation } from "presentation/components/molecules";
import { getCurrentUserRole } from "lib/helpers/uiUtils";
import { useAppDispatch } from "presentation";
import { setMpacUserRole } from "presentation/store/mpacUserStatus/mpacUserStatusSlice";

interface Props {
  children: React.ReactNode;
}

export const Auth = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

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
      if (status === Status.Loading) return;

      if (status === Status.Unauthenticated || !session) {
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

  if (status === Status.Loading || status === Status.Unauthenticated) {
    return <LoadingAnimation className="z-[6000]" />;
  }

  const role = getCurrentUserRole(session?.access_token??"")
  dispatch(setMpacUserRole(role));

  return <>{children}</>;
};

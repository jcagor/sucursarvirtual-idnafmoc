"use client";
import { ChronuxTemplate } from "@comfanditd/chronux-ui";
import Link from "next/link";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { signOut, useSession } from "next-auth/react";
import {
  sidebarItemsBusinessNoValidated,
  sidebarItemsBusinessSuspended,
  sidebarItemsBusinessValidated,
} from "lib";
import { usePathname } from "next/navigation";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { useAppSelector } from "presentation/store";
import { BUSINESS_STATUS } from "lib";

export const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const currentPath = usePathname();
  const businessStatus = useAppSelector((state) => state.businessStatus.State);

  const logout = async () => {
    const logoutUseCase = appContainer.get<LogoutKeycloakUseCase>(
      USECASES_TYPES._LogoutKeycloakUseCase
    );
    await logoutUseCase.execute(session?.access_token).then(() => {
      signOut({ callbackUrl: "/" });
    });
  };

  let sidebarItemsToUse;
  if (businessStatus === BUSINESS_STATUS.VALIDATED) {
    sidebarItemsToUse = sidebarItemsBusinessValidated;
  } else if (businessStatus === BUSINESS_STATUS.SUSPENDED) {
    sidebarItemsToUse = sidebarItemsBusinessSuspended;
  } else {
    sidebarItemsToUse = sidebarItemsBusinessNoValidated;
  }

  return (
    <ChronuxTemplate
      sucursal
      currentPath={currentPath}
      sidebarItems={sidebarItemsToUse}
      link={Link}
      image={Image}
      onLogout={logout}
      homePage="/"
      token={session?.access_token}
      lottie={lottie}
      accountPath="/my-account"
    >
      {children}
    </ChronuxTemplate>
  );
};

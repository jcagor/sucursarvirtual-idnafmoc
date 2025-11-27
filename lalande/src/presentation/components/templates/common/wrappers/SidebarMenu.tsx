"use client";
import { ChronuxTemplate } from "@comfanditd/chronux-ui";
import Link from "next/link";
import Image from "next/image";
import lottie from "lottie-web/build/player/lottie_light";
import { usePathname } from "next/navigation";
import { appContainer } from "infrastructure/ioc/inversify.config";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { signOut, useSession } from "next-auth/react";
import {
  MPAC_USER_ROLE,
  sidebarAdminItems,
  sidebarAnalystItems,
  sidebarConsultantItems,
  sidebarActiveAdmin,
  sidebarGeneralAdmin,
  sidebarItems,
} from "lib";
import { useAppSelector } from "presentation/store";

export const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  /* USER ROLE */
  const userRole = useAppSelector((state) => state.userRole);

  const currentPath = usePathname();

  const logout = async () => {
    const logoutUseCase = appContainer.get<LogoutKeycloakUseCase>(
      USECASES_TYPES._LogoutKeycloakUseCase
    );
    await logoutUseCase.execute(session?.access_token).then(() => {
      signOut({ callbackUrl: "/" });
    });
  };

  const getMenuOptions = () => {
    switch (userRole) {
      case MPAC_USER_ROLE.admin:
        return sidebarAdminItems;

      case MPAC_USER_ROLE.consultor:
        return sidebarConsultantItems;

      case MPAC_USER_ROLE.analista:
        return sidebarAnalystItems;

      case MPAC_USER_ROLE.administrador_activos:
        return sidebarActiveAdmin;

      case MPAC_USER_ROLE.administrador_general:
        return sidebarGeneralAdmin;

      default:
        return sidebarItems;
    }
  };

  return (
    <ChronuxTemplate
      sucursal
      currentPath={currentPath}
      sidebarItems={getMenuOptions()}
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

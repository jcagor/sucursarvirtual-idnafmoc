"use client";
import { ChronuxTemplate } from "@comfanditd/chronux-ui";
import Link from "next/link";
import Image from "next/image";
import { sidebarBottomItems, sidebarItems } from "lib";
import { usePathname } from "next/navigation";
import { appContainer } from "infrastructure/ioc/inversify.config";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const currentPath = usePathname();
  const [lottieInstance, setLottieInstance] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("lottie-web/build/player/lottie_light").then((mod: any) => {
        setLottieInstance(mod);
      });
    }
  }, []);

  const logout = async () => {
    const logoutUseCase = appContainer.get<LogoutKeycloakUseCase>(
      USECASES_TYPES._LogoutKeycloakUseCase
    );
    await logoutUseCase.execute(session?.access_token).then(() => {
      signOut({ callbackUrl: "/" });
    });
  };

  return (
    <ChronuxTemplate
      sucursal
      currentPath={currentPath}
      sidebarItems={sidebarItems}
      link={Link}
      image={Image}
      onLogout={logout}
      homePage="/"
      token={session?.access_token}
      lottie={lottieInstance}
      accountPath="/my-account"
      bottomItems={sidebarBottomItems}
    >
      {children}
    </ChronuxTemplate>
  );
};

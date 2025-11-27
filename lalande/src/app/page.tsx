"use client";
import IsUserRegisteredUseCase from "domain/usecases/User/IsUserRegistered.use.case";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { HomeTemplate, SidebarMenu } from "presentation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function TemporalPage() {
  useEffect(() => {
    isUserRegistered();
  }, []);

  const isUserRegistered = async () => {
    const isUserRegistered = appContainer.get<IsUserRegisteredUseCase>(
      USECASES_TYPES._IsUserRegistered
    );
    const response = await isUserRegistered.execute();

    if (!response) {
      toast.error("Error al verificar el estado de registro del usuario.");
      return;
    }

    if (response !== "Usuario está registrado.") {
      toast.error(response);
    }
  };

  return (
    <SidebarMenu>
      <HomeTemplate />
    </SidebarMenu>
  );
}

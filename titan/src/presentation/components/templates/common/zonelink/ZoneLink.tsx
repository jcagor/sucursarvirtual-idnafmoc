"use client";
import axios, { AxiosError } from "axios";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Modal from "presentation/components/atoms/common/modals/Modal";
import { ZoneLoadingAnimation } from "presentation/components/molecules";
import { APPLY_MODAL_2FA } from "lib/config/flags";
import Modal2FA from "presentation/components/atoms/common/modals/Modal2FA";
import useValidateTotp from "presentation/hooks/useValidateTotp";
import { maintenanceRoutes, IMaintenance } from "lib";

interface Props {
  href: string;
  children: ReactNode;
  zoneName: string;
  urlImage?: string;
  className?: string;
  subsidies2Fa?: boolean;
}

export const ZoneLink: FC<Props> = ({
  href,
  children,
  zoneName = "el servicio",
  urlImage = "/icons/modal-man.svg",
  className = "",
  subsidies2Fa = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ReactNode | null>(null);
  const [modal2Fa, setModal2Fa] = useState<ReactNode | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintenanceInfo, setMaintenanceInfo] = useState<IMaintenance | null>(
    null
  );

  const { newVerifyTotp } = useValidateTotp();

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(false);
      setError(null);
      setRedirectUrl(null);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = href;
    }
  }, [redirectUrl]);

  const checkIfInMaintenance = (path: string): boolean => {
    const nowUTC = new Date();
    const nowColombia = new Date(
      nowUTC.toLocaleString("en-US", { timeZone: "America/Bogota" })
    );

    const routeInMaintenance = maintenanceRoutes.find((route) =>
      path.startsWith(route.path)
    );

    if (routeInMaintenance) {
      const startTime = new Date(routeInMaintenance.startTime);
      const endTime = new Date(routeInMaintenance.endTime);

      if (nowColombia >= startTime && nowColombia <= endTime) {
        setMaintenanceInfo(routeInMaintenance);
        setShowMaintenanceModal(true);
        return true;
      }
    }

    return false;
  };

  const zoneFetch = () => {
    const isUnderMaintenance = checkIfInMaintenance(href);
    if (isUnderMaintenance) return;

    if (APPLY_MODAL_2FA && subsidies2Fa) {
      handleTwoFactorAuthentication();
    } else {
      redirectToUrl();
    }
  };

  const handleTwoFactorAuthentication = () => {
    setModal2Fa(
      <Modal2FA
        onSecondaryClick={() => {
          setModal2Fa(null);
          newVerifyTotp();
        }}
        onClose={() => {
          setModal2Fa(null);
          redirectToUrl();
        }}
      />
    );
  };

  const redirectToUrl = async (retries = 2) => {
    setError(null);
    setIsLoading(true);
    newVerifyTotp();

    try {
      const res = await axios.get(href);
      if (res.status === 200) {
        setError(null);
        setRedirectUrl(href);
      } else {
        throw new Error(`Unexpected status code: ${res.status}`);
      }
    } catch (err) {
      if (retries > 0) {
        redirectToUrl(retries - 1);
      } else {
        const error = err as AxiosError;
        setIsLoading(false);

        if (error.code === "ECONNABORTED") {
          setError(
            <Modal
              title="¡Algo salió mal!"
              description="Lo sentimos, la solicitud tardó demasiado tiempo en responder. Pero no te preocupes, puedes reintentarlo!"
              onPrimaryClick={() => zoneFetch()}
            />
          );
        } else {
          setError(
            <Modal
              title="¡Algo salió mal!"
              description={`Lo sentimos, no se pudo conectar con ${zoneName}, por favor verifica tu conexión y vuelve a intentarlo.`}
              onPrimaryClick={() => zoneFetch()}
            />
          );
        }
      }
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  const renderMaintenanceModal = () => {
    if (!showMaintenanceModal || !maintenanceInfo) return null;

    return (
      <Modal
        urlImage="/icons/bubble.png"
        description={`¡Hola! Queremos informarte que ${
          `*${maintenanceInfo.maintenanceData?.name}*` || "nuestro sistema"
        } estará fuera de servicio en el horario de *${formatTime(
          maintenanceInfo.startTime
        )}* a *${formatTime(
          maintenanceInfo.endTime
        )}*, debido a labores de mantenimiento.\n\n
        Estamos trabajando para mejorar tu experiencia y estaremos de vuelta pronto.
        `}
        primaryButtonText="Aceptar"
        onPrimaryClick={() => setShowMaintenanceModal(false)}
        hideSecondaryButton
        lockModal
      />
    );
  };

  return (
    <div>
      {isLoading && (
        <ZoneLoadingAnimation
          src={urlImage}
          zoneName={zoneName}
          containerClassName="w-screen h-screen md:w-[calc(100vw-250px)] md:h-screen md:top-0 md:bottom-auto top-0 right-0 z-[20]"
        />
      )}
      {error}
      {modal2Fa}
      {renderMaintenanceModal()}
      <div onClick={zoneFetch} className={className}>
        {children}
      </div>
    </div>
  );
};

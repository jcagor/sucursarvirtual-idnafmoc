import Modal from "presentation/components/atoms/common/modals/Modal";
import { useMaintenance } from "presentation/context/MaintenanceContext";
import React from "react";

interface Props {
  fromRedirect: boolean;
  setFromRedirect: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MaintenanceModal = ({ fromRedirect, setFromRedirect }: Props) => {
  const { showModal, setShowModal, maintenanceInfo } = useMaintenance();

  if (!showModal || !maintenanceInfo) return null;

  const handleClose = () => {
    setShowModal(false);
    setFromRedirect(false);
  };

  // Función para formatear la hora en 12h con AM/PM en inglés
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convierte 0 a 12 AM

    return `${hours}:${minutes} ${period}`;
  };

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
      onPrimaryClick={handleClose}
      hideSecondaryButton
      lockModal
    />
  );
};

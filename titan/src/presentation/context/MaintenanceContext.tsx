"use client";
// context/MaintenanceContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IMaintenance, maintenanceRoutes } from "lib";
import { MaintenanceModal } from "presentation/components/molecules/common/modals/MaintenanceModal";
import { usePathname } from "next/navigation";

interface MaintenanceContextProps {
  isInMaintenance: boolean;
  maintenanceInfo: IMaintenance | null;
  checkMaintenance: (path: string) => boolean;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const MaintenanceContext = createContext<MaintenanceContextProps>({
  isInMaintenance: false,
  maintenanceInfo: null,
  checkMaintenance: () => false,
  showModal: false,
  setShowModal: () => {},
});

export const MaintenanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [maintenanceInfo, setMaintenanceInfo] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [fromRedirect, setFromRedirect] = useState(false); // Si viene de redirección
  const currentPath = usePathname();

  const checkMaintenance = (path: string) => {
    // Convertir la hora actual a Colombia (UTC-5)
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
        setIsInMaintenance(true);
        setMaintenanceInfo(routeInMaintenance);
        setShowModal(true);

        return true;
      }
    }

    setIsInMaintenance(false);
    return false;
  };

  // Interceptar navegación si la URL es de una página en mantenimiento
  useEffect(() => {
    if (checkMaintenance(currentPath)) {
      setFromRedirect(true);
      router.push("/"); // Redirige a home
    }
  }, [currentPath]);

  return (
    <MaintenanceContext.Provider
      value={{
        isInMaintenance,
        maintenanceInfo,
        checkMaintenance,
        showModal,
        setShowModal,
      }}
    >
      {children}
      <MaintenanceModal
        fromRedirect={fromRedirect}
        setFromRedirect={setFromRedirect}
      />
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => useContext(MaintenanceContext);

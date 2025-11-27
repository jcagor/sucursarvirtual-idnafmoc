"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "presentation/store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { removeAlert } from "presentation/store/alert/alertSlice";

const Alert = () => {
  const alerts = useSelector((state: RootState) => state.alert.alerts);
  const dispatch = useDispatch();
  const [closingAlerts, setClosingAlerts] = useState<number[]>([]);

  const handleClose = (id: number) => {
    setClosingAlerts((prev) => [...prev, id]);
    setTimeout(() => {
      dispatch(removeAlert(id));
      setClosingAlerts((prev) => prev.filter((alertId) => alertId !== id));
    }, 300);
  };

  useEffect(() => {
    alerts.forEach((alert) => {
      setTimeout(() => {
        handleClose(alert.id);
      }, 3000);
    });
  }, [alerts]);

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-2">
      {alerts.map((alert) => {
        switch (alert.type) {
          case "success":
            return (
              <SuccessAlert
                key={alert.id}
                alert={alert}
                onClose={handleClose}
                closingAlerts={closingAlerts}
              />
            );
          case "error":
            return (
              <ErrorAlert
                key={alert.id}
                alert={alert}
                onClose={handleClose}
                closingAlerts={closingAlerts}
              />
            );
          case "warning":
            return (
              <WarningAlert
                key={alert.id}
                alert={alert}
                onClose={handleClose}
                closingAlerts={closingAlerts}
              />
            );
          default:
            return (
              <InfoAlert
                key={alert.id}
                alert={alert}
                onClose={handleClose}
                closingAlerts={closingAlerts}
              />
            );
        }
      })}
    </div>
  );
};

interface AlertProps {
  alert: {
    id: number;
    type: string;
    message: string;
  };
  onClose: (id: number) => void;
  closingAlerts: number[];
}

const SuccessAlert = ({ alert, onClose, closingAlerts }: AlertProps) => (
  <AlertTemplate
    alert={alert}
    onClose={onClose}
    closingAlerts={closingAlerts}
    bgColor="bg-[#D6F0E0]"
    iconSrc="/icons/SuccesAlertIcon.svg"
    iconColor="bg-[#00C393]"
  />
);

const ErrorAlert = ({ alert, onClose, closingAlerts }: AlertProps) => (
  <AlertTemplate
    alert={alert}
    onClose={onClose}
    closingAlerts={closingAlerts}
    bgColor="bg-[#F9E1E5]"
    iconSrc="/icons/ErrorAlertIcon.svg"
    iconColor="bg-[#EB5757]"
  />
);

const WarningAlert = ({ alert, onClose, closingAlerts }: AlertProps) => (
  <AlertTemplate
    alert={alert}
    onClose={onClose}
    closingAlerts={closingAlerts}
    bgColor="bg-[#FBF0DA]"
    iconSrc="/icons/WarningAlertIcon.svg"
    iconColor="bg-[#F2C94C]"
  />
);

const InfoAlert = ({ alert, onClose, closingAlerts }: AlertProps) => (
  <AlertTemplate
    alert={alert}
    onClose={onClose}
    closingAlerts={closingAlerts}
    bgColor="bg-[#DEF1F7]"
    iconSrc="/icons/InfoAlertIcon.svg"
    iconColor="bg-[#5458F7]"
  />
);

interface AlertTemplateProps {
  alert: {
    id: number;
    type: string;
    message: string;
  };
  onClose: (id: number) => void;
  closingAlerts: number[];
  bgColor: string;
  iconSrc: string;
  iconColor: string;
}

const AlertTemplate = ({
  alert,
  onClose,
  closingAlerts,
  bgColor,
  iconSrc,
  iconColor,
}: AlertTemplateProps) => (
  <div
    className={`flex items-center relative p-4 w-80 rounded-lg shadow-lg transition-opacity  duration-300
      ${
        closingAlerts.includes(alert.id)
          ? "animate-fade-out"
          : "animate-fade-in"
      } ${bgColor}`}
  >
    <div className="flex items-center">
      <Image
        src={iconSrc}
        alt="Alert icon"
        width={20}
        height={20}
        className={`w-8 h-8 p-2 mr-2 rounded-full ${iconColor}`}
      />
      <div className="text-principal-350">{alert.message}</div>
    </div>
    <button
      onClick={() => onClose(alert.id)}
      className="absolute top-1 right-4 text-lg font-bold text-principal-350"
    >
      ×
    </button>
  </div>
);

export default Alert;
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  className?: string;
}

export const ErrorIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/alert-icon.svg"
      alt="Icono de alerta"
      width={90}
      height={90}
      className={`${className}`}
      draggable={false}
    />
  );
};

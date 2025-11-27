import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const ArrowIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/rojo-flecha.svg"
      alt="Icono de flecha fondo rojo"
      width={100}
      height={100}
      className={`w-16 h-16 ${className}`}
      draggable={false}
    />
  );
};

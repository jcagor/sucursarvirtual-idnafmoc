import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const PlusIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/plus-icon.webp"
      alt="Icono de flecha fondo rojo"
      width={65}
      height={61}
      className={`w-12 h-12 ${className}`}
      draggable={false}
    />
  );
};

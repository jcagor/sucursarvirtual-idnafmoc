import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const AssignmentIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/assignment-dates.png"
      alt="Icono de flecha fondo rojo"
      width={65}
      height={61}
      className={`w-12 h-12 ${className}`}
      draggable={false}
    />
  );
};

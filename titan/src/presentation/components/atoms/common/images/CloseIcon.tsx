import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const CloseIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/close-icon-modal.svg"
      alt="Icono de cerrar"
      width={100}
      height={100}
      className={`absolute w-4 h-4 ${className}`}
      draggable={false}
    />
  );
};

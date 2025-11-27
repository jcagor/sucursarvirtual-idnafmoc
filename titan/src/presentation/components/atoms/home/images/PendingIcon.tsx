import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const PendingIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/pending-icon.svg"
      alt="Icono pendiente"
      width={90}
      height={90}
      className={`${className}`}
      draggable={false}
    />
  );
};

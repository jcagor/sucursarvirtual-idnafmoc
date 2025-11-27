import Image from "next/image";
import React, { type FC } from "react";

type Props = {
  className?: string;
};
export const HighPriorityIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/high_priority_icon.svg"
      alt="Icono de cerrar"
      width={100}
      height={100}
      className={`w-10 h-10 ${className}`}
      draggable={false}
    />
  );
};

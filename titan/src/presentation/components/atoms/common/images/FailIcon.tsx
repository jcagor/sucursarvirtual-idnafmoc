import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const FailIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/fail.webp"
      alt="Icono de éxito"
      width={100}
      height={100}
      className={`w-16 h-16 ${className}`}
      draggable={false}
    />
  );
};

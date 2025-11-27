import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

const AlertIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/alert-icon.svg"
      alt="Ícono de alerta"
      width={69}
      height={69}
      className={`absolute z-50 ${className}`}
      draggable={false}
    />
  );
};

export { AlertIcon };

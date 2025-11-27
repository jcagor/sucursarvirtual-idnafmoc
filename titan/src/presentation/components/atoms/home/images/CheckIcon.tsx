import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const CheckIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/check-icon.svg"
      alt="Icono chequeado"
      width={90}
      height={90}
      className={`${className}`}
      draggable={false}
    />
  );
};

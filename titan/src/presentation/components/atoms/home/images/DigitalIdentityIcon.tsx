import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const DigitalIdentityIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/digital-identity.svg"
      alt="Icono identidad digital"
      width={90}
      height={90}
      className={`${className}`}
      draggable={false}
    />
  );
};

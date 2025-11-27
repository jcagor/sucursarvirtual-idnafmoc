import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const ExcelIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/icon_excel.webp"
      alt="Icono de éxito"
      width={26}
      height={28}
      className={`z-50 ${className}`}
      draggable={false}
    />
  );
};

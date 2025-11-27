import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const UploadIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/upload_icon.svg"
      alt="Ícono de afiliación de trabajador"
      width={38}
      height={38}
      className={`z-50 ${className}`}
      draggable={false}
    />
  );
};

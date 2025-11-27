import Image from "next/image";
import React, { type FC } from "react";

export interface BasePathInterface {
  basePath?: boolean;
  className?: string;
}

export const LoadedFile: FC<BasePathInterface> = ({
  basePath = true,
  className,
}) => {
  return (
    <Image
      src="/icons/loaded-file.png"
      alt="Icono de cerrar"
      width={65}
      height={61}
      className={`absolute w-16 h-16 ${className}`}
      draggable={false}
    />
  );
};

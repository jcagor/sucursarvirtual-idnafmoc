import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}
export const DropdownArrowIcon: FC<Props> = ({
  width = 100,
  height = 100,
  className,
}) => {
  return (
    <Image
      src="/icons/dropdown-icon.svg"
      alt="Imagen persona"
      width={width}
      height={height}
      className={`z-20 ${className}`}
      draggable={false}
      loading="lazy"
    />
  );
};

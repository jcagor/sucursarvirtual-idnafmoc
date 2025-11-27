import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const TrashIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/Trash.webp"
      alt="Ícono de caneca"
      width={15}
      height={17.2}
      className={`z-50 ${className}`}
      draggable={false}
    />
  );
};

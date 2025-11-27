import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const EmptyBoxIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/empty-box.svg"
      alt="Icono vacío"
      width={90}
      height={90}
      className={`${className}`}
      draggable={false}
    />
  );
};

import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const FamilyIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/family-card.svg"
      alt="Imagen familia afiliado"
      width={208}
      height={263}
      className={`${className}`}
      draggable={false}
    />
  );
};

import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const LetterMIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/m-vector.svg"
      alt="Imagen M afiliado"
      width={522}
      height={376}
      className={`${className}`}
      draggable={false}
    />
  );
};

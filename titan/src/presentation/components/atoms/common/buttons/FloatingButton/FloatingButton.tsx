import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
  onClick: () => void;
}

export const FloatingButton: FC<Props> = ({ className = "", onClick }) => {
  return (
    <Image
      src="/icons/float-button-icon.svg"
      alt="Botón flotante"
      width={70}
      height={70}
      className={`${className}`}
      draggable={false}
      onClick={onClick}
    />
  );
};

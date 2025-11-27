import Image from "next/image";
import { type FC } from "react";

interface Props {
  className?: string;
}

export const FloatIcon: FC<Props> = ({ className = "" }) => {
  return (
    <Image
      src="/icons/float-icon-radicated.svg"
      alt="ícono flotante"
      width={357}
      height={330}
      className={`${className}`}
      draggable={false}
    />
  );
};

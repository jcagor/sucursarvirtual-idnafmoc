import Image from "next/image";
import { type FC } from "react";

interface Props {
  className?: string;
}

export const DetailWhiteIcon: FC<Props> = ({ className = "" }) => {
  return (
    <Image
      src="/icons/detail-white.svg"
      alt="Imagen de detalle blanco"
      width={19.66}
      height={18.08}
      className={`z-50 ${className}`}
      draggable={false}
    />
  );
};

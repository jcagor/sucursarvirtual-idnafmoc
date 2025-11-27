import Image from "next/image";
import { type FC } from "react";

interface Props {
  className?: string;
}

export const CheckedIcon: FC<Props> = ({ className = "" }) => {
  return (
    <Image
      src="/icons/checked-icon.svg"
      alt="ícono de chequeado"
      width={16}
      height={15.72}
      className={`${className}`}
      draggable={false}
    />
  );
};

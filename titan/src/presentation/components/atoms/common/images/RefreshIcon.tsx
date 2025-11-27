import Image from "next/image";
import { type FC } from "react";

type Props = {
  className?: string;
};
export const RefreshIcon: FC<Props> = ({ className }) => {
  return (
    <Image
      src="/icons/restart.svg"
      alt="Icono de refresco"
      width={100}
      height={100}
      className={`w-16 h-16 ${className}`}
      draggable={false}
    />
  );
};

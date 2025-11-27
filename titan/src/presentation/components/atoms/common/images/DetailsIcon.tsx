import Image from "next/image";
import { type FC } from "react";

interface Props {
  className?: string;
}

export const DetailsIcon: FC<Props> = ({ className = "" }) => {
  return (
    <div className="flex flex-wrap justify-center items-center rounded-full bg-principal-700 h-[calc(40px)] w-[calc(40px)]">
      <Image
        src="/icons/details-icon.svg"
        alt="Imagen Detalle"
        width={25}
        height={21}
        className={`${className}`}
        draggable={false}
      />
    </div>
  );
};

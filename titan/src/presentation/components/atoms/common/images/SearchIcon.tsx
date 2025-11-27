import Image from "next/image";
import { type FC } from "react";

interface Props {
  className?: string;
}

export const SearchIcon: FC<Props> = ({ className = "" }) => {
  return (
    <Image
      src="/icons/search-icon.svg"
      alt="Imagen persona"
      width={25}
      height={21}
      className={`${className}`}
      draggable={false}
    />
  );
};

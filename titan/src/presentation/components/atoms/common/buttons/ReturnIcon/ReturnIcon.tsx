import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  className?: string;
  returnPath?: string;
  onClick?: () => void;
}

export const ReturnIcon: FC<Props> = ({
  className = "",
  returnPath = "/",
  onClick = () => {},
}) => {
  return (
    <Link href={returnPath}>
      <Image
        src="/icons/return-icon.svg"
        alt="Botón de retorno"
        width={22}
        height={18}
        className={`${className} cursor-pointer hidden sm:block`}
        draggable={false}
        onClick={onClick}
      />
    </Link>
  );
};

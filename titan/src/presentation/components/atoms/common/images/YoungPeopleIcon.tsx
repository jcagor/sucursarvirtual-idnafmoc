import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
}

export const YoungPeopleIcon: FC<Props> = ({
  className,
}) => {
  return (
    <Image
      src="/icons/young-people.svg"
      alt="imagen gente joven"
      width={213}
      height={280}
      className={className}
      draggable={false}
    />
  );
};

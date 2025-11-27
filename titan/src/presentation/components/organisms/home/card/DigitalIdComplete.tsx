"use client";
import { CardTitle, CheckIcon } from "presentation";
import { EmptyBoxIcon } from "presentation/components/atoms/home/images/EmptyBoxIcon";

import React, { FC } from "react";

interface Props {
  className?: string;
}

export const DigitalIdComplete: FC<Props> = ({ className = "" }) => {
  return (
    <div
      className={`w-[99%] md:w-[331px] h-[140px] rounded-[20px] menuCardShadow relative flex flex-col justify-center pl-8 pr-16
        "active:scale-[99%] resize-card bg-principal-150 ${className}`}
    >
      <CardTitle
        text={"¡Ya tienes tu identidad digital verificada!"}
        className="mb-1"
      />
      <CheckIcon className="absolute mt-1 right-[-18px] md:right-[-30px]" />
    </div>
  );
};

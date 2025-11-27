"use client";
import { CardDescription, CardTitle, Spinner } from "presentation";
import { EmptyBoxIcon } from "presentation/components/atoms/home/images/EmptyBoxIcon";

import React, { FC } from "react";

interface Props {
  className?: string;
}

export const LoadingCard: FC<Props> = ({ className = "" }) => {
  return (
    <div
      className={`w-[99%] md:w-[331px] h-[140px] rounded-[20px] menuCardShadow relative flex flex-col justify-center pl-8 pr-12 resize-card bg-principal-150 ${className}`}
    >
      <CardTitle text={"Estamos validando tu información"} className="mb-1" />
      <CardDescription text={"Espera unos segundos por favor"} />
      <div className="absolute mt-1 right-[-18px] md:right-[-30px]">
        <div className="w-full h-full relative flex justify-center items-center">
          <EmptyBoxIcon />
          <Spinner className="w-[3.5rem] absolute -mt-1" />
        </div>
      </div>
    </div>
  );
};

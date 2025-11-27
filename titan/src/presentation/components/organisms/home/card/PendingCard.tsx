"use client";
import { CardTitle, RetryValidation, Spinner } from "presentation";
import { EmptyBoxIcon } from "presentation/components/atoms/home/images/EmptyBoxIcon";
import { PendingIcon } from "presentation/components/atoms/home/images/PendingIcon";

import React, { FC } from "react";

interface Props {
  className?: string;
  retryFunction: () => void;
  isLoading: boolean;
}

export const PendingCard: FC<Props> = ({
  className = "",
  retryFunction = () => {},
  isLoading,
}) => {
  return (
    <div
      onClick={isLoading ? () => {} : retryFunction}
      className={`w-[99%] md:w-[calc(331px)] h-[calc(140px)] rounded-[20px] menuCardShadow relative flex flex-col justify-center pl-8 pr-12 ${
        isLoading ? "" : "active:scale-[99%]  cursor-pointer"
      } resize-card bg-principal-150 ${className}`}
    >
      <CardTitle
        text={
          isLoading
            ? "Estamos validando tu información"
            : "Tu identidad digital está pendiente"
        }
        className="mb-1"
      />
      <RetryValidation isLoading={isLoading} />
      <div className="absolute mt-1 right-[calc(-18px)] md:right-[calc(-30px)]">
        {isLoading ? (
          <div className="w-full h-full relative flex justify-center items-center">
            <EmptyBoxIcon />
            <Spinner className="w-[3.5rem] absolute -mt-1" />
          </div>
        ) : (
          <PendingIcon className="" />
        )}
      </div>
    </div>
  );
};

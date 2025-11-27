"use-client";
import { ScrollZoneInterface } from "lib/types/table";
import { type FC } from "react";
import React from "react";

export const ScrollZone: FC<ScrollZoneInterface> = ({
  children,
  scrollDirection = "vertical",
  className,
}) => {
  return (
    <div
      className={`flex flex-col w-full h-full text-center text-wrap rounded-lg p-3 bg-principal-1000 overflow-y-auto ${className}`}
    >
      {children}
    </div>
  );
};

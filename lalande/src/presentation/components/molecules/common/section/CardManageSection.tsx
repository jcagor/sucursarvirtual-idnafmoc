"use-client";

import { ScrollZoneInterface } from "lib";
import { type FC } from "react";
import React from "react";

export const CardManageSection: FC<ScrollZoneInterface> = ({
  children,
  scrollDirection = "horizontal",
  className,
}) => {
  return (
    <div
      className={`flex gap-4 w-full h-full text-center text-wrap rounded-lg p-3 bg-principal-1000 overflow-x-auto ${className}`}
    >
      {children}
    </div>
  );
};

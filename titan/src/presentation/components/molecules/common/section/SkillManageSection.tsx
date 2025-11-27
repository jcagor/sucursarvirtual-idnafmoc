"use-client";
import { ScrollZoneInterface } from "lib/types/table";
import { NeutralBlackText, NeutralNCText } from "presentation/components/atoms";
import { type FC } from "react";
import React from "react";

export const SkillManageSection: FC<ScrollZoneInterface> = ({
  children,
  scrollDirection = "horizontal",
  className,
}) => {
  return (
    <div
      className={`flex flex-col w-full h-full min-h-15 text-center text-wrap rounded-lg p-3 bg-[#FFFFFF] overflow-x-auto ${className}`}
    >
    <NeutralBlackText
        text="Sugerencias basadas en tu perfil"
        className="cf-text-principal-180 mb-[1rem] md:mb-2 text-color[#000] flex"
        fontSize="md"
      />
      {children}
    </div>
  );
};

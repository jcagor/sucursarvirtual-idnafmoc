"use client";
import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { TextInterface } from "lib/types";
import { type FC } from "react";

export const CardTitle: FC<TextInterface> = ({ text, className = "" }) => {
  return (
    <TertiaryTitle
      text={text}
      className={`leading-[26.76px] font-medium ${className}`}
    />
  );
};

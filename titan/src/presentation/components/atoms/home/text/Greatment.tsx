"use client";
import { type FC } from "react";
import { TextInterface } from "lib/types";
import { MainTitle } from "@comfanditd/chronux-ui";

export const Greatment: FC<TextInterface> = ({ text, className = "" }) => {
  return <MainTitle text={text} className={`${className}`} />;
};

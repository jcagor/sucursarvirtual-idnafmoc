"use client";
import { Paragraph } from "@comfanditd/chronux-ui";
import { TextInterface } from "lib/types";
import { type FC } from "react";

export const CardDescription: FC<TextInterface> = ({
  text,
  className = "",
}) => {
  return <Paragraph text={text} className={`block pt-1 pr-3 ${className}`} />;
};

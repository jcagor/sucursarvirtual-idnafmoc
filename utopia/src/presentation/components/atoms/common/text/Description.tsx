"use client";
import { type FC } from "react";
import { TextInterface } from "lib/types";
import { Paragraph } from "@comfanditd/chronux-ui";

export const Description: FC<TextInterface> = ({ text, className }) => {
  return <Paragraph text={text} className={className} />;
};

"use client";
import { Paragraph, QuaternaryTitle } from "@comfanditd/chronux-ui";
import { TextInterface } from "lib";
import React, { FC } from "react";

export const CardText: FC<TextInterface> = ({ text, className }) => {
  return (
    <>
      <Paragraph text={text} className={`${className} hidden md:block`} />
      <QuaternaryTitle text={text} className={`${className} md:hidden`} />
    </>
  );
};

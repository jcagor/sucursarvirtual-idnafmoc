import { type TextInterface } from "lib";
import { type FC } from "react";

export const SecondaryText: FC<TextInterface> = ({ text, className = "" }) => {
  return (
    <p className={` font-outfit text-principal-180 p-2 ${className}`}>{text}</p>
  );
};

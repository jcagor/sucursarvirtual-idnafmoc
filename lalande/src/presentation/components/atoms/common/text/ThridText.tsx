import { type TextInterface } from "/lib";
import { type FC } from "react";

export const ThridText: FC<TextInterface> = ({ text, className }) => {
  return (
    <h2
      className={`font-outfit text-xl font-medium text-principal-180 ${className}`}
    >
      {text}
    </h2>
  );
};

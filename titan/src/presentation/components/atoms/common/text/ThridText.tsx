import { type TextInterface } from "/lib";
import { type FC } from "react";

export const ThridText: FC<TextInterface> = ({
  text,
  className = "font-outfit text-2xl font-medium text-principal-180",
}) => {
  return <h2 className={className}>{text}</h2>;
};

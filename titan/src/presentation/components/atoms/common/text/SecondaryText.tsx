import { type TextInterface } from "lib";
import { type FC } from "react";

export const SecondaryText: FC<TextInterface> = ({
  text,
  className = "font-outfit text-3xl font-bold text-principal-180",
}) => {
  return <h2 className={className}>{text}</h2>;
};

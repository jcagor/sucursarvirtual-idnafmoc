import { TextInterface } from "lib";
import { type FC } from "react";

export const MainTitle: FC<TextInterface> = ({
  text,
  className = "text-3xl font-bold text-principal-180 m-2",
}) => {
  return (
    <h1 className={`text-3xl font-bold text-principal-180 m-2 ${className}`}>
      {text}
    </h1>
  );
};

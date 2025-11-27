import { type FC } from "react";

type TextInterface = {
  text: string;
  className?: string;
};

export const MainTitle: FC<TextInterface> = ({
  text,
  className = "text-3xl font-bold text-principal-180",
}) => {
  return <h1 className={className}>{text}</h1>;
};

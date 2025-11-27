import { type TextInterface } from "lib";
import { type FC } from "react";

export const NeutralText: FC<TextInterface> = ({
  text,
  className,
  fontSize,
  replaceClassname = false,
}) => {
  return (
    <span
      className={`font-outfit ${
        fontSize ? "text-" + fontSize : "text-sm"
      } ${className}`}
    >
      {text}
    </span>
  );
};

import { type TextInterface } from "lib";
import { type FC } from "react";

export const NeutralNCText: FC<TextInterface> = ({
  text,
  className,
  fontSize,
  replaceClassname = false,
}) => {
  return (
    <p
      className={`font-outfit ${
        fontSize ? "text-" + fontSize : "text-sm"
      } ${className}`}
    >
      {text}
    </p>
  );
};

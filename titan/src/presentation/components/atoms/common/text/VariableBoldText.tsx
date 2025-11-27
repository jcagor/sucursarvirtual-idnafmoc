import { MultipleTextInterface, type TextInterface } from "lib";
import { type FC } from "react";

export const VariableBoldText: FC<MultipleTextInterface> = ({
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
      {text[0]?text[0]:""} <b>{text[1]?text[1]:""}</b> {text[2]?text[2]:""}
    </p>
  );
};

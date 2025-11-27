
import { TextInterface } from "@/lib";
import { type FC } from "react";

export const NeutralBlackText: FC<TextInterface> = ({
  text,
  className,
  fontSize,
}) => {
  return (
    <p
      className={`font-outfit ${
        fontSize ? "text-" + fontSize : "text-sm"
      } font-normal text-principal-350 ${className}`}
    >
      {text}
    </p>
  );
};

import { Description } from "presentation/components/atoms";
import React, { FC } from "react";

interface ActiveCardProps {
  mainTitle: string;
  secondTitle: string;
  action?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const ActionCardCustom: FC<ActiveCardProps> = ({
  mainTitle,
  secondTitle,
  action = () => {},
  className = "",
  children,
}) => {
  return (
    <div
      onClick={action}
      className={` rounded-[20px] relative flex flex-col justify-center cursor-pointer resize-card bg-principal-150 ${className}`}
    >
      <Description
        text={mainTitle}
        className="w-full mb-2 font-outfit font-semibold text-lg text-principal-180 ml-3"
      />
      <Description
        className="w-2/3 font-outfit font-light text-xs text-principal-180 mb-2 ml-3"
        text={secondTitle}
      />
      {children}
    </div>
  );
};

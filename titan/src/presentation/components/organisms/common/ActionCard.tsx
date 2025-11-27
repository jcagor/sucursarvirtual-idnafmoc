import {
  MediumSubtitle,
  SmallSubtitle,
  TertiaryTitle,
} from "@comfanditd/chronux-ui";
import React, { FC } from "react";

interface ActiveCardProps {
  action?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const ActionCard: FC<ActiveCardProps> = ({
  action = () => {},
  className = "",
  children,
}) => {
  return (
    <div
      onClick={action}
      className={`w-[96%] md:w-[298px] h-[155px] rounded-[20px] menuCardShadow relative flex flex-col justify-center cursor-pointer pl-8 pr-20 md:pr-12 active:scale-[99%] resize-card bg-principal-150 ${className}`}
    >
      <TertiaryTitle
        text="Información de mi cuenta Comfandi"
        className="mb-2"
      />
      <SmallSubtitle
        className="hidden md:block"
        text="Requieres modificar alguno de tus datos"
      />
      <MediumSubtitle
        className="md:hidden"
        text="Requieres modificar alguno de tus datos"
      />

      {children}
    </div>
  );
};

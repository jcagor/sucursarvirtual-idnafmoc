import Image from "next/image";
import React, { type FC } from "react";

interface Props {
  className?: string;
  onClick: () => void;
  sidebarOpen: boolean;
}

export const HelpFloatedButton: FC<Props> = ({ className = "", onClick, sidebarOpen }) => {
  return (    
      <img
        alt="Botón ayuda"
        //className="sidebar-help-toggle"
        onClick={onClick}
        draggable="false"
        width="55"
        height="55"
        decoding="async"
        className={(sidebarOpen? "right-[50vw] top-12":"right-5 top-10") + " hover:cursor-pointer active:scale-[98%] cursor-pointer absolute z-[1000] overflow-hidden"}
        src={sidebarOpen?"/icons/colapse-icon.svg":"/icons/help-icon.svg"}
      />
  );
};

import Image from "next/image";
import { CardDescription } from "presentation";
import React from "react";

export const ActivateLink = () => {
  return (
    <div className="flex items-center">
      <CardDescription text="Activar aquí" className="text-principal-180" />
      <Image
        src="/icons/right-arrow.svg"
        alt="Flecha derecha"
        width={6}
        height={6}
        className="mt-1"
        draggable={false}
      />
    </div>
  );
};

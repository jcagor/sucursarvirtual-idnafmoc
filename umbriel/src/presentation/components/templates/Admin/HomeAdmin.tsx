"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { ADMIN_MENU_OPTIONS } from "@/lib/config/constants";
import { ActionMenuCard } from "../../molecules/common/cards/ActionMenuCard";
import { SecondaryText } from "../../atoms";

export const HomeAdmin = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full pr-6">
      <MainTitle text="Ruta de Proceso MiPyme" />

      <SecondaryText
        text="¿En qué podemos ayudarte hoy?"
        className="text-principal-330 mt-10"
      />
      <div className="w-full grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
        {ADMIN_MENU_OPTIONS.map((item) => (
          <ActionMenuCard
            key={item.text}
            url={item.url}
            imageUrl={item.imageUrl}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

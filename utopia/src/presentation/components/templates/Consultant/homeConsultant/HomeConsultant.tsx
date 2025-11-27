"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { ActionMenuCard } from "presentation";

export const HomeConsultant = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full pr-6">
      <MainTitle text="Ruta de" />
      <MainTitle text="Proceso MiPyme" />
      <p> ¿En qué podemos ayudarte hoy? </p>
      <div className="w-9/12 flex flex-wrap gap-4 mt-10">
        <ActionMenuCard
          imageUrl="/utopia/icons/assignment-dates.png"
          text="Cronogramas por empresa"
          url="/Consultant/schedule"
        />
        <ActionMenuCard
          imageUrl="/utopia/icons/certifications-icon.png"
          text="Informes"
          url="/Consultant/MonthlyReport"
        />
      </div>
    </div>
  );
};

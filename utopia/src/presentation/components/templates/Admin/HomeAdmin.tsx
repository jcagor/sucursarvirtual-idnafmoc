"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import {
  CustomSelectOne,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";

export const HomeAdmin = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full pr-6">
      <MainTitle text="Hola, Bienvenido a la Sucursal de Gestión MiPyme" />
      <SectionSeparator />
      <SecondaryText text=" Antes de comenzar, selecciona la empresa que deseas gestionar." />
      <div className="flex w-2/3 gap-4 p-4 rounded-xl shadow-md bg-principal-150">
        <div className="w-1/2 px-4 text-principal-180 text-2xl font-semibold">
          Selecciona la cuenta que quieres gestionar
        </div>
        <div className="flex w-1/2 ">
          <CustomSelectOne name="Account" label="" options={[]} />
        </div>
      </div>
    </div>
  );
};

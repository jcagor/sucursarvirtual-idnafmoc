"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { CustomInputOne, NumberCircle } from "presentation/components/atoms";
import { useState } from "react";

interface AnnexRow {
  annexType: string;
  quantity: string;
  detail: string;
}

interface SectionEighthMonthlyReportProps {
  values: { annexes: AnnexRow[] };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
}

export const SectionEighthMonthlyReport: React.FC<
  SectionEighthMonthlyReportProps
> = ({ values, handleChange, handleBlur }) => {
  return (
    <div className="w-full mt-4">
      <div className="flex flex-row items-center">
        <NumberCircle number={8} />
        <TertiaryTitle text="Anexos" className="ml-3" />
      </div>

      <div className="flex flex-col w-full items-center rounded-lg my-3">
        <div className="w-full grid grid-cols-3 gap-1 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
          <div>Tipo de Anexo</div>
          <div>Cantidad de entrega </div>
          <div>Detalle</div>
        </div>
        <div className="flex flex-col w-full rounded-b-lg">
          {values.annexes.map((row, index) => {
            return (
              <div
                key={index}
                className="w-full grid grid-cols-3 gap-8 py-3 px-8 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10 "
              >
                <div className="pl-4 text-principal-100 text-left">
                  {row.annexType}
                </div>
                <CustomInputOne
                  id={`annexes.${index}.quantity`}
                  name={`annexes.${index}.quantity`}
                  value={row.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Cantidad de entrega"
                  ClassNameContainer="h-auto py-0 border-b border-principal-400 focus:outline-none focus:border-principal-100"
                  ClassNameInput="border-none bg-opacity-0 text-center"
                  simpleInput
                />

                <CustomInputOne
                  id={`annexes.${index}.detail`}
                  name={`annexes.${index}.detail`}
                  value={row.detail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Detalle"
                  ClassNameContainer="h-auto py-0 border-b border-principal-400 focus:outline-none focus:border-principal-100"
                  ClassNameInput="border-none bg-opacity-0 text-center"
                  simpleInput
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

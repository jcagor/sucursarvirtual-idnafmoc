"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import {
  CustomInputOne,
  NumberCircle,
  SecondaryText,
} from "presentation/components/atoms";
import { useState } from "react";

type RowsType = {
  number: number;
  AnnexType: string;
};

const rowsProp: RowsType[] = [
  {
    number: 1,
    AnnexType: "Cronogramas por empresa",
  },
  {
    number: 2,
    AnnexType: "Planes de trabajo por empresa",
  },
  {
    number: 3,
    AnnexType: "Informes",
  },
  {
    number: 4,
    AnnexType: "Tableros de seguimiento actualizados",
  },
  {
    number: 5,
    AnnexType: "Actas de asistencia",
  },
];

export const SectionSevenMonthlyReport = () => {
  const [rows, setRows] = useState<RowsType[]>(rowsProp);

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
          {rows.map((row: RowsType) => {
            return (
              <div
                key={row.number}
                className="w-full grid grid-cols-3 gap-1 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10 "
              >
                <div className="pl-4 text-principal-100 text-left">
                  {row.AnnexType}
                </div>
                <CustomInputOne
                  id="Otros"
                  placeholder="Cantidad de entrega "
                  ClassNameInput="border-none bg-opacity-0 text-center"
                />
                <CustomInputOne
                  id="Observaciones"
                  placeholder="Detalle"
                  ClassNameInput="border-none bg-opacity-0 text-center"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RadioButton = () => {
  const [selected, setSelected] = useState("sí");

  return (
    <div className="p-4 flex justify-center space-x-8 rounded-md bg-gray-100">
      <label className="flex flex-col items-center cursor-pointer">
        <span className="mb-1">Sí</span>
        <input
          type="radio"
          name="respuesta"
          value="sí"
          checked={selected === "sí"}
          onChange={() => setSelected("sí")}
          className="peer hidden"
        />
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            selected === "sí" ? "border-principal-100" : "border-principal-450"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              selected === "sí" ? "bg-principal-100" : "bg-principal-450"
            }`}
          ></div>
        </div>
      </label>

      <label className="flex flex-col items-center cursor-pointer">
        <span className="mb-1">No</span>
        <input
          type="radio"
          name="respuesta"
          value="no"
          checked={selected === "no"}
          onChange={() => setSelected("no")}
          className="peer hidden"
        />
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            selected === "no" ? "border-principal-100" : "border-principal-450"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              selected === "no" ? "bg-principal-100" : "bg-principal-450"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

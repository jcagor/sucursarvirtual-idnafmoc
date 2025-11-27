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
};

const rowsProp: RowsType[] = [
  {
    number: 1,
  },
  {
    number: 2,
  },
  {
    number: 3,
  },
];

export const SectionFiveMonthlyReport = () => {
  const [rows, setRows] = useState<RowsType[]>(rowsProp);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center">
        <NumberCircle number={5} />
        <TertiaryTitle
          text="Hitos importantes alcanzados en la intervención"
          className="ml-3"
        />
      </div>
      <SecondaryText text="Relacionar las empresas que cuenten con perfiles especiales para acceder acapital, mercados extranjeros y acceso a nuevos proveedores." />

      <div className="flex flex-col w-full items-center rounded-lg my-3">
        <div className="w-full grid grid-cols-5 gap-1 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
          <div>Capital</div>
          <div>Nuevos mercados</div>
          <div>Nuevos proveedores</div>
          <div>Otros</div>
          <div>Observaciones</div>
        </div>
        <div className="flex flex-col w-full rounded-b-lg">
          {rows.map((row: RowsType) => {
            return (
              <div
                key={row.number}
                className="grid grid-cols-5 gap-1 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10 "
              >
                <RadioButton />
                <RadioButton />
                <RadioButton />
                <CustomInputOne
                  id="Otros"
                  placeholder=""
                  ClassNameInput="border-none bg-opacity-0 text-center"
                />
                <CustomInputOne
                  id="Observaciones"
                  placeholder=""
                  ClassNameInput="border-none bg-opacity-0 text-center"
                />
              </div>
            );
          })}
        </div>
        <div
          className="w-10 h-10 mt-4 rounded-full bg-principal-100 flex items-center justify-center text-principal-150 text-2xl font-extrabold border border-principal-400 cursor-pointer"
          onClick={() =>
            setRows((prev) => [...prev, { number: prev.length + 1 }])
          }
          onKeyDown={() => {}}
        >
          +
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

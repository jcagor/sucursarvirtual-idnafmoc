"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import {
  CustomInputOne,
  DatePickerInput,
  NumberCircle,
  SecondaryText,
} from "presentation/components/atoms";
import { useState } from "react";

interface ReportRow {
  improvementOpportunity: string;
  actionPlan: string;
  correctionDate: Date;
}

interface SectionSixMonthlyReportProps {
  values: { reportFindings: ReportRow[] };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any) => void;
}

export const SectionSixMonthlyReport: React.FC<
  SectionSixMonthlyReportProps
> = ({ values, handleChange, handleBlur, setFieldValue }) => {
  const addRow = () => {
    const newRow: ReportRow = {
      improvementOpportunity: "",
      actionPlan: "",
      correctionDate: new Date(),
    };
    setFieldValue("reportFindings", [...values.reportFindings, newRow]);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center">
        <NumberCircle number={6} />
        <TertiaryTitle
          text="Reporte, hallazgos, recomendaciones o situaciones particulares"
          className="ml-3"
        />
      </div>
      <SecondaryText text="Describa los altos que se presentaron en la asistencia técnica, en este espacioes importante generar reportes acerca  de asistencias, incumplimientos, planes de mejora, entre otros datos importantes." />

      <div className="flex flex-col w-full items-center rounded-lg my-3">
        <div className="w-full grid grid-cols-3 gap-1 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
          <div>Oportunidad de mejora</div>
          <div>Plan de acción</div>
          <div>Fecha de subsanación</div>
        </div>
        <div className="flex flex-col w-full rounded-b-lg">
          {values.reportFindings.map((row, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-3 gap-10 py-3 px-8 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10"
            >
              <CustomInputOne
                id={`reportFindings.${index}.improvementOpportunity`}
                name={`reportFindings.${index}.improvementOpportunity`}
                value={row.improvementOpportunity}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Oportunidad de mejora"
                ClassNameContainer="h-auto py-0 border-b border-principal-400 focus:outline-none focus:border-principal-100"
                ClassNameInput="h-auto border-none bg-opacity-0 text-center"
                simpleInput
              />
              <CustomInputOne
                id={`reportFindings.${index}.actionPlan`}
                name={`reportFindings.${index}.actionPlan`}
                value={row.actionPlan}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Plan de acción"
                ClassNameContainer="h-auto py-0 border-b border-principal-400 focus:outline-none focus:border-principal-100"
                ClassNameInput="h-auto border-none bg-opacity-0 text-center"
                simpleInput
              />
              <CustomInputOne
                id={`reportFindings.${index}.correctionDate`}
                name={`reportFindings.${index}.correctionDate`}
                type="date"
                value={
                  row.correctionDate
                    ? new Date(row.correctionDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  const date = e.target.value;
                  setFieldValue(`reportFindings.${index}.correctionDate`, date);
                }}
                onBlur={handleBlur}
                placeholder="Fecha de subsanación"
                ClassNameContainer="h-auto py-0 border-b border-principal-400 focus:outline-none focus:border-principal-100"
                ClassNameInput="h-auto border-none bg-opacity-0 text-center"
                simpleInput
              />
            </div>
          ))}
        </div>
        <div
          className="w-10 h-10 mt-4 rounded-full bg-principal-100 flex items-center justify-center text-principal-150 text-2xl font-extrabold border border-principal-400 cursor-pointer"
          onClick={addRow}
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

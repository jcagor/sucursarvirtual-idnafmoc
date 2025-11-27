"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { GrowthPlanType } from "domain/models/growth-plan/GrowthPlanType";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import {
  Button,
  CustomInputOne,
  CustomSelectOne,
  CustomTextarea,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";

const initialGrowthPlan = {
  growthPlan_id: "",
  monitoringGrowthPlan: Array(3)
    .fill(null)
    .map(() => ({
      indicator: "",
      data_source: "",
      baseline: "",
      proposed_goal: "",
      goal_per_month: "",
      actual_value_per_month: "",
    })),
};

const growthPlan_list = [
  { value: "1", label: "Pilar Estrategico." },
  { value: "2", label: "Pilar Financiero." },
  { value: "3", label: "Pilar Tecnologico." },
];

export const MonitoringGrowthPlan = () => {
  const { data: session } = useSession();

  const onSubmit = async () => {};

  const { handleChange, values, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialGrowthPlan,
      onSubmit: onSubmit,
    });

  return (
    <div className="w-full">
      <MainTitle text="Seguimiento plan de crecimiento" />
      <SecondaryText text="Este plan de crecimiento esta enfocado en desarrollar una estrategia de tres pilares que continue apoyando a la empresa en su plan de crecimiento en el marco del Programa de Sostenibilidad de COMFANDI" />
      <SectionSeparator className="mb-4" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center rounded-lg my-3 px-3"
      >
        <CustomSelectOne
          name="growthPlan_id"
          label="Empresa:"
          placeholder="Carnesanchez S.A."
          defaultValue={values.growthPlan_id}
          value={values.growthPlan_id}
          options={growthPlan_list ?? []}
          onChange={(e) => {
            setFieldValue("growthPlan_id", e.target.value);
          }}
        />

        {values.growthPlan_id && (
          <>
            <div className="w-full grid grid-cols-6 gap-3 mt-8 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-1 border-b-2 border-principal-330 border-opacity-20">
              <div className="font-bold text-lg col-span-6">
                {
                  growthPlan_list.find(
                    (item) => item.value === values.growthPlan_id
                  )?.label
                }
              </div>
            </div>

            <div className="w-full grid grid-cols-6 gap-3 items-center justify-center text-center text-principal-100 bg-principal-150 py-1 border-b-2 border-principal-330 border-opacity-20">
              <div className="font-bold text-lg col-span-4"></div>
              <div className="font-bold text-lg col-span-2">Mes 1</div>
            </div>

            <div className="w-full grid grid-cols-6 gap-3 items-center justify-center text-center text-principal-100 bg-principal-150 py-3 divide-x-2 divide-principal-330 divide-opacity-20">
              <div className="font-bold text-lg">
                Indicador clave para el pilar
              </div>
              <div className="font-bold text-lg">Fuente de datos</div>
              <div className="font-bold text-lg">Linea base</div>
              <div className="font-bold text-lg">
                Meta propuesta del indicador
              </div>
              <div className="font-bold text-lg">Meta</div>
              <div className="font-bold text-lg">Real</div>
            </div>

            <div className="flex flex-col w-full rounded-b-lg">
              {values.monitoringGrowthPlan.map((pillar, index) => (
                <div
                  key={index}
                  className="w-full grid grid-cols-6 gap-3 py-1 px-3 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10"
                >
                  <CustomInputOne
                    id={`monitoringGrowthPlan.${index}.indicator`}
                    name={`monitoringGrowthPlan.${index}.indicator`}
                    value={pillar.indicator}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Digita el indicador"
                    ClassNameContainer="h-auto py-0 border-b border-principal-400"
                    ClassNameInput="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
                  />

                  <CustomInputOne
                    id={`monitoringGrowthPlan.${index}.data_source`}
                    name={`monitoringGrowthPlan.${index}.data_source`}
                    value={pillar.data_source}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Digita la fuente de datos"
                    ClassNameContainer="h-auto py-0 border-b border-principal-400"
                    ClassNameInput="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
                  />

                  <CustomInputOne
                    id={`monitoringGrowthPlan.${index}.baseline`}
                    name={`monitoringGrowthPlan.${index}.baseline`}
                    value={pillar.baseline}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Digita la linea base"
                    ClassNameContainer="h-auto py-0 border-b border-principal-400"
                    ClassNameInput="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
                  />

                  <CustomInputOne
                    id={`monitoringGrowthPlan.${index}.proposed_goal`}
                    name={`monitoringGrowthPlan.${index}.proposed_goal`}
                    value={pillar.proposed_goal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Digita la meta propuesta"
                    ClassNameContainer="h-auto py-0 border-b border-principal-400"
                    ClassNameInput="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
                  />

                  <CustomInputOne
                    id={`monitoringGrowthPlan.${index}.goal_per_month`}
                    name={`monitoringGrowthPlan.${index}.goal_per_month`}
                    value={pillar.goal_per_month}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Digita la meta"
                    ClassNameContainer="h-auto py-0 border-b border-principal-400"
                    ClassNameInput="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
                  />

                  <CustomInputOne
                    id={`monitoringGrowthPlan.${index}.actual_value_per_month`}
                    name={`monitoringGrowthPlan.${index}.actual_value_per_month`}
                    value={pillar.actual_value_per_month}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Digita el valor real"
                    ClassNameContainer="h-auto py-0 border-b border-principal-400"
                    ClassNameInput="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
                  />
                </div>
              ))}
              <Button
                label="Guardar información"
                type="submit"
                className="w-20 xl:w-60 mt-8 self-end"
                primary
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

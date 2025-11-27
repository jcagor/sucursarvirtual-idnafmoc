"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { GrowthPlanType } from "domain/models/growth-plan/GrowthPlanType";
import CreateGrowthPlanUseCase from "domain/usecases/growth-plan/createGrowthPlan.use.case";
import GetGrowthPlanUseCase from "domain/usecases/growth-plan/GetGrowthPlan.use.case";
import UpdateGrowthPlanUseCase from "domain/usecases/growth-plan/UpdateGrowthPlan.use.case";
import { useFormik } from "formik";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { FORM_DB_SELECT_OPTIONS, SelectOption } from "lib";
import { getSelectValues } from "lib/helpers/uiUtils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  CustomSelectOne,
  CustomTextarea,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialGrowthPlan: GrowthPlanType = {
  id: "",
  businessProfile_id: "",
  growthPlan: Array(3)
    .fill(null)
    .map(() => ({
      Name: "",
      Vision: "",
      Purpose: "",
      Roles: "",
      Challenges: "",
      Resources: "",
      Results: "",
    })),
};

export const GrowthPlan = () => {
  const { data: session } = useSession();
  const [businessList, setBusinessList] = useState<Array<SelectOption>>();
  const [newGrowthPlan, setNewGrowthPlan] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    loadSelectOptions();
  }, []);

  const loadSelectOptions = async () => {
    const token = session?.access_token ?? "";
    const lista = await getSelectValues(
      FORM_DB_SELECT_OPTIONS.BUSINESS_LIST_BY_ROL,
      token
    );
    setBusinessList(
      lista.map((item) => ({
        value: item.shorthand ?? "",
        label: item.label,
        shorthand: item.shorthand ?? "",
      }))
    );
  };

  const loadGrowthPlan = async (businessProfile_id: string) => {
    console.log("businessProfile_id", businessProfile_id);
    const getGrowthPlan = appContainer.get<GetGrowthPlanUseCase>(
      USECASES_TYPES._GetGrowthPlanUseCase
    );

    const response = await getGrowthPlan.execute(businessProfile_id);
    if (response) {
      setNewGrowthPlan(false);
      setFieldValue("id", response.id);
      setFieldValue("growthPlan", response.growthPlan);
    } else {
      setNewGrowthPlan(true);
      setFieldValue("growthPlan", initialGrowthPlan.growthPlan);
    }
  };

  const onSubmit = async () => {
    if (newGrowthPlan) {
      const createGrowthPlan = appContainer.get<CreateGrowthPlanUseCase>(
        USECASES_TYPES._CreateGrowthPlanUseCase
      );

      const response = await createGrowthPlan.execute(values);
      if (!response) {
        toast.error(
          "Error al crear el plan de crecimiento. Inténtalo de nuevo más tarde."
        );
        return;
      }
      toast.success("Plan de crecimiento creado exitosamente.");
    } else {
      const updateGrowthPlan = appContainer.get<UpdateGrowthPlanUseCase>(
        USECASES_TYPES._UpdateGrowthPlanUseCase
      );
      const response = await updateGrowthPlan.execute(values);
      if (!response) {
        toast.error(
          "Error al actualizar el plan de crecimiento. Inténtalo de nuevo más tarde."
        );
        return;
      }
      toast.success("Plan de crecimiento actualizado exitosamente.");
    }
  };

  const { handleChange, values, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: initialGrowthPlan,
      onSubmit: onSubmit,
    });

  return (
    <div className="w-full">
      <MainTitle text="Plan de crecimiento" />
      <SecondaryText text="Este plan de crecimiento esta enfocado en desarrollar una estrategia de tres pilares que continue apoyando a la empresa en su plan de crecimiento en el marco del Programa de Sostenibilidad de COMFANDI" />
      <SectionSeparator className="mb-4" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center rounded-lg my-3 px-3"
      >
        <CustomSelectOne
          name="businessProfile_id"
          label="Empresa:"
          placeholder="Carnesanchez S.A."
          defaultValue={values.businessProfile_id}
          value={values.businessProfile_id}
          options={businessList ?? []}
          onChange={(e) => {
            setFieldValue("businessProfile_id", e.target.value);
            loadGrowthPlan(e.target.value);
          }}
        />

        <div className="w-full grid grid-cols-7 gap-3 mt-8 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
          <div>
            <div className="font-bold text-lg">Nombre</div>
            <div>Como se llama este pilar</div>
          </div>
          <div>
            <div className="font-bold text-lg">Visión </div>
            <div>
              ¿Cual es la visión mas elevada que puedes tener en este pilar
              estratégico?
            </div>
          </div>
          <div>
            <div className="font-bold text-lg">Propósito</div>
            <div>¿Por qué es importante esta visión, que logra impactar?</div>
          </div>
          <div>
            <div className="font-bold text-lg">Roles</div>
            <div>Qué roles son claves para alcanzar esta visión</div>
          </div>
          <div>
            <div className="font-bold text-lg">Retos</div>
            <div>
              ¿Cuáles son los tres retos estratégicos que se deben resolver para
              alcanzar esta visión?
            </div>
          </div>
          <div>
            <div className="font-bold text-lg">Recursos</div>
            <div>
              ¿Con que recursos cuento actualmente para alcanzar esta visión?
            </div>
          </div>
          <div>
            <div className="font-bold text-lg ">Resultados</div>
            <div>¿Cuáles son los resultados esperados a seis meses?</div>
          </div>
        </div>

        <div className="flex flex-col w-full rounded-b-lg">
          {values.growthPlan.map((pillar, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-7 gap-3 py-3 px-3 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10"
            >
              <CustomTextarea
                id={`growthPlan.${index}.Name`}
                name={`growthPlan.${index}.Name`}
                value={pillar.Name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escoge un nombre"
                ClassNameContainer="h-auto py-0 border-b border-principal-400"
                classNameTextArea="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
              />

              <CustomTextarea
                id={`growthPlan.${index}.Vision`}
                name={`growthPlan.${index}.Vision`}
                value={pillar.Vision}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe la visión"
                ClassNameContainer="h-auto py-0 border-b border-principal-400"
                classNameTextArea="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
              />

              <CustomTextarea
                id={`growthPlan.${index}.Purpose`}
                name={`growthPlan.${index}.Purpose`}
                value={pillar.Purpose}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe el propósito"
                ClassNameContainer="h-auto py-0 border-b border-principal-400"
                classNameTextArea="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
              />

              <CustomTextarea
                id={`growthPlan.${index}.Roles`}
                name={`growthPlan.${index}.Roles`}
                value={pillar.Roles}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe los roles"
                ClassNameContainer="h-auto py-0 border-b border-principal-400"
                classNameTextArea="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
              />

              <CustomTextarea
                id={`growthPlan.${index}.Challenges`}
                name={`growthPlan.${index}.Challenges`}
                value={pillar.Challenges}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe los retos"
                ClassNameContainer="h-auto py-0 border-b border-principal-400"
                classNameTextArea="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
              />

              <CustomTextarea
                id={`growthPlan.${index}.Resources`}
                name={`growthPlan.${index}.Resources`}
                value={pillar.Resources}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe los recursos"
                ClassNameContainer="h-auto py-0 border-b border-principal-400"
                classNameTextArea="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
              />

              <CustomTextarea
                id={`growthPlan.${index}.Results`}
                name={`growthPlan.${index}.Results`}
                value={pillar.Results}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe los resultados"
                ClassNameContainer="h-auto py-0 border-b border-principal-400"
                classNameTextArea="border-none bg-opacity-0 text-center resize-none min-h-40 h-full w-full flex items-center justify-center placeholder-opacity-60"
              />
            </div>
          ))}
          <div className="flex flex-row justify-between items-center gap-4 mt-5">
            <Button
              label="Seguimiento de indicadores"
              type="button"
              className="w-20 xl:w-60"
              onClick={() => {
                router.push("/Consultant/growth-plan/monitoring-growth-plan");
              }}
              primary
            />
            <Button
              label="Guardar información"
              type="submit"
              className="w-20 xl:w-60"
              primary
            />
          </div>
        </div>
      </form>
    </div>
  );
};

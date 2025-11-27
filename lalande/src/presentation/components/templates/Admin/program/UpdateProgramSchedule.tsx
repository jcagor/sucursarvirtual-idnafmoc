"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { ProgramType } from "domain/models/program/ProgramType";
import { ProgramScheduleType } from "domain/models/program/ProgramScheduleType";
import findAllProgramsUseCase from "domain/usecases/program/findAllPrograms.use.case";
import FindProgramScheduleUseCase from "domain/usecases/program/FindProgramSchedule.use.case";
import UpdateProgramScheduleUseCase from "domain/usecases/program/UpdateProgramSchedule.use.case";

import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { createProgramScheduleValidation } from "lib";

import {
  Button,
  CustomInputOne,
  CustomPriceInput,
  CustomSelectOne,
  CustomTextarea,
  DatePickerInput,
  MainTitle,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
} from "presentation";

let initialValues: ProgramScheduleType = {
  id: "",
  program_id: "",
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  description: "",
  value: "",
};

interface ProgramScheduleProps {
  id: string;
}

export const UpdateProgramSchedule: React.FC<ProgramScheduleProps> = ({
  id,
}) => {
  const router = useRouter();
  const [programs, setPrograms] = useState<ProgramType[]>([]);

  useEffect(() => {
    findAllPrograms();
    getSchedule(id);
  }, []);

  const getSchedule = async (id: string) => {
    const useCase = appContainer.get<FindProgramScheduleUseCase>(
      USECASES_TYPES._FindProgramSchedule
    );
    const response = await useCase.execute(id);
    if (response) {
      setValues(response);
    }
  };

  const findAllPrograms = async () => {
    const findAll = appContainer.get<findAllProgramsUseCase>(
      USECASES_TYPES._findAllPrograms
    );
    const response = await findAll.execute();

    if (!response) {
      toast.error("No se pudieron cargar los programas.");
      return;
    }

    setPrograms(response);
  };

  const onSubmit = async (values: ProgramScheduleType) => {
    const updateUseCase = appContainer.get<UpdateProgramScheduleUseCase>(
      USECASES_TYPES._UpdateProgramSchedule
    );
    const response = await updateUseCase.execute(values);
    if (!response) {
      toast.error("Error al actualizar el cronograma.");
      return;
    }
    toast.success("¡Cronograma actualizado!");
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    setValues,
    touched,
    handleBlur,
    submitCount,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createProgramScheduleValidation,
  });

  return (
    <div className="w-full md:w-11/12 xl:w-2/3">
      <MainTitle text="Editar cronograma" />
      <SecondaryText text="Modifica los datos del cronograma de entrenamiento." />
      <SectionSeparator />

      <form onSubmit={handleSubmit} className="flex flex-col mb-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <CustomSelectOne
            name="program_id"
            label="Programa"
            options={programs.map((program) => ({
              value: program.id,
              label: program.name,
            }))}
            value={values.program_id}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
            errors={
              (touched.program_id || submitCount > 0) && errors.program_id ? (
                <NeutralBlackText
                  text={errors.program_id}
                  className="text-principal-500"
                />
              ) : null
            }
          />
          <CustomInputOne
            name="name"
            title="Nombre"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.name || submitCount > 0) && errors.name ? (
                <NeutralBlackText
                  text={errors.name}
                  className="text-principal-500"
                />
              ) : null
            }
          />

          <DatePickerInput
            title="Fecha de inicio"
            value={values.startDate}
            onChange={(value) => setFieldValue("startDate", value)}
            inError={!!errors.startDate}
          />

          <DatePickerInput
            title="Fecha de fin"
            value={values.endDate}
            onChange={(value) => setFieldValue("endDate", value)}
            inError={!!errors.endDate}
          />
          <CustomPriceInput
            name="value"
            title="Tarifa"
            value={values.value}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.value || submitCount > 0) && errors.value ? (
                <NeutralBlackText
                  text={errors.value}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>

        <SecondaryText text="Describe el cronograma del programa." />
        <CustomTextarea
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="flex justify-between items-center mt-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Atrás
          </a>
          <Button
            type="submit"
            label="Actualizar"
            className="w-56 xl:w-72"
            primary
          />
        </div>
      </form>
    </div>
  );
};

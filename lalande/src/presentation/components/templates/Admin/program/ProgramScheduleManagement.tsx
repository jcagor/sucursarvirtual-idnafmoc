"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { ProgramType } from "domain/models/program/ProgramType";
import { ProgramScheduleType } from "domain/models/program/ProgramScheduleType";
import CreateProgramScheduleUseCase from "domain/usecases/program/CreateProgramSchedule.use.case";
import FindAllProgramScheduleByProgramUseCase from "domain/usecases/program/FindAllProgramScheduleByProgram.use.case";
import findAllProgramsUseCase from "domain/usecases/program/findAllPrograms.use.case";

import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

import {
  MainTitle,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
  Button,
  CustomInputOne,
  CustomTextarea,
  DatePickerInput,
  CustomSelectOne,
  CustomPriceInput,
} from "presentation";
import { createProgramScheduleValidation } from "lib";

const initialValues: ProgramScheduleType = {
  program_id: "",
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  description: "",
  value: "",
};

export const ProgramScheduleManagement = ({ id }: { id: string }) => {
  const [programs, setPrograms] = useState<ProgramType[]>([]);
  const [schedules, setSchedules] = useState<ProgramScheduleType[]>([]);

  useEffect(() => {
    findAllPrograms();
    getSchedules();
  }, []);

  const getSchedules = async () => {
    const useCase = appContainer.get<FindAllProgramScheduleByProgramUseCase>(
      USECASES_TYPES._FindAllProgramSchedulesByProgram
    );
    const response = await useCase.execute(id);
    if (response) {
      setSchedules(response);
    }
  };

  const onSubmit = async (values: ProgramScheduleType) => {
    const createSchedule = appContainer.get<CreateProgramScheduleUseCase>(
      USECASES_TYPES._CreateProgramSchedule
    );

    const response = await createSchedule.execute(values);
    if (!response) {
      toast.error("No se pudo crear el cronograma.");
      return;
    }
    toast.success("¡Cronograma creado correctamente!");
    getSchedules();
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
    setFieldValue("program_id", id);
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    touched,
    handleBlur,
    submitCount,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createProgramScheduleValidation,
  });

  return (
    <>
      <div className="w-full md:w-11/12 xl:w-2/3">
        <div className="flex justify-between items-center mb-2 md:mb-7 md:-mt-3">
          <div>
            <MainTitle text="Gestión de cronogramas" />
            <SecondaryText text="Crea y administra cronogramas para programas de entrenamiento." />
          </div>
        </div>

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

          <SecondaryText text="Describe el programa y los resultados esperados." />
          <CustomTextarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Button
            type="submit"
            label="Crear"
            className="w-56 xl:w-72 mt-5"
            primary
          />
        </form>

        <SectionSeparator />

        <div className="text-xl font-bold mt-5 mb-4 text-principal-180">
          Listado de cronogramas
        </div>

        <div className="w-full">
          <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-1 px-8">
            <div className="w-full grid grid-cols-5 gap-1 items-center text-center text-principal-350 font-bold border-b-2 border-principal-450/20 py-2">
              <div>Nombre</div>
              <div>Fecha de inicio</div>
              <div>Fecha de fin</div>
              <div>Sesiones</div>
              <div>Cronograma</div>
            </div>
            <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full">
              {schedules.map((schedule) => (
                <div
                  key={schedule.program_id}
                  className="grid grid-cols-5 gap-1 text-center text-principal-450 py-2"
                >
                  <div>{schedule.name}</div>
                  <div>{new Date(schedule.startDate).toLocaleDateString()}</div>
                  <div>{new Date(schedule.endDate).toLocaleDateString()}</div>
                  <div className="flex justify-center gap-2">
                    <span>Administrar</span>
                    <a
                      href={`/lalande/admin/program/session-management/${schedule.id}`}
                    >
                      <Image
                        src="/lalande/icons/edit-icon.svg"
                        alt="Editar cronograma"
                        width={20}
                        height={20}
                      />
                    </a>
                  </div>
                  <div className="flex justify-center gap-2">
                    <span>Editar</span>
                    <a
                      href={`/lalande/admin/program/schedule-management/update/${schedule.id}`}
                    >
                      <Image
                        src="/lalande/icons/edit-icon.svg"
                        alt="Editar cronograma"
                        width={20}
                        height={20}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

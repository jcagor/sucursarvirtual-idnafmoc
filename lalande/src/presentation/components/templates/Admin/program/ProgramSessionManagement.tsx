"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { ProgramScheduleType } from "domain/models/program/ProgramScheduleType";
import { ProgramSessionType } from "domain/models/program/ProgramSessionType";
import CreateProgramSessionUseCase from "domain/usecases/program/CreateProgramSession.use.case";
import FindProgramScheduleUseCase from "domain/usecases/program/FindProgramSchedule.use.case";
import FindAllProgramSessionsByScheduleUseCase from "domain/usecases/program/FindAllProgramSessionsBySchedule.use.case";

import { createProgramSessionValidation } from "lib";

import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

import {
  MainTitle,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
  Button,
  CustomInputOne,
  DatePickerInput,
  CustomSelectOne,
} from "presentation";

const initialValues: ProgramSessionType = {
  programSchedule_id: "",
  name: "",
  typeSession: "",
  endDate: new Date(),
  value: "",
};

export const ProgramSessionManagement = ({ id }: { id: string }) => {
  const [schedule, setSchedule] = useState<ProgramScheduleType | null>(null);
  const [sessions, setSessions] = useState<ProgramSessionType[]>([]);

  useEffect(() => {
    findSchedule(id);
    getSessions();
  }, []);

  const getSessions = async () => {
    const useCase = appContainer.get<FindAllProgramSessionsByScheduleUseCase>(
      USECASES_TYPES._FindAllProgramSessionsBySchedule
    );
    const response = await useCase.execute(id);
    if (response) {
      setSessions(response);
    }
  };

  const findSchedule = async (id: string) => {
    const useCase = appContainer.get<FindProgramScheduleUseCase>(
      USECASES_TYPES._FindProgramSchedule
    );
    const response = await useCase.execute(id);
    if (response) {
      setSchedule(response);
      setFieldValue("programSchedule_id", response.id);
    }
  };

  const onSubmit = async (values: ProgramSessionType) => {
    const createSession = appContainer.get<CreateProgramSessionUseCase>(
      USECASES_TYPES._CreateProgramSession
    );

    const response = await createSession.execute(values);
    if (!response) {
      toast.error("No se pudo crear la sesión.");
      return;
    }
    toast.success("¡Sesión creada correctamente!");
    getSessions();
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
    validationSchema: createProgramSessionValidation,
  });

  return (
    <>
      <div className="w-full md:w-11/12 xl:w-2/3">
        <div className="flex justify-between items-center mb-2 md:mb-7 md:-mt-3">
          <div>
            <MainTitle text="Gestión de sesiones" />
            <SecondaryText text="Crea y administra sesiones de cronogramas de entrenamiento." />
          </div>
        </div>

        <SectionSeparator />

        <form onSubmit={handleSubmit} className="flex flex-col mb-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <CustomSelectOne
              name="programSchedule_id"
              label="Cronograma"
              options={
                schedule
                  ? [{ value: schedule.id ?? "", label: schedule.name }]
                  : []
              }
              value={values.programSchedule_id}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled
              errors={
                (touched.programSchedule_id || submitCount > 0) &&
                errors.programSchedule_id ? (
                  <NeutralBlackText
                    text={errors.programSchedule_id}
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
            <CustomInputOne
              name="typeSession"
              title="Tipo de sesión"
              value={values.typeSession}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.typeSession || submitCount > 0) &&
                errors.typeSession ? (
                  <NeutralBlackText
                    text={errors.typeSession}
                    className="text-principal-500"
                  />
                ) : null
              }
            />
            <DatePickerInput
              title="Fecha de fin"
              value={values.endDate}
              onChange={(value) => setFieldValue("endDate", value)}
              inError={!!errors.endDate}
            />
            <CustomInputOne
              name="value"
              title="Valor"
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.value || submitCount > 0) && errors.value ? (
                  <NeutralBlackText
                    text={errors.value}
                    className="text-principal-500"
                  />
                ) : null
              }
            />
          </div>

          <Button
            type="submit"
            label="Crear"
            className="w-56 xl:w-72 mt-5"
            primary
          />
        </form>

        <SectionSeparator />

        <div className="text-xl font-bold mt-5 mb-4 text-principal-180">
          Listado de sesiones
        </div>

        <div className="w-full">
          <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-1 px-8">
            <div className="w-full grid grid-cols-5 gap-1 items-center text-center text-principal-350 font-bold border-b-2 border-principal-450/20 py-2">
              <div>Nombre</div>
              <div>Tipo</div>
              <div>Valor</div>
              <div>Fecha limite</div>
              <div>Acciones</div>
            </div>
            <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="grid grid-cols-5 gap-1 text-center text-principal-450 py-2"
                >
                  <div>{session.name}</div>
                  <div>{session.typeSession}</div>
                  <div>{session.value}</div>
                  <div>{new Date(session.endDate).toLocaleDateString()}</div>
                  <div className="flex justify-center gap-2">
                    <span>Editar</span>
                    <a
                      href={`/lalande/admin/program/session-management/update/${session.id}`}
                    >
                      <Image
                        src="/lalande/icons/edit-icon.svg"
                        alt="Editar sesión"
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

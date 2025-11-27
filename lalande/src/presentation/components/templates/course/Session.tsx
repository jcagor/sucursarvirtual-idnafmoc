"use client";

import { Update } from "@reduxjs/toolkit";
import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import { CourseSessionType } from "domain/models/course/CourseSessionType";
import FindScheduleBySessionUseCase from "domain/usecases/course/FindScheduleBySession.use.case";
import FindSessionUseCase from "domain/usecases/course/FindSession.use.case";
import UpdateSessionUseCase from "domain/usecases/course/UpdateSession.use.case";
import { useFormik } from "formik";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { createSessionValidation, INPUT_SELECT_COURSE_TYPE_SESSION } from "lib";
import { useSession } from "next-auth/react";
import {
  Button,
  CardCourseSchedule,
  CustomInputOne,
  CustomSelectOne,
  DatePickerInput,
  MainTitle,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
} from "presentation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface SessionProps {
  session_id: string;
}

let initialValues: CourseSessionType = {
  schedule_id: "",
  name: "",
  typeSession: "",
  startTime: "",
  endTime: "",
  date: new Date(),
};

export const Session: React.FC<SessionProps> = ({ session_id }) => {
  const { data: session } = useSession();
  const [schedule, setSchedule] = useState<CourseScheduleType>();

  useEffect(() => {
    getSession();
    getScheduleBySession();
  }, []);

  const getScheduleBySession = async () => {
    const schedule = appContainer.get<FindScheduleBySessionUseCase>(
      USECASES_TYPES._FindScheduleBySessionUseCase
    );
    const response = await schedule.execute(session_id, session?.access_token);
    if (response) {
      setSchedule(response);
    }
  };

  const getSession = async () => {
    const getSession = appContainer.get<FindSessionUseCase>(
      USECASES_TYPES._FindSessionUseCase
    );
    const response = await getSession.execute(
      session_id,
      session?.access_token
    );
    if (response) {
      setValues(response);
    }
  };

  const onSubmit = async (values: CourseSessionType) => {
    values.id = session_id;
    const updateSession = appContainer.get<UpdateSessionUseCase>(
      USECASES_TYPES._UpdateSessionUseCase
    );
    const response = await updateSession.execute(values, session?.access_token);
    if (!response) {
      return;
    }
    toast.success("¡Sesion actualizada correctamente!");
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
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: createSessionValidation,
  });

  return (
    <div>
      <div className="w-full md:w-11/12 xl:w-2/3">
        <MainTitle text="Gestión de sesiones" />
        <SecondaryText text="Administra y actualiza las sesiones de entrenamiento." />
        <SectionSeparator />

        <div className="pt-4 pb-8">
          {schedule && (
            <CardCourseSchedule
              name={schedule.name}
              ImageUrl={"/lalande/img/CourseSchedule.jpg"}
              startDate={new Date(schedule.startDate).toLocaleDateString()}
              endDate={new Date(schedule.endDate).toLocaleDateString()}
              modality={schedule.modality}
              typeUser={schedule.typeUser}
              sessions={"1"}
            />
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col mb-10">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <CustomInputOne
              name="name"
              title="Nombre de la Sesión"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.name || submitCount > 0) && errors.name ? (
                  <NeutralBlackText
                    text={errors.name}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              name="typeSession"
              label="Tipo de Sesión"
              options={INPUT_SELECT_COURSE_TYPE_SESSION.map((item) => item)}
              value={values.typeSession}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.typeSession || submitCount > 0) &&
                errors.typeSession ? (
                  <NeutralBlackText
                    text={errors.typeSession}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              name="startTime"
              title="Hora de inicio"
              type="time"
              value={values.startTime}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.startTime || submitCount > 0) && errors.startTime ? (
                  <NeutralBlackText
                    text={errors.startTime}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              name="endTime"
              title="Hora de fin"
              type="time"
              value={values.endTime}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.endTime || submitCount > 0) && errors.endTime ? (
                  <NeutralBlackText
                    text={errors.endTime}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <DatePickerInput
              title="Fecha"
              value={values.date}
              onChange={(value) => {
                setFieldValue("date", value);
              }}
              inError={errors.date ? true : false}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <a
              href={`/lalande/admin/course/session-management/${schedule?.id}`}
            >
              Atrás
            </a>
            <Button
              type="submit"
              label="Actualizar"
              className="w-56 xl:w-72 self-end my-6"
              primary
            />
          </div>
        </form>
      </div>
    </div>
  );
};

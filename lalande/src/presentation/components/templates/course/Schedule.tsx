"use client";

import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import FindScheduleUseCase from "domain/usecases/course/FindSchedule.use.case";
import UpdateScheduleUseCase from "domain/usecases/course/UpdateSchedule.use.case";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { useFormik } from "formik";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import {
  createScheduleValidation,
  INPUT_SELECT_COURSE_MODALITY,
  INPUT_SELECT_COURSE_SUPPLIER,
  INPUT_SELECT_COURSE_TYPE_USER,
  SelectOption,
} from "lib";
import { useSession } from "next-auth/react";
import {
  Button,
  CustomInputOne,
  CustomSelectOne,
  CustomTextarea,
  DatePickerInput,
  MainTitle,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
} from "presentation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

let initialValues: CourseScheduleType = {
  course_id: "",
  name: "",
  modality: "",
  startDate: new Date(),
  endDate: new Date(),
  typeUser: "",
  supplier: "",
  description: "",
};

interface ScheduleProps {
  id: string;
}

export const Schedule: React.FC<ScheduleProps> = ({ id }) => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<SelectOption[]>([]);

  useEffect(() => {
    getOpcionsCourse();
    getSchedule(id);
  }, []);

  const getOpcionsCourse = async () => {
    const getOptionsBusiness = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const SelectOptionName = "COURSES_LIST";
    const response = await getOptionsBusiness.execute(
      SelectOptionName,
      session?.access_token
    );
    if (response) {
      setCourses(response);
    }
  };

  const getSchedule = async (id: string) => {
    const schedules = appContainer.get<FindScheduleUseCase>(
      USECASES_TYPES._FindSchedule
    );
    const response = await schedules.execute(id, session?.access_token);
    if (response) {
      setValues(response);
    }
  };

  const onSubmit = async (values: CourseScheduleType) => {
    values.id = id;
    const createSchedule = appContainer.get<UpdateScheduleUseCase>(
      USECASES_TYPES._UpdateSchedule
    );
    const response = await createSchedule.execute(
      values,
      session?.access_token
    );
    if (!response) {
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
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: createScheduleValidation,
  });

  return (
    <div>
      <div className="w-full md:w-11/12 xl:w-2/3">
        <MainTitle text="Gestión de cronogramas" />
        <SecondaryText text="Crea y administra los cronogramas de entrenamiento." />
        <SectionSeparator />

        <form onSubmit={handleSubmit} className="flex flex-col mb-10">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <CustomSelectOne
              name="course_id"
              label="Entrenamiento"
              options={courses}
              value={values.course_id}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.course_id || submitCount > 0) && errors.course_id ? (
                  <NeutralBlackText
                    text={errors.course_id}
                    className="text-principal-500"
                  ></NeutralBlackText>
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
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectOne
              name="modality"
              label="Modalidad"
              options={INPUT_SELECT_COURSE_MODALITY.map((item) => item)}
              value={values.modality}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.modality || submitCount > 0) && errors.modality ? (
                  <NeutralBlackText
                    text={errors.modality}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <DatePickerInput
              title="Fecha de inicio"
              value={values.startDate}
              onChange={(value) => {
                setFieldValue("startDate", value);
              }}
              inError={errors.startDate ? true : false}
            />
            <DatePickerInput
              title="Fecha de fin"
              value={values.endDate}
              onChange={(value) => setFieldValue("endDate", value)}
              inError={errors.endDate ? true : false}
            />
            <CustomSelectOne
              name="typeUser"
              label="Tipo de usuario"
              options={INPUT_SELECT_COURSE_TYPE_USER.map((item) => item)}
              value={values.typeUser}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.typeUser || submitCount > 0) && errors.typeUser ? (
                  <NeutralBlackText
                    text={errors.typeUser}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              name="supplier"
              label="Proveedor"
              options={INPUT_SELECT_COURSE_SUPPLIER.map((item) => item)}
              value={values.supplier}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={
                (touched.supplier || submitCount > 0) && errors.supplier ? (
                  <NeutralBlackText
                    text={errors.supplier}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>

          <SecondaryText text="Proporciona una descripción general del entrenamiento, incluyendo los temas principales y habilidades que los participantes desarrollarán." />
          <CustomTextarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="flex flex-row justify-between items-center">
            <a href="/lalande/admin/course/schedule-management">Atrás</a>
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

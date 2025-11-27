"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { ProgramScheduleType } from "domain/models/program/ProgramScheduleType";
import { ProgramSessionType } from "domain/models/program/ProgramSessionType";
import FindProgramScheduleUseCase from "domain/usecases/program/FindProgramSchedule.use.case";
import FindProgramSessionUseCase from "domain/usecases/program/FindProgramSession.use.case";
import UpdateProgramSessionUseCase from "domain/usecases/program/UpdateProgramSession.use.case";

import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { createProgramSessionValidation } from "lib";

import {
  Button,
  CustomInputOne,
  CustomSelectOne,
  DatePickerInput,
  MainTitle,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
} from "presentation";

const initialValues: ProgramSessionType = {
  id: "",
  programSchedule_id: "",
  name: "",
  typeSession: "",
  endDate: new Date(),
  value: "",
};

interface ProgramSessionProps {
  id: string;
}

export const UpdateProgramSession: React.FC<ProgramSessionProps> = ({ id }) => {
  const [schedule, setSchedule] = useState<ProgramScheduleType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await getSession(id);
      if (values.programSchedule_id) {
        findSchedule(values.programSchedule_id);
      }
    };
    fetchData();
  }, []);

  const getSession = async (id: string) => {
    const useCase = appContainer.get<FindProgramSessionUseCase>(
      USECASES_TYPES._FindProgramSession
    );
    const response = await useCase.execute(id);
    if (response) {
      setValues(response);
    }
  };

  const findSchedule = async (id: string) => {
    const useCase = appContainer.get<FindProgramScheduleUseCase>(
      USECASES_TYPES._FindProgramSchedule
    );
    const response = await useCase.execute(id);
    if (response) {
      setSchedule(response);
    }
  };

  const onSubmit = async (values: ProgramSessionType) => {
    const updateUseCase = appContainer.get<UpdateProgramSessionUseCase>(
      USECASES_TYPES._UpdateProgramSession
    );
    const response = await updateUseCase.execute(values);
    if (!response) {
      toast.error("Error al actualizar la sesión.");
      return;
    }
    toast.success("¡Sesión actualizada!");
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
    validationSchema: createProgramSessionValidation,
  });

  return (
    <div className="w-full md:w-11/12 xl:w-2/3">
      <MainTitle text="Editar sesión" />
      <SecondaryText text="Modifica los datos de la sesión del cronograma." />
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
              (touched.typeSession || submitCount > 0) && errors.typeSession ? (
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

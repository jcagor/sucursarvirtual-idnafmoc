"use client";

import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import { CourseSessionType } from "domain/models/course/CourseSessionType";
import BulkSesionLoadingUseCase from "domain/usecases/course/BulkSesionLoading.use.case";
import CreateSessionUseCase from "domain/usecases/course/CreateSession.use.case";
import FindAllSessionByScheduleUseCase from "domain/usecases/course/FindAllSessionBySchedule.use.case";
import FindScheduleUseCase from "domain/usecases/course/FindSchedule.use.case";
import { useFormik } from "formik";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { createSessionValidation, INPUT_SELECT_COURSE_TYPE_SESSION } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Button,
  CardCourseSchedule,
  CustomInputOne,
  CustomSelectOne,
  DatePickerInput,
  FileInput,
  MainTitle,
  ModalWithChildren,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
} from "presentation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface SessionManagementProps {
  schedule_id: string;
}

export const SessionManagement: React.FC<SessionManagementProps> = ({
  schedule_id,
}) => {
  const { data: session } = useSession();
  const [schedule, setSchedule] = useState<CourseScheduleType>();
  const [sessions, setSessions] = useState<CourseSessionType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  let initialValues: CourseSessionType = {
    schedule_id: schedule_id,
    name: "",
    typeSession: "",
    startTime: "",
    endTime: "",
    date: new Date(),
  };

  useEffect(() => {
    getSchedule();
    getSessions();
  }, []);

  const getSchedule = async () => {
    const schedule = appContainer.get<FindScheduleUseCase>(
      USECASES_TYPES._FindSchedule
    );
    const response = await schedule.execute(schedule_id, session?.access_token);
    if (response) {
      setSchedule(response);
    }
  };

  const getSessions = async () => {
    const getSessions = appContainer.get<FindAllSessionByScheduleUseCase>(
      USECASES_TYPES._FindAllSessionByScheduleUseCase
    );
    const response = await getSessions.execute(
      schedule_id,
      session?.access_token
    );
    if (response) {
      setSessions(response);
    }
  };

  const onSubmit = async (values: CourseSessionType) => {
    const createSchedule = appContainer.get<CreateSessionUseCase>(
      USECASES_TYPES._CreateSessionUseCase
    );
    const response = await createSchedule.execute(
      values,
      session?.access_token
    );
    if (!response) {
      return;
    }
    toast.success("¡Sesion creado correctamente!");
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
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: createSessionValidation,
  });

  const handleBulkLoading = async () => {
    if (!file) {
      toast.error("Por favor, selecciona un archivo para cargar.");
      return;
    }

    const bulkSesionLoading = appContainer.get<BulkSesionLoadingUseCase>(
      USECASES_TYPES._BulkSesionLoading
    );

    const response: any = await bulkSesionLoading.execute(file);
    if (response?.error) {
      toast.error(response.message || "Error al cargar las sesiones.", {
        autoClose: 6000,
      });
    } else {
      toast.success("¡Sesiones cargadas correctamente!");
      await getSessions();
    }
    setOpenModal(false);
    setFile(null);
  };

  const handleDownloadTemplate = () => {
    const fileUrl = "/lalande/templates/Plantilla_carga_sesiones.xlsx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Plantilla_carga_sesiones.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        <div className="w-full md:w-11/12 2xl:w-2/3">
          <div className="flex justify-between items-center mb-2 md:mb-7 md:-mt-3">
            <div>
              <MainTitle text="Gestión de sesiones" />
              <SecondaryText text="Administra y actualiza las sesiones de entrenamiento." />
            </div>
            <Button
              label="Carga masiva de sesiones"
              className="w-80"
              primary
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </div>

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

              <Button
                type="submit"
                label="Crear"
                className="w-56 xl:w-72 mt-5"
                primary
              />
            </div>
          </form>
        </div>

        <SectionSeparator />

        <div className="text-xl font-bold mt-5 mb-4 text-principal-180">
          Listado de cronogramas
        </div>

        <div className="w-full lg:w-11/12 mb-10 overflow-x-auto">
          <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-1 px-2 2xl:px-8 relative overflow-x-auto min-w-[600px] text-xs lg:text-sm 2xl:text-base">
            <div className="w-full grid grid-cols-6 gap-1 items-center justify-center text-center text-principal-350 font-bold rounded-t-lg py-2 border-b-[2px] border-principal-450/20">
              <div>Nombre de la sesión</div>
              <div>Tipo de sesión</div>
              <div>Hora de inicio</div>
              <div>Hora de fin</div>
              <div>Fecha</div>
              <div>Acción</div>
            </div>
            <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full rounded-b-lg">
              {sessions.map((session, index) => (
                <div
                  key={session.id}
                  className="w-full grid grid-cols-6 gap-1 items-center justify-center text-center text-principal-450 py-2"
                >
                  <div>{session.name}</div>
                  <div>{session.typeSession}</div>
                  <div>{session.startTime}</div>
                  <div>{session.endTime}</div>
                  <div>{new Date(session.date).toLocaleDateString()}</div>
                  <div className="flex items-center justify-center gap-2">
                    <span>Editar</span>
                    <a
                      href={`/lalande/admin/course/session-management/session/${session.id}`}
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
      {openModal && (
        <ModalWithChildren
          onClose={() => setOpenModal(false)}
          className={`w-[400px] lg:w-[500px] rounded-[20px] flex flex-col gap-5 items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/lalande/icons/excel_icon.svg"
            alt="Close icon"
            width={80}
            height={80}
            priority
          />
          <h4 className="font-outfit text-[1rem] text-center font-semibold mb-2 pt-6 text-principal-180 mt-2">
            ¡Selecciona el archivo excel de los cronogramas!
          </h4>
          <FileInput file={file} setFile={setFile} acceptedFileTypes=".xlsx" />
          <div className="flex flex-grow w-full justify-between gap-14 lg:gap-8 py-2">
            <Button
              label="Descarga plantilla"
              onClick={() => handleDownloadTemplate()}
              primary
            />
            <Button
              label="Continuar"
              onClick={handleBulkLoading}
              className="w-full"
              primary
            />
          </div>
        </ModalWithChildren>
      )}
    </>
  );
};

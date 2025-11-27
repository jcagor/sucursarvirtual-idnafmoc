"use client";

import { CourseScheduleType } from "domain/models/course/CourseScheduleType";
import BulkScheduleLoadingUseCase from "domain/usecases/course/BulkScheduleLoading.use.case";
import CreateScheduleUseCase from "domain/usecases/course/CreateSchedule.use.case";
import FindAllScheduleUseCase from "domain/usecases/course/FindAllSchedule.use.case";
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
import Image from "next/image";
import {
  Button,
  CustomInputOne,
  CustomPriceInput,
  CustomSelectOne,
  CustomTextarea,
  DatePickerInput,
  FileInput,
  MainTitle,
  ModalWithChildren,
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
  id_regional: "",
  cost: 0,
  accessType: "",
  description: "",
};

export const ScheduleManagement = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [regionals, setRegionals] = useState<SelectOption[]>([]);
  const [coursesAccessType, setCoursesAccessType] = useState<SelectOption[]>(
    []
  );
  const [schedules, setSchedules] = useState<CourseScheduleType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    getOpcionsCourse();
    getOpcionsCourseRegional();
    getOpcionsCourseAccessType();
    getSchedules();
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

  const getOpcionsCourseRegional = async () => {
    const getOptionsBusiness = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const SelectOptionName = "REGIONAL_LIST";
    const response = await getOptionsBusiness.execute(
      SelectOptionName,
      session?.access_token
    );
    if (response) {
      setRegionals(response);
    }
  };

  const getOpcionsCourseAccessType = async () => {
    const getOptionsBusiness = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const SelectOptionName = "COURSE_ACCESS_TYPE_LIST";
    const response = await getOptionsBusiness.execute(
      SelectOptionName,
      session?.access_token
    );
    if (response) {
      setCoursesAccessType(response);
    }
  };

  const getSchedules = async () => {
    const schedules = appContainer.get<FindAllScheduleUseCase>(
      USECASES_TYPES._FindAllSchedules
    );
    const response = await schedules.execute(session?.access_token);
    if (response) {
      setSchedules(response);
    }
  };

  const onSubmit = async (values: CourseScheduleType) => {
    const createSchedule = appContainer.get<CreateScheduleUseCase>(
      USECASES_TYPES._CreateSchedule
    );

    const response = await createSchedule.execute(
      values,
      session?.access_token
    );
    if (!response) {
      toast.error("No se pudo crear el cronograma.");
      return;
    }
    toast.success("¡Cronograma creado correctamente!");
    getSchedules();
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
    validationSchema: createScheduleValidation,
  });

  const handleBulkLoading = async () => {
    if (!file) {
      toast.error("Por favor, selecciona un archivo para cargar.");
      return;
    }

    const bulkScheduleLoading = appContainer.get<BulkScheduleLoadingUseCase>(
      USECASES_TYPES._BulkScheduleLoading
    );

    const response: any = await bulkScheduleLoading.execute(file);
    if (response?.error) {
      toast.error(response.message || "Error al cargar los cronogramas.", {
        autoClose: 6000,
      });
    } else {
      toast.success("¡Cronogramas cargados correctamente!");
      await getSchedules();
    }
    setOpenModal(false);
    setFile(null);
  };

  const handleDownloadTemplate = () => {
    const fileUrl = "/lalande/templates/Plantilla_carga_cronogramas.xlsx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Plantilla_carga_cronogramas.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div>
        <div className="w-full md:w-11/12 2xl:w-2/3">
          <div className="flex justify-between items-center mb-2">
            <div>
              <MainTitle text="Gestión de cronogramas" />
              <SecondaryText text="Crea y administra los cronogramas de entrenamiento." />
            </div>
            <Button
              label="Carga masiva de cronogramas"
              className="w-80"
              primary
              onClick={() => {
                setOpenModal(true);
              }}
            />
          </div>

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
              <CustomSelectOne
                name="id_regional"
                label="Regional"
                options={regionals.map((item) => item)}
                value={values.id_regional}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  (touched.id_regional || submitCount > 0) &&
                  errors.id_regional ? (
                    <NeutralBlackText
                      text={errors.id_regional}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
              <CustomPriceInput
                name="cost"
                title="Tarifa"
                value={values.cost}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  (touched.cost || submitCount > 0) && errors.cost ? (
                    <NeutralBlackText
                      text={errors.cost}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
              <CustomSelectOne
                name="accessType"
                label="Tipo de acceso"
                options={coursesAccessType.map((item) => item)}
                value={values.accessType}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={
                  (touched.accessType || submitCount > 0) &&
                  errors.accessType ? (
                    <NeutralBlackText
                      text={errors.accessType}
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
            <Button
              type="submit"
              label="Crear"
              className="w-56 xl:w-72 mt-5"
              primary
            />
          </form>
        </div>

        <SectionSeparator />

        <div className="text-xl font-bold mt-5 mb-4 text-principal-180">
          Listado de cronogramas
        </div>

        <div className="w-full lg:w-11/12 mb-10 overflow-x-auto">
          <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-1 px-2 2xl:px-8 relative overflow-x-auto min-w-[1000px] text-xs lg:text-sm 2xl:text-base">
            <div className="w-full grid grid-cols-9 gap-1 items-center justify-center text-center text-principal-350 font-bold rounded-t-lg py-2 border-b-[2px] border-principal-450/20">
              <div>Entrenamiento</div>
              <div>Fecha de inicio</div>
              <div>Fecha de fin</div>
              <div>Tipo de usuario</div>
              <div>Modalidad</div>
              <div>Estado</div>
              <div>Empresas Autorizadas</div>
              <div>Sesiones</div>
              <div>Cronograma</div>
            </div>
            <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full rounded-b-lg">
              {schedules.map((schedule, index) => (
                <div
                  key={schedule.id}
                  className="w-full grid grid-cols-9 gap-1 items-center justify-center text-center text-principal-450 py-2"
                >
                  <div>{schedule.name}</div>
                  <div>{new Date(schedule.startDate).toLocaleDateString()}</div>
                  <div>{new Date(schedule.endDate).toLocaleDateString()}</div>
                  <div>{schedule.typeUser}</div>
                  <div>{schedule.modality}</div>
                  <div>Activo</div>
                  <div>
                    {schedule.accessType === "OPEN" ? (
                      <div className="flex items-center justify-center gap-2">
                        <span>Administrar</span>
                        <a
                          href={`/lalande/admin/course/business-Authorized-by-schedule/${schedule.id}`}
                        >
                          <Image
                            src="/lalande/icons/edit-icon.svg"
                            alt="Editar sesiones"
                            width={20}
                            height={20}
                          />
                        </a>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>Administrar</span>
                    <a
                      href={`/lalande/admin/course/session-management/${schedule.id}`}
                    >
                      <Image
                        src="/lalande/icons/edit-icon.svg"
                        alt="Editar sesiones"
                        width={20}
                        height={20}
                      />
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>Editar</span>
                    <a
                      href={`/lalande/admin/course/schedule-management/${schedule.id}`}
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

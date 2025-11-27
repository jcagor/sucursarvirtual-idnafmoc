"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { useFormik } from "formik";
import {
  Button,
  CustomInputOne,
  CustomSelectGray,
  CustomSelectOne,
  CustomTextarea,
  DatePickerGrayInput,
  FileDropZoneInput,
  MainTitle,
  NeutralBlackText,
  NeutralNCText,
  SecondaryText,
  SectionSeparator,
  TimePikerGray,
} from "presentation/components/atoms";
import { FormValidations } from "./validations";
import {
  TextDateRowsInput,
  TextRowsInput,
} from "presentation/components/molecules";
import { DualSignForm } from "presentation/components/organisms";
import { Suspense, useCallback, useEffect, useState } from "react";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import SaveAssistanceRecordFormUseCase from "domain/usecases/techAssistance/techAssistance.usecase";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addAlert } from "presentation/store/slices/alertSlice";

export const TechAssistanceCertTemplate = () => {
  const { data: session } = useSession();
  const [appointmentId, setAppointmentId] = useState("");

  // Router
  const router = useRouter();

  // Environment dispatch for alerts
  const dispatch = useDispatch();

  const _setAppointmentId = (appointment: string) => {
    console.log("AppointmentId setter:", appointment);
    setAppointmentId(appointment);
  };

  const previousSteep = () => {
    router.push("/tech-record-sign");
  };

  const SearchUrlParams = () => {
    // URL PARAMS
    const searchParams = useSearchParams();

    const appointment = searchParams.get("aId");
    console.log("Appointment:", appointment);

    if (appointment && appointment != "") {
      _setAppointmentId(appointment);
    } else {
      console.error("Can't read the appointment ID", appointment);
      alert(
        "error",
        "No se pudo guardar la información, intenta de nuevo mas tarde"
      );
    }
    return <></>;
  };

  // FORM Functions
  const initialValues = {
    appointmentId: "",
    assistance: "",
    businessName: "",
    operator: "",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    interventionTime: "12:00 PM",
    date: "",
    assignedConsultor: "",
    program: "",
    assistant: "",
    sessionScope: "",
    evidence: new Array(),
    signOneName: "",
    signTwoName: "",
    signOneDocument: "",
    signTwoDocument: "",
    signOneEvidence: [],
    signTwoEvidence: [],
  };

  const alert = (
    level: "success" | "error" | "warning" | "info",
    alertMsg: string
  ) => {
    dispatch(
      addAlert({
        message: alertMsg,
        type: level,
      })
    );
  };

  const onSubmit = async (information: any) => {
    const token = session?.access_token ? session?.access_token : "";
    console.log("Form Data:", information);

    const saveResumeInformation =
      appContainer.get<SaveAssistanceRecordFormUseCase>(
        USECASES_TYPES._SaveAssistanceRecordFormUseCase
      );

    const response = await saveResumeInformation.execute(information, token);
    if (response) {
      console.log("Response Form: ", response);
      router.push("Consultant/schedule");
    } else {
      console.error("Error al guardar la certificación:", response);
    }
    //return;
  };

  const validationSchema = new FormValidations().getTechCertFormValidation();

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    setFieldValue("appointmentId", appointmentId);
  }, [appointmentId]);

  useEffect(() => {
    console.log("FORMIK errors: ", errors);
  }, [errors]);

  return (
    <div className="w_full md:w-11/12 xl:w-2/3">
      <MainTitle text="Acta de asistencia técnica." />
      <SecondaryText text={new Date().getFullYear().toString()} />
      <SectionSeparator />

      <form onSubmit={handleSubmit}>
        <Suspense>
          <SearchUrlParams />
        </Suspense>

        <input
          name="appointmentId"
          type="hidden"
          value={values.appointmentId}
          onChange={handleChange}
        />

        <div className="flex flex-row items-center my-4">
          <TertiaryTitle
            text="Información de la Intervención "
            className="ml-3"
          />
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomSelectGray
            name="assistance"
            label="¿Cómo asistirás?"
            placeholder=""
            defaultValue={values.assistance}
            value={values.assistance}
            options={
              [
                { value: "1", label: "Presencial" },
                { value: "2", label: "virtual" },
              ]
              /*(cities ?? []).map((assistance) => ({
                    label: assistance.name,
                    value: assistance.name,
                  }))*/
            }
            onChange={handleChange}
            errors={
              errors.assistance ? (
                <NeutralBlackText
                  text={errors.assistance}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="businessName"
            id="businessName"
            title="Razón Social"
            type="text"
            placeholder=""
            value={values.businessName}
            onChange={handleChange}
            errors={
              errors.businessName ? (
                <NeutralBlackText
                  text={errors.businessName}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="operator"
            id="operator"
            title="Operador"
            type="text"
            placeholder=""
            value={values.operator}
            onChange={handleChange}
            errors={
              errors.operator ? (
                <NeutralBlackText
                  text={errors.operator}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <TimePikerGray
            name="startTime"
            id="startTime"
            title="Horas de inicio"
            placeholder=""
            formValue={values.startTime}
            onValueUpdate={setFieldValue}
            errors={
              errors.startTime ? (
                <NeutralBlackText
                  text={errors.startTime}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          {/**
          <InputFieldTime
            name="Horas de inicio"                                    
            formikValueRef={values.startTime}
            updateValueFn={setFieldValue}
            handleChangeFn={handleChange}
            //value={values.startTime}
            //onChange={handleChange}
            inError={errors.startTime?true:false}
          /> */}

          <TimePikerGray
            name="endTime"
            id="endTime"
            title="Hora Finalización"
            placeholder=""
            formValue={values.endTime}
            onValueUpdate={setFieldValue}
            errors={
              errors.endTime ? (
                <NeutralBlackText
                  text={errors.endTime}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <TimePikerGray
            name="interventionTime"
            id="interventionTime"
            title="Horas de Intervención"
            placeholder=""
            formValue={values.interventionTime}
            onValueUpdate={setFieldValue}
            errors={
              errors.interventionTime ? (
                <NeutralBlackText
                  text={errors.interventionTime}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <DatePickerGrayInput
            name="date"
            title="Fecha"
            className="full-width-date-picker"
            inputClass="full-width-date-picker-input"
            placeholder="16 | 11 | 75"
            value={values.date}
            onChange={(value) => {
              setFieldValue("date", value);
            }}
            inError={errors.date ? true : false}
          />

          <CustomInputOne
            name="assignedConsultor"
            id="assignedConsultor"
            title="Consultor Asignado"
            type="text"
            placeholder=""
            value={values.assignedConsultor}
            onChange={handleChange}
            errors={
              errors.assignedConsultor ? (
                <NeutralBlackText
                  text={errors.assignedConsultor}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="program"
            id="program"
            title="Programa"
            type="text"
            placeholder=""
            value={values.program}
            onChange={handleChange}
            errors={
              errors.program ? (
                <NeutralBlackText
                  text={errors.program}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="assistant"
            id="assistant"
            title="Asistentes"
            type="text"
            placeholder=""
            value={values.assistant}
            onChange={handleChange}
            errors={
              errors.assistant ? (
                <NeutralBlackText
                  text={errors.assistant}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Alcance General de la Sesión" className="ml-3" />
        </div>

        <CustomTextarea
          name="sessionScope"
          id="sessionScope"
          title=""
          placeholder=""
          value={values.sessionScope}
          onChange={handleChange}
          errors={
            errors.sessionScope ? (
              <NeutralBlackText
                text={errors.sessionScope}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Evidencia Fotográfica" className="ml-3" />
        </div>

        <FileDropZoneInput
          name="evidence"
          onChange={(files: globalThis.File[]) => {
            setFieldValue("evidence", files);
          }}
        />

        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Compromiso / Reportes" className="ml-3" />
        </div>

        <TextDateRowsInput
          name="compromiso"
          onChange={(json) => {
            console.log("Main event:", json);
          }}
        />

        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Entregables de la Sesión" className="ml-3" />
        </div>

        <TextRowsInput
          name="entregas"
          onChange={(json) => {
            console.log("Main event:", json);
          }}
        />

        <SectionSeparator />
        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Firmas" className="ml-3" />
        </div>

        <DualSignForm
          signOneErrors={false}
          signTwoErrors={false}
          handleFieldChange={setFieldValue}
          onChange={handleChange}
          signOneNameFieldName="signOneName"
          signOneNameValue={values.signOneName}
          signOneDocumentFieldName="signOneDocument"
          signOneDocumentValue={values.signOneDocument}
          signTwoNameFieldName="signTwoName"
          signTwoNameValue={values.signTwoName}
          signTwoDocumentFieldName="signTwoDocument"
          signTwoDocumentValue={values.signTwoDocument}
          signOneDropZoneFieldName="signOneEvidence"
          signTwoDropZoneFieldName="signTwoEvidence"
          signOneTitle="Consultor"
          signTwoTitle="Empresa"
        />

        <Button
          type="submit"
          label="Fecha de la próxima asesoría"
          className="w-56 xl:w-72 self-end my-6"
          onClick={handleSubmit}
          primary
        />
      </form>
      <div className="flex-auto flex items-center">
        <a
          onClick={previousSteep}
          onKeyDown={() => {}}
          className="cursor-pointer"
        >
          <NeutralNCText
            text="Atrás"
            className="cf-text-principal-180 mb-[2rem] md:mb-9"
            fontSize="md"
          />
        </a>
      </div>
    </div>
  );
};

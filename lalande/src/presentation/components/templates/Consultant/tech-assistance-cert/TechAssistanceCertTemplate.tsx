"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { useFormik } from "formik";
import {
  Button,
  CustomInputOne,
  CustomSelectOne,
  CustomTextarea,
  DatePickerInput,
  FileDropZoneInput,
  MainTitle,
  NeutralBlackText,
  NeutralNCText,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import {
  TextDateRowsInput,
  TextRowsInput,
} from "presentation/components/molecules";
import { DualSignForm } from "presentation";
import { Suspense, useEffect, useState } from "react";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FORM_DB_SELECT_OPTIONS,
  getAdminBusinessList,
  MPAC_USER_ROLE,
  SelectOption,
  techCertFormValidation,
} from "lib";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import SaveAssistanceRecordFormUseCase from "domain/usecases/techAssistanceRegister/saveTechAssistanceForm.usecase";
import { getSelectValues } from "lib/helpers/uiUtils";
import { toast } from "react-toastify";

interface PageProps {
  appId: string;
}

export const TechAssistanceCertTemplate: React.FC<PageProps> = ({ appId }) => {
  const { data: session } = useSession();
  const [appointmentId, setAppointmentId] = useState("");

  // Selects
  const [assistanceType, setAssistanceType] = useState<Array<SelectOption>>();
  const [businessList, setBusinessList] = useState<Array<SelectOption>>();

  const previousSteep = () => {
    router.push("/Consultant/schedule");
  };

  // Router
  const router = useRouter();

  const setAppointmentIdUrl = (appointment: string) => {
    console.log("AppointmentId setter:", appointment);
    setAppointmentId(appointment);
  };

  const SearchUrlParams = () => {
    // URL PARAMS
    const appointment = appId;
    console.log("Appointment:", appointment);

    if (appointment && appointment != "") {
      setAppointmentId(appointment);
    } else {
      console.error("Can't read the appointment ID", appointment);
      alert(
        "error",
        "No se pudo guardar la información, intenta de nuevo mas tarde"
      );
    }
    return <></>;
  };

  const getUserInformation = async () => {
    const response = await getAdminBusinessList(session?.access_token ?? "");

    console.log(response);

    if (!response?.type.ROLE.includes(MPAC_USER_ROLE.consultor)) {
      console.error("El usuario actual no es un consultor valido");
      toast.error("El usuario actual no es un consultor registrado");
    } else {
      setFieldValue("consultantId", response.id);
    }
    if (response && response.business.BUSINESS_SELECT?.length) {
      const businessSelList = response.business.BUSINESS_SELECT.map(
        (option) => {
          return {
            label: option.label,
            value: option.label,
            shorthand: option.shorthand,
          } as SelectOption;
        }
      );
      setBusinessList(businessSelList);
    }
    if (response && response.type.INFO?.name) {
      setFieldValue("assignedConsultor", response.type.INFO?.name);
    }
  };

  const loadSelectOptions = async () => {
    const token = session?.access_token ?? "";
    setAssistanceType(
      await getSelectValues(FORM_DB_SELECT_OPTIONS.ASSISTANCE_MODE, token)
    );
  };

  const decodeSelectedBusiness = (value: string) => {
    let found = businessList?.filter((option) => option.value == value);

    if (found && found.length >= 1) {
      console.log("Business found:", found[0].shorthand);
      setFieldValue("businessId", found[0].shorthand);
    }
  };

  const getHourDifference = (start: string, end: string): number => {
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);

    const startDate = new Date(0, 0, 0, startHour, startMin);
    const endDate = new Date(0, 0, 0, endHour, endMin);

    // If end is earlier than start (e.g., overnight shift), add 1 day
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours;
  };

  const handleStartEndChange = (start: string, end: string) => {
    if (start && end) {
      if (start == end) {
        setFieldValue("interventionTime", 0);
        return;
      }
      const appointmentHours = getHourDifference(start, end);
      if (appointmentHours >= 1) {
        setFieldValue("interventionTime", appointmentHours);
      }
    }
  };

  // FORM Functions
  const initialValues = {
    appointmentId: "",
    assistance: "",
    businessName: "",
    businessId: "",
    operator: "",
    startTime: "12:00 PM",
    endTime: "12:00 PM",
    interventionTime: "",
    date: "",
    assignedConsultor: "",
    consultantId: "",
    program: "",
    assistant: "",
    sessionScope: "",
    evidence: new Array(),
    commitments: [],
    deliverables: [],
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
    // dispatch(
    //   addAlert({
    //     message: alertMsg,
    //     type: level,
    //   })
    // );
  };

  const onSubmit = async (information: any) => {
    console.log(information);
    const token = session?.access_token ? session?.access_token : "";
    const saveResumeInformation =
      appContainer.get<SaveAssistanceRecordFormUseCase>(
        USECASES_TYPES._SaveAssistanceRecordFormUseCase
      );
    const response = await saveResumeInformation.execute(information, token);
    if (response) {
      console.log("Response Form: ", response);
      router.push("/Consultant/schedule");
    } else {
      console.error("Error al guardar la certificación:", response);
      toast.error("Error al guardar la certificación");
    }
    return;
  };

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
    validationSchema: techCertFormValidation,
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    setFieldValue("appointmentId", appointmentId);
    loadSelectOptions();
    getUserInformation();
  }, [appointmentId]);

  useEffect(() => {
    console.log("FORMIK errors: ", errors);
  }, [errors]);

  useEffect(() => {
    handleStartEndChange(values.startTime, values.endTime);
  }, [values.startTime, values.endTime]);

  useEffect(() => {
    SearchUrlParams();
  }, []);

  return (
    <div className="w_full md:w-11/12 xl:w-2/3">
      <MainTitle text="Acta de asistencia técnica." />
      <SecondaryText text={new Date().getFullYear().toString()} />
      <SectionSeparator />

      <form onSubmit={handleSubmit}>
        {/*
        <Suspense>
          <SearchUrlParams />
        </Suspense>
        */}

        <input
          name="appointmentId"
          type="hidden"
          value={values.appointmentId}
          onChange={handleChange}
        />

        <input
          name="consultantId"
          type="hidden"
          value={values.consultantId}
          onChange={handleChange}
        />

        <input
          name="businessId"
          type="hidden"
          value={values.businessId}
          onChange={handleChange}
        />

        <div className="flex flex-row items-center my-4">
          <TertiaryTitle
            text="Información de la Intervención "
            className="ml-3"
          />
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomSelectOne
            name="assistance"
            label="¿Cómo asistirás?"
            placeholder=""
            defaultValue={values.assistance}
            value={values.assistance}
            options={assistanceType ?? []}
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

          <CustomSelectOne
            name="businessName"
            label="Razón Social"
            placeholder=""
            defaultValue={values.businessName}
            value={values.businessName}
            options={businessList ?? []}
            onChange={(e) => {
              console.log("CHANGE BUSINESS: ", e.target.value);
              decodeSelectedBusiness(e.target.value);
              handleChange(e);
            }}
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

          <CustomInputOne
            name="startTime"
            id="startTime"
            title="Horas de inicio"
            placeholder=""
            type="time"
            value={values.startTime}
            onChange={handleChange}
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

          <CustomInputOne
            name="endTime"
            id="endTime"
            title="Hora Finalización"
            placeholder=""
            type="time"
            value={values.endTime}
            onChange={handleChange}
            errors={
              errors.endTime ? (
                <NeutralBlackText
                  text={errors.endTime}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="interventionTime"
            id="interventionTime"
            title="Horas de Intervención"
            type="text"
            placeholder=""
            value={values.interventionTime}
            onChange={handleChange}
            readOnly={true}
            errors={
              errors.interventionTime ? (
                <NeutralBlackText
                  text={errors.interventionTime}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <DatePickerInput
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
            readOnly={true}
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
          placeholder={"Subir archivo (JPEG, JPG, PNG)"}
        />

        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Compromiso / Reportes" className="ml-3" />
        </div>

        <TextDateRowsInput
          name="commitments"
          onChange={(json) => {
            //console.log("Main event:", json);
            setFieldValue("commitments", json);
          }}
        />

        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Entregables de la Sesión" className="ml-3" />
        </div>

        <TextRowsInput
          name="deliverables"
          onChange={(json) => {
            //console.log("Main event:", json);
            setFieldValue("deliverables", json);
          }}
        />

        <SectionSeparator />
        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Firmas" className="ml-3" />
        </div>

        <DualSignForm
          signTwoReadOnly={true}
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

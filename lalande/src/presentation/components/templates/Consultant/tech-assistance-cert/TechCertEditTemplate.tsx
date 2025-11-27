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
  FileImagesPreview,
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
import { useEffect, useState } from "react";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FORM_DB_SELECT_OPTIONS,
  SelectOption,
  TECH_REVISION_STATUS,
  techCertFormValidation,
  TextDateMoleculeList,
  TextRowsMoleculeList,
} from "lib";
import GetAnalystTechReportUseCase from "domain/usecases/techAssistanceRegister/getAnalystTechAssistanceRecord";
import {
  AssistanceRecordForm,
  FormCustomFileEntity,
  FormCustomFileEntityList,
  S3FileId,
  S3FileList,
  SaveAssistanceStatusForm,
} from "domain/models/tech-assistance-cert/techAssistanceForm";
import { jwtDecode } from "jwt-decode";
import { KeycloakProfile } from "next-auth/providers/keycloak";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import SaveAssistanceRecordCorrectionFormUseCase from "domain/usecases/techAssistanceRegister/saveTechAssistanceCorrection.usecase";

interface PageProps {
  id: string;
}

export const TechCertEditTemplate: React.FC<PageProps> = ({ id }) => {
  const { data: session } = useSession();

  const [recordId, setRecordId] = useState("");

  const [signOneEvidence, setSignOneEvidence] = useState<S3FileId | null>();
  const [signTwoEvidence, setSignTwoEvidence] = useState<S3FileId | null>();
  const [evidenceImages, setEvidenceImages] = useState<S3FileList | null>();

  const [commitments, setCommitments] = useState<TextDateMoleculeList | null>();
  const [deliverables, setDeliverables] =
    useState<TextRowsMoleculeList | null>();

  const [assistanceType, setAssistanceType] = useState<Array<SelectOption>>();

  const previousSteep = () => {
    router.push("/Consultant/schedule");
  };

  // Router
  const router = useRouter();

  const setRecordIdValue = (appointment: string) => {
    console.log("AppointmentId setter:", appointment);
    setRecordId(appointment);
  };

  const SearchUrlParams = () => {
    // URL PARAMS
    //const searchParams = useSearchParams();

    const appointment = id;
    console.log("Appointment:", appointment);

    if (appointment && appointment != "") {
      setRecordIdValue(appointment);
    } else {
      console.error("Can't read the appointment ID", appointment);
      alert(
        "error",
        "No se pudo guardar la información, intenta de nuevo mas tarde"
      );
    }
    return <></>;
  };

  const getSelectValues = async (field: FORM_DB_SELECT_OPTIONS) => {
    const getOptionsList = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const response = await getOptionsList.execute(field, session?.access_token);
    if (response && response.length) {
      return response;
    }
    return [];
  };

  const loadSelectOptions = async () => {
    setAssistanceType(
      await getSelectValues(FORM_DB_SELECT_OPTIONS.ASSISTANCE_MODE)
    );
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
    originalId: "",
    appointmentId: "",
    assistance: "",
    businessName: "",
    businessId: "",
    operator: "",
    startTime: "12:00",
    endTime: "12:00",
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

    // Edit Form
    imagesMarkedToRemove: [],
  };

  const revisionInitial: SaveAssistanceStatusForm = {
    status: TECH_REVISION_STATUS.unknown,
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
    const saveResumeCorrection =
      appContainer.get<SaveAssistanceRecordCorrectionFormUseCase>(
        USECASES_TYPES._SaveAssistanceRecordCorrectionFormUseCase
      );
    const response = await saveResumeCorrection.execute(information, token);
    if (response) {
      console.log("Response Form: ", response);
      router.push("/Consultant/schedule");
    } else {
      console.error("Error al guardar la certificación:", response);
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

  const loadFromDB = async (recordId: string) => {
    const data = {
      id: recordId,
    };
    const getReportList = appContainer.get<GetAnalystTechReportUseCase>(
      USECASES_TYPES._GetAnalystTechReportUseCase
    );
    const response = await getReportList.execute(data, session?.access_token);
    if (response === undefined) {
      return;
    }
    console.log(response);
    let reg: AssistanceRecordForm = response.information;

    setSignOneEvidence(
      response.download_links.signOneEvidence
        ? response.download_links.signOneEvidence
        : null
    );
    setSignTwoEvidence(
      response.download_links.signTwoEvidence
        ? response.download_links.signTwoEvidence
        : null
    );

    setEvidenceImages(response.download_links.evidences);
    setDeliverables(reg.deliverables);
    setCommitments(reg.commitments);

    //console.log(response.download_links.evidences)
    //console.log(reg.deliverables)
    //console.log(reg.commitments)

    setFieldValue("appointmentId", recordId);
    setFieldValue("assistance", reg.assistance);
    setFieldValue("businessName", reg.businessName);
    setFieldValue("operator", reg.operator);
    setFieldValue("startTime", reg.startTime);
    setFieldValue("endTime", reg.endTime);
    setFieldValue("interventionTime", reg.interventionTime);
    setFieldValue("date", reg.date);
    setFieldValue("assignedConsultor", reg.assignedConsultor);
    setFieldValue("program", reg.program);
    setFieldValue("assistant", reg.assistant);
    setFieldValue("sessionScope", reg.sessionScope);
    setFieldValue("signOneName", reg.signOneName);
    setFieldValue("signTwoName", reg.signTwoName);
    setFieldValue("signOneDocument", reg.signOneDocument);
    setFieldValue("signTwoDocument", reg.signTwoDocument);
    setFieldValue("appointmentId", reg.appointmentId);
    setFieldValue("businessId", reg.businessId);
    setFieldValue("consultantId", reg.consultantId);
    setFieldValue("originalId", id);

    //console.log("download_links", response.download_links);

    /*
    setFieldValue("evidence", reg.evidence);
    setFieldValue("signOneEvidence", reg);
    setFieldValue("signTwoEvidence", reg);*/
  };

  useEffect(() => {
    loadFromDB(recordId);
    const token = session?.access_token ? session?.access_token : "";
    const userInfo: KeycloakProfile = jwtDecode(token);
    console.log(userInfo);
  }, [recordId]);

  useEffect(() => {
    console.log("FORMIK errors: ", errors);
  }, [errors]);

  useEffect(() => {
    console.log(
      "Change in inputs!",
      commitments?.length,
      deliverables?.length,
      evidenceImages?.length
    );
  }, [commitments, deliverables, evidenceImages]);

  useEffect(() => {
    SearchUrlParams();
    loadSelectOptions();
  }, []);

  useEffect(() => {
    handleStartEndChange(values.startTime, values.endTime);
  }, [values.startTime, values.endTime]);

  return (
    <div className="w_full md:w-11/12 xl:w-2/3">
      <MainTitle text="Acta de asistencia técnica." />
      <SecondaryText text={new Date().getFullYear().toString()} />
      <SectionSeparator />

      <form onSubmit={() => {}}>
        {/*<Suspense>
          <SearchUrlParams />
        </Suspense>*/}

        <input
          name="originalId"
          type="hidden"
          value={values.appointmentId}
          onChange={handleChange}
        />

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
            //readOnly={true}
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

          <CustomInputOne
            readOnly={true}
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
            //readOnly={true}
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
            //readOnly={true}
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
            //readOnly={true}
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
            //disabled={true}
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
            readOnly={true}
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
            //readOnly={true}
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
            //readOnly={true}
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
          //readOnly={true}
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

        {/*<FileDropZoneInput
          name="evidence"
          onChange={(files: globalThis.File[]) => {
            setFieldValue("evidence", files);
          }}
        />*/}

        <div className="flex flex-row items-center my-4">
          <NeutralBlackText
            text="Marca las imágenes que deseas remover del informe."
            className="ml-3"
          />
        </div>
        <FileImagesPreview
          imagesData={evidenceImages ?? []}
          OnChange={(marks: Array<string>) => {
            setFieldValue("imagesMarkedToRemove", marks);
          }}
        />

        <input
          name="imagesMarkedToRemove"
          type="hidden"
          value={values.appointmentId}
          onChange={handleChange}
        />

        <div className="flex flex-row items-center my-4">
          <NeutralBlackText
            text="Agrega nuevas imágenes si lo deseas."
            className="ml-3"
          />
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
          name="commitments"
          //readOnly={true}
          initialValue={commitments ?? []}
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
          initialValue={deliverables ?? []}
          //readOnly={true}
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
          signOneDropZoneValue={signOneEvidence}
          signTwoDropZoneValue={signTwoEvidence}
          signOneTitle="Consultor"
          signTwoTitle="Empresa"
        />
      </form>

      <div className="flex gap-8 items-center justify-center">
        <Button
          type="submit"
          label="Guardar cambios"
          className="w-56 xl:w-72 self-end my-6"
          onClick={handleSubmit}
          primary
        />
      </div>
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

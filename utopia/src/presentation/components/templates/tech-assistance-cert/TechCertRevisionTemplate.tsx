"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { useFormik } from "formik";
import {
  Button,
  CustomInputOne,
  CustomSelectOne,
  CustomTextarea,
  DatePickerInput,
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
import { Suspense, useEffect, useState } from "react";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  TECH_REVISION_STATUS,
  TextDateMoleculeList,
  TextRowsMoleculeList,
} from "lib";
import { jwtDecode } from "jwt-decode";
import { KeycloakProfile } from "next-auth/providers/keycloak";
import {
  AssistanceRecordBusinessSignQuery,
  AssistanceRecordForm,
  S3FileId,
  S3FileList,
  SaveAssistanceStatusForm,
} from "domain/models";
import * as Yup from "yup";
import GetAnalystTechReportUseCase from "domain/usecases/techAssistance/getAnalystTechAssistanceRecord";
import { ModalProcessResult } from "presentation/components/atoms/common/modals/ModalProcessResult";
import { FormValidations } from "./validations";
import QueryBusinessTechReportSignUseCase from "domain/usecases/techAssistance/queryBusinessTechReportSign";

interface PageProps {
  id: string;
}

export const TechCertRevisionTemplate: React.FC<PageProps> = ({ id }) => {
  const { data: session } = useSession();

  const [recordId, setRecordId] = useState("");

  const [signOneEvidence, setSignOneEvidence] = useState<S3FileId | null>();
  const [signTwoEvidence, setSignTwoEvidence] = useState<S3FileId | null>();
  const [evidenceImages, setEvidenceImages] = useState<S3FileList | null>();

  const [commitments, setCommitments] = useState<TextDateMoleculeList | null>();
  const [deliverables, setDeliverables] =
    useState<TextRowsMoleculeList | null>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [approveStatus, setApproveStatus] = useState<TECH_REVISION_STATUS>(
    TECH_REVISION_STATUS.unknown
  );

  // Router
  const router = useRouter();

  const setRecordIdValue = (appointment: string) => {
    console.log("AppointmentId setter:", appointment);
    setRecordId(appointment);
  };

  const previousSteep = () => {
    router.push("/tech-record-sign");
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
    commitments: [],
    deliverables: [],
    signOneName: "",
    signTwoName: "",
    signOneDocument: "",
    signTwoDocument: "",
    signOneEvidence: [],
    signTwoEvidence: [],
    businessId: "",
    consultantId: "",
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

  const handleFormClick = async (status: TECH_REVISION_STATUS) => {
    const APPROVE_MSG =
      "¿Estas seguro que APRUEBAS la información y deseas FIRMAR esta ACTA?";
    const REJECT_MSG =
      "¿Estas seguro que deseas ENVIAR la información RECHAZAR este registro?";

    setIsModalOpen(true);
    await validationFormik.setFieldValue("status", status);
    setApproveStatus(status);

    if (status == TECH_REVISION_STATUS.approved) {
      setModalMessage(APPROVE_MSG);
      await validationFormik.setFieldValue("observation", "", false);
    } else if (status == TECH_REVISION_STATUS.rejected) {
      setModalMessage(REJECT_MSG);
    }
  };

  const handleClickAccept = () => {
    validationFormik.submitForm();
  };

  const processActionQuery = async (
    observation: string | null,
    acceptStatus: TECH_REVISION_STATUS
  ) => {
    const token = session?.access_token ? session?.access_token : "";
    const userInfo: KeycloakProfile = jwtDecode(token);
    console.log("approved!!");
    /*
    const saveRevisionInformation =
      appContainer.get<CreateAnalystTechRevisionUseCase>(
        USECASES_TYPES._CreateAnalystTechRevisionUseCase
      );
    let observation_info: TechRecordRevisionReview = {};
    if (observation) {
      observation_info = {
        revision: {
          observation: observation,
        },
      };
    }
    const queryData: SaveAssistanceRecordRevision = {
      identification_number: userInfo.identification_number,
      identification_type: userInfo.identification_type,
      record_id: recordId,
      review: observation_info,
      status: acceptStatus,
    };
    const response = await saveRevisionInformation.execute(queryData, token);
    if (response) {
      console.log("Response Form: ", response);
      router.push("/analyst/reports/support_register");
    } else {
      console.error("Error al guardar la certificación:", response);
    }
      */
    return;
  };

  const onSubmit = async (information: any) => {
    const token = session?.access_token ? session?.access_token : "";
    const data: AssistanceRecordForm = information;
    console.log(
      "On Submit!",
      data,
      data.signTwoDocument,
      data.signTwoName,
      data.signTwoEvidence
    );
    console.log(information);

    const query = {
      id: id,
      signTwoEvidence: data.signTwoEvidence,
      signTwoName: data.signTwoName,
      signTwoDocument: data.signTwoDocument,
    } as AssistanceRecordBusinessSignQuery;

    const queryBusinessSign =
      appContainer.get<QueryBusinessTechReportSignUseCase>(
        USECASES_TYPES._QueryBusinessTechReportSignUseCase
      );

    const response = await queryBusinessSign.execute(query, token);
    if (response) {
      console.log("Response Form: ", response);
      router.push("/tech-record-sign/");
    } else {
      console.error("Error al firmar la certificación:", response);
    }
  };

  const signFormValidation =
    new FormValidations().getTechCertFormSignValidation();

  const { errors, handleSubmit, handleChange, setFieldValue, values } =
    useFormik({
      initialValues: initialValues,
      onSubmit: onSubmit,
      validationSchema: signFormValidation,
      validateOnBlur: false,
      validateOnChange: false,
    });

  const validationFormik = useFormik({
    initialValues: revisionInitial,
    onSubmit: () => {},
    validationSchema: Yup.object().shape({}), // <------ CHECK
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
    console.log("FORMIK errors: ", errors, validationFormik.errors);
  }, [errors, validationFormik.errors]);

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
  }, []);

  return (
    <div className="w_full md:w-11/12 xl:w-2/3">
      <MainTitle text="Acta de asistencia técnica." />
      <SecondaryText text={new Date().getFullYear().toString()} />
      <SectionSeparator />

      <form onSubmit={handleSubmit}>
        {/*<Suspense>
          <SearchUrlParams />
        </Suspense>}*/}

        <input
          name="appointmentId"
          type="hidden"
          value={values.appointmentId}
          onChange={handleChange}
          readOnly={true}
        />

        <div className="flex flex-row items-center my-4">
          <TertiaryTitle
            text="Información de la Intervención "
            className="ml-3"
          />
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomSelectOne
            readOnly={true}
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
            readOnly={true}
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
            readOnly={true}
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
            readOnly={true}
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
            disabled={true}
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
            readOnly={true}
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
            readOnly={true}
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
          readOnly={true}
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
        <FileImagesPreview imagesData={evidenceImages ?? []} readOnly={true} />

        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Compromiso / Reportes" className="ml-3" />
        </div>

        <TextDateRowsInput
          name="commitments"
          readOnly={true}
          initialValue={commitments ?? []}
          onChange={(json) => {
            console.log("Main event:", json);
          }}
        />

        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Entregables de la Sesión" className="ml-3" />
        </div>

        <TextRowsInput
          name="deliverables"
          initialValue={deliverables ?? []}
          readOnly={true}
          onChange={(json) => {
            console.log("Main event:", json);
          }}
        />

        <SectionSeparator />
        <div className="flex flex-row items-center my-5">
          <TertiaryTitle text="Firmas" className="ml-3" />
        </div>

        <DualSignForm
          handleFieldChange={setFieldValue}
          onChange={handleChange}
          signOneReadOnly={true}
          signOneErrors={
            errors.signOneDocument ||
            errors.signOneName ||
            errors.signOneEvidence
              ? true
              : false
          }
          signTwoErrors={
            errors.signTwoDocument ||
            errors.signTwoName ||
            errors.signTwoEvidence
              ? true
              : false
          }
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

      <div className="py-5">
        {/*<MainTitle text="Estado de revision." />*/}
        <SecondaryText
          text={
            "Si estas de acuerdo con la información consignada en el acta, diligencia la segunda firma y presiona ACEPTAR"
          }
        />
        <SectionSeparator />

        <form onSubmit={validationFormik.handleSubmit}>
          <div className="flex gap-8 items-center justify-center">
            <input
              name="status"
              type="hidden"
              value={validationFormik.values.status}
              onChange={handleChange}
              readOnly={true}
            />

            <div className="">
              {/*<Button
                type="submit"
                label="Rechazar"
                className="w-56 xl:w-72 self-end my-6"
                primary={false}
                secondaryClass="border-[1px] bg-principal-500 text-principal-150"
                onClick={async (e) => {
                  handleFormClick(TECH_REVISION_STATUS.rejected);
                }}
              />*/}
            </div>

            <div className="">
              <Button
                type="submit"
                label="Aceptar"
                className="w-56 xl:w-72 self-end my-6"
                onClick={(e) => {
                  handleFormClick(TECH_REVISION_STATUS.approved);
                }}
                primary
              />
            </div>
          </div>
        </form>
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

      {isModalOpen && (
        <ModalProcessResult
          title={"¡Solicitud de confirmación!"}
          message={modalMessage}
          onPrimaryClick={(reason: string) => {
            setIsModalOpen(false);
            if (approveStatus == TECH_REVISION_STATUS.rejected) {
              processActionQuery(reason, approveStatus);
            } else if (approveStatus == TECH_REVISION_STATUS.approved) {
              //processActionQuery(null, approveStatus);
              handleSubmit();
            }
          }}
          onSecondaryClick={() => {}}
          onClickClose={() => {
            setIsModalOpen(false);
          }}
          titleClass="text-center text-[1.5rem]"
          primaryButtonText="Aceptar"
          currentStatus={approveStatus}
        />
      )}
    </div>
  );
};

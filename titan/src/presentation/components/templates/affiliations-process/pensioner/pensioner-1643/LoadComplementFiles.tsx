"use client";

import { CreateRequest } from "domain/models";
import CreateRequestUseCase from "domain/usecases/request/createRequest.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import {
  ACRONYM_AFFILIATIONS_PENSIONER,
  CAMPAIGN_ID_AFFILIATIONS_1643,
  EPS_LIST,
  identificationTypeNomenclature,
  limpiarDireccionSAP,
  TEMPLATE_ID_AFFILIATIONS_PENSIONER,
  TITLE_DOCS,
  WORKFLOW_ID_AFFILIATIONS_PENSIONER,
} from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  CardText,
  CustomInputGray,
  CustomSelectFormFixed,
  LoadFile,
  MainTitle,
  SectionSeparator,
  Spinner,
} from "presentation/components/atoms";
import { usePensionerAffiliations } from "presentation/hooks";
import { useAppSelector } from "presentation/store";
import React, { useEffect, useState } from "react";

const optionsOther = [
  { label: "SI", value: "0" },
  { label: "NO", value: "1" },
];

const fieldsRequired = [
  {
    name: "salary",
    label: "El valor ingreso es requerido",
  },
  {
    name: "code_eps",
    label: "El código EPS es requerido",
  },
  {
    name: "other_affiliation",
    label: "Este campo es requerido",
  },
];

const filesRequired = [
  {
    name: "document_identification",
    label: "El documento de identificación es requerido",
  },
  {
    name: "document_pension",
    label: "El documento de pension es requerido",
  },
  {
    name: "document_pension_last_receipt",
    label: "El último recibo de mesada es requerido",
  },
];

type SelectOption = {
  label: string;
  value: string;
} | null;

const concatFullName = (data: {
  f_name: string;
  s_name: string;
  f_last_name: string;
  s_last_name: string;
}) => {
  const parts = [
    data.f_name,
    data.s_name,
    data.f_last_name,
    data.s_last_name,
  ].filter((part) => part.trim() !== "");

  return parts.map((part) => part.toUpperCase()).join(" ");
};

const LoadComplementFiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNextStep, setIsLoadingNextStep] = useState(false);
  const [selectedValues, setSelectedValues] = useState<{
    salary: string;
    code_eps: SelectOption;
    other_affiliation: SelectOption;
  }>({
    salary: "",
    code_eps: null,
    other_affiliation: null,
  });
  const [files, setFiles] = useState<{
    document_identification: File;
    document_pension: File;
    document_pension_last_receipt: File;
    document_peace_safe: File;
  }>({
    document_identification: new File([], "empty.PDF", { type: ".PDF" }),
    document_pension: new File([], "empty.PDF", { type: ".PDF" }),
    document_pension_last_receipt: new File([], "empty.PDF", { type: ".PDF" }),
    document_peace_safe: new File([], "empty.PDF", { type: ".PDF" }),
  });
  const [errors, setErrors] = useState<{
    salary: string;
    code_eps: string;
    other_affiliation: string;
    modality_affiliation: string;
    document_identification: string;
    document_pension: string;
    document_pension_last_receipt: string;
    document_peace_safe: string;
  }>({
    salary: "",
    code_eps: "",
    other_affiliation: "",
    modality_affiliation: "",
    document_identification: "",
    document_pension: "",
    document_pension_last_receipt: "",
    document_peace_safe: "",
  });

  const router = useRouter();
  const { data: session } = useSession();
  const { saveRequestResume } = usePensionerAffiliations();
  const data = useAppSelector((state) => state.pensionerAffiliations);

  // --- Use Cases
  const createRequestUseCase = appContainer.get<CreateRequestUseCase>(
    USECASES_TYPES._CreateRequestUseCase
  );

  //función que me da la fecha actual
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleChange = (value: SelectOption, name: string) => {
    let cleanErrorLastFile = false;
    if (name == "other_affiliation") {
      if (value!.value == "0") {
        setFiles({
          ...files,
          document_peace_safe: new File([], "empty.PDF", { type: ".PDF" }),
        });
      }
      cleanErrorLastFile = true;
    }
    const cleanErrorFile = cleanErrorLastFile
      ? { document_peace_safe: "" }
      : {};
    setErrors({ ...errors, [name]: "", ...cleanErrorFile });
    setSelectedValues({ ...selectedValues, [name]: value });
  };

  const formatCurrencyToNumber = (formattedValue: string): number => {
    // Remove currency symbols, dots, commas and spaces
    const cleanValue = formattedValue.replace(/[$.,' ]/g, "");
    return Number(cleanValue);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "salary") {
      // Remove any non-numeric characters
      const numericValue = e.target.value.replace(/[^\d]/g, "");

      if (isNaN(Number(numericValue))) {
        return;
      }

      // Format as Colombian currency
      const formattedValue = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(Number(numericValue))
        .replace("COP", "") // Remove currency code
        .trim(); // Remove extra spaces

      setErrors({ ...errors, [e.target.name]: "" });
      setSelectedValues({ ...selectedValues, [e.target.name]: formattedValue });
      return;
    }

    setErrors({ ...errors, [e.target.name]: "" });
    setSelectedValues({ ...selectedValues, [e.target.name]: e.target.value });
  };

  const handleSetFile = (file: File | null, name: string) => {
    setErrors({ ...errors, [name]: "" });
    setFiles({ ...files, [name]: file });
  };

  const handleValidateFields = async () => {
    if (isLoadingNextStep) return;
    setIsLoadingNextStep(true);
    try {
      const errorLoad = { ...errors };
      fieldsRequired.forEach((field) => {
        if (
          typeof selectedValues[field.name as keyof typeof selectedValues] ==
          "string"
        ) {
          if (selectedValues[field.name as keyof typeof selectedValues] == "") {
            errorLoad[field.name as keyof typeof errorLoad] = field.label;
          }
        } else if (
          selectedValues[field.name as keyof typeof selectedValues] == null
        ) {
          errorLoad[field.name as keyof typeof errorLoad] = field.label;
        }
      });
      const fieldsToValidate = [...filesRequired];
      if (selectedValues.other_affiliation?.value == "0") {
        fieldsToValidate.push({
          name: "document_peace_safe",
          label: "El documento de paz y seguridad es requerido",
        });
      }
      fieldsToValidate.forEach((field) => {
        if (
          files[field.name as keyof typeof files] == null ||
          (files[field.name as keyof typeof files]?.name === "empty.PDF" &&
            files[field.name as keyof typeof files]?.size === 0)
        ) {
          errorLoad[field.name as keyof typeof errorLoad] = field.label;
        }
      });
      console.log("errorLoad", errorLoad);
      setErrors(errorLoad);
      if (Object.values(errorLoad).every((error) => error === "")) {
        const filesToSend: File[] = [
          files.document_identification,
          files.document_pension,
          files.document_pension_last_receipt,
          files.document_peace_safe,
        ];
        const proof = [
          {
            "Información de tus ingresos": {
              "Ingreso económico": selectedValues.salary,
              "Modalidad de aporte": "Pensionado 0%",
              EPS: selectedValues.code_eps?.label,
              "Has estado afiliado a otra caja":
                selectedValues.other_affiliation?.label,
              "Tipo de pensionado": "Pensionado 1643",
            },
          },
          {
            "Datos del afiliado": {
              "Tipo de identificación": data.identificationName,
              "Número de identificación": data.identificationNumber,
              "Primer nombre": data.dataAffiliation.f_name,
              "Segundo nombre": data.dataAffiliation.s_name,
              "Primer apellido": data.dataAffiliation.f_last_name,
              "Segundo apellido": data.dataAffiliation.s_last_name,
              "Fecha de nacimiento": data.dataAffiliation.birth_date,
            },
          },
          {
            "Información demográfica": {
              "Estado civil": data.informationData.civil_status?.label,
              Nacionalidad: data.informationData.nationality?.label,
              Género: data.informationData.gender?.label,
              "Orientación sexual":
                data.informationData.sexual_preference?.label,
              "Nivel de escolaridad":
                data.informationData.academic_level?.label,
              "Factor de vulnerabilidad":
                data.informationData.vulnerability_fact?.label,
              "Pertenencia étnica":
                data.informationData.ethnic_affiliation?.label,
              Resguardo: data.informationData.reserve?.label,
              Comunidad: data.informationData.community?.label,
            },
          },
          {
            "Datos de Ubicación y Contacto": {
              Departamento: data.informationData.department?.label,
              Ciudad: data.informationData.city?.label,
              Dirección: data.address.address,
              "Correo electrónico": data.contactData.email,
              "Número de celular": data.contactData.phone,
            },
          },
        ];
        const bodyRequest: CreateRequest = {
          statusRnec: data.stateRnec,
          campaignId: CAMPAIGN_ID_AFFILIATIONS_1643,
          statusId: 1,
          workflowId: WORKFLOW_ID_AFFILIATIONS_PENSIONER,
          referenceAcronym: ACRONYM_AFFILIATIONS_PENSIONER,
          userCellphone: data.contactData.phone,
          userDocument: data.identificationNumber,
          userFullName: concatFullName(data.dataAffiliation),
          userTypeDocument: data.identificationType,
          radicate: "",
          form: {
            header: {
              version: "1.0.0",
              template: TEMPLATE_ID_AFFILIATIONS_PENSIONER,
            },
            content: {
              sapData: {
                TipoIdentEntidad: "",
                NIFEntidad: "",
                DigitoVerifica: "",
                FormaProcesamiento: "W",
                TipoIdentTrab: identificationTypeNomenclature(
                  data.identificationType
                ),
                NroIdentTrab: data.identificationNumber,
                PrimerApellido: data.dataAffiliation.f_last_name.toUpperCase(),
                SegundoApellido: data.dataAffiliation.s_last_name.toUpperCase(),
                Nombre1: data.dataAffiliation.f_name.toUpperCase(),
                Nombre2: data.dataAffiliation.s_name.toUpperCase(),
                FechaNacimiento: data.dataAffiliation.birth_date,
                EstadoCivil: data.informationData.civil_status?.value,
                Nacionalidad: data.informationData.nationality?.value,
                Sexo: data.informationData.gender?.value,
                OrientacionSexual:
                  data.informationData.sexual_preference?.value,
                FactorVulnerabilidad:
                  data.informationData.vulnerability_fact?.value,
                Resguardo:
                  data.informationData.ethnic_affiliation?.value == "3"
                    ? data.informationData.reserve?.value
                    : "",
                PuebloIndigena:
                  data.informationData.ethnic_affiliation?.value == "3"
                    ? data.informationData.community?.value
                    : "",
                Pertenencia_Etnica:
                  data.informationData.ethnic_affiliation?.value,
                Direccion: limpiarDireccionSAP(data.address.address),
                CodigoCiudad: data.informationData.city?.value,
                CodigoDepartamento:
                  data.informationData.department?.value.split("|")[1],
                TelefonoFijo: "",
                TelefonoCel: data.contactData.phone,
                email: data.contactData.email.toLowerCase(),
                AutMail: "1",
                CodEPS: selectedValues.code_eps?.value,
                SubFP: "",
                ValorIngreso: "",
                ValorPension: `${formatCurrencyToNumber(
                  selectedValues.salary
                )}`,
                FechaPension: getCurrentDate(),
                TipoActividad: "03",
                CategoriaAportante: "P3",
                SPCACTEcon: "",
                TipoAfiliado: "2",
                FechaAfiliacion: getCurrentDate(),
                FechaAporte: getCurrentDate(),
              },
              usuarioSolicitante: {
                correo: data.contactData.email.toLowerCase(),
                nombre: concatFullName(data.dataAffiliation),
                celular: data.contactData.phone,
                tipoDocumento: data.identificationType,
                numeroDocumento: data.identificationNumber,
              },
              proof: proof,
            },
          },
        };
        const request = await createRequestUseCase.execute(
          session?.access_token!,
          bodyRequest,
          filesToSend
        );
        saveRequestResume(request?.radicate!, request?.status?.name ?? "");
        router.push("/menu-affiliations/pensioner/pensioner-1643/filing-code");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNextStep(false);
    }
  };

  // --- Initialization
  const InitData = () => {
    if (!data.isStarted) {
      router.push("/menu-affiliations");
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    InitData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-12 mb-12">
        <CardText
          text="Afiliaciones / afiliación pensionado"
          className="text-principal-180 text-2xl"
        />
        <MainTitle text="Afiliación pensionado" />
        <h3 className="text-principal-180">
          Confirma tus datos personales para continuar la solicitud
        </h3>
        <SectionSeparator />
      </div>
      <div className="w-full flex flex-col gap-12">
        <div className="w-full max-w-[785px] flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 border-2 border-principal-180 rounded-full flex items-center justify-center">
              <h4 className="text-principal-180 text-sm font-semibold">3</h4>
            </div>
            <h2 className="text-principal-180 text-2xl font-semibold">
              Información de tus ingresos
            </h2>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 w-full">
              <CustomInputGray
                title="Valor Ingreso"
                placeholder="Escribe tu ingreso $"
                name="salary"
                classNameContainer="w-96"
                classNameInput="!pl-6"
                borderColor="border-principal-330"
                isCustomBorder
                value={selectedValues.salary}
                onChange={handleChangeInput}
                errors={
                  errors.salary && (
                    <p className="text-principal-500">{errors.salary}</p>
                  )
                }
              />
              <CustomSelectFormFixed
                className="w-96"
                setValue={() => {}}
                title="Código EPS*"
                placeholder="Selecciona"
                options={EPS_LIST}
                onChange={(value) => handleChange(value, "code_eps")}
                value={selectedValues.code_eps}
                errors={
                  errors.code_eps && (
                    <p className="text-principal-500">{errors.code_eps}</p>
                  )
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-principal-450">
                ¿Has estado afiliado como pensionado a otra caja de compensación
                del departamento del Valle ?
              </p>
              <CustomSelectFormFixed
                className="w-96"
                setValue={() => {}}
                title=""
                placeholder="Selecciona"
                options={optionsOther}
                onChange={(value) => handleChange(value, "other_affiliation")}
                value={selectedValues.other_affiliation}
                errors={
                  errors.other_affiliation && (
                    <p className="text-principal-500">
                      {errors.other_affiliation}
                    </p>
                  )
                }
              />
            </div>
          </div>
        </div>
        <SectionSeparator />
        <div className="w-full max-w-[912px] flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 border-2 border-principal-180 rounded-full flex items-center justify-center">
              <h4 className="text-principal-180 text-sm font-semibold">4</h4>
            </div>
            <h2 className="text-principal-180 text-2xl font-semibold">
              Documentos soporte
            </h2>
          </div>
          <p className="text-principal-450 mb-10">
            Para completar la verificación, adjunta los documentos legibles y
            vigentes. Asegúrate de que no tengan contraseñas y que el tamaño sea
            de hasta 5 MB.
          </p>
          <div className="flex flex-col gap-6 w-full">
            <LoadFile
              title={TITLE_DOCS[4]}
              file={files.document_identification}
              setFile={handleSetFile}
              name="document_identification"
              maxSizeMB={5}
              allowedFileTypes={["pdf", "jpg", "png"]}
              errors={
                errors.document_identification && (
                  <p className="text-principal-500">
                    {errors.document_identification}
                  </p>
                )
              }
            />
            <LoadFile
              title={TITLE_DOCS[23]}
              file={files.document_pension}
              setFile={handleSetFile}
              name="document_pension"
              maxSizeMB={5}
              allowedFileTypes={["pdf", "jpg", "png"]}
              errors={
                errors.document_pension && (
                  <p className="text-principal-500">
                    {errors.document_pension}
                  </p>
                )
              }
            />
            <LoadFile
              title={TITLE_DOCS[24]}
              file={files.document_pension_last_receipt}
              setFile={handleSetFile}
              name="document_pension_last_receipt"
              maxSizeMB={5}
              allowedFileTypes={["pdf", "jpg", "png"]}
              errors={
                errors.document_pension_last_receipt && (
                  <p className="text-principal-500">
                    {errors.document_pension_last_receipt}
                  </p>
                )
              }
            />
            {selectedValues.other_affiliation?.value == "0" && (
              <LoadFile
                title={TITLE_DOCS[25]}
                file={files.document_peace_safe}
                setFile={handleSetFile}
                name="document_peace_safe"
                maxSizeMB={5}
                allowedFileTypes={["pdf", "jpg", "png"]}
                errors={
                  errors.document_peace_safe && (
                    <p className="text-principal-500">
                      {errors.document_peace_safe}
                    </p>
                  )
                }
              />
            )}
          </div>
          <div className="max-w-[912px] flex items-center justify-between mb-10">
            <button
              className="text-principal-180 text-sm font-semibold"
              onClick={() =>
                router.push(
                  "/menu-affiliations/pensioner/pensioner-aportant/complete-information"
                )
              }
            >
              Atrás
            </button>
            <Button
              label={isLoadingNextStep ? "Cargando..." : "Finalizar"}
              disabled={isLoadingNextStep}
              primary
              primaryClass="bg-principal-700 text-principal-150 w-80 px-12 my-4"
              onClick={handleValidateFields}
              removeWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadComplementFiles;

"use client";

import { CreateRequest } from "domain/models";
import CreateRequestUseCase from "domain/usecases/request/createRequest.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import {
  ACRONYM_AFFILIATIONS_PENSIONER,
  CAMPAIGN_ID_AFFILIATIONS_25_ANIOS,
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
  LoadFile,
  MainTitle,
  SectionSeparator,
  Spinner,
} from "presentation/components/atoms";
import { usePensionerAffiliations } from "presentation/hooks";
import { useAppSelector } from "presentation/store";
import { useEffect, useState } from "react";

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
  {
    name: "document_certificate",
    label:
      "El recibo de mesada y el certificado de afiliaciones anteriores son requeridos",
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
  const [files, setFiles] = useState<{
    document_identification: File;
    document_pension: File;
    document_pension_last_receipt: File;
    document_certificate: File;
  }>({
    document_identification: new File([], "empty.PDF", { type: ".PDF" }),
    document_pension: new File([], "empty.PDF", { type: ".PDF" }),
    document_pension_last_receipt: new File([], "empty.PDF", { type: ".PDF" }),
    document_certificate: new File([], "empty.PDF", { type: ".PDF" }),
  });
  const [errors, setErrors] = useState<{
    document_identification: string;
    document_pension: string;
    document_pension_last_receipt: string;
    document_certificate: string;
  }>({
    document_identification: "",
    document_pension: "",
    document_pension_last_receipt: "",
    document_certificate: "",
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

  const handleSetFile = (file: File | null, name: string) => {
    setErrors({ ...errors, [name]: "" });
    setFiles({ ...files, [name]: file });
  };

  const handleValidateFields = async () => {
    if (isLoadingNextStep) return;
    setIsLoadingNextStep(true);
    try {
      const errorLoad = { ...errors };
      const fieldsToValidate = [...filesRequired];
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
          files.document_certificate,
        ];
        const proof = [
          {
            "Información de tus ingresos": {
              "Modalidad de aporte": "Pensionado 0%",
              "Tipo de pensionado": "Pensionado 25 Años",
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
          campaignId: CAMPAIGN_ID_AFFILIATIONS_25_ANIOS,
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
                CodEPS: "",
                SubFP: "",
                ValorIngreso: "",
                ValorPension: "",
                FechaPension: getCurrentDate(),
                TipoActividad: "03",
                CategoriaAportante: "P2",
                SPCACTEcon: "",
                TipoAfiliado: "3",
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
        saveRequestResume(request?.radicate!, request?.status?.name!);
        router.push("/menu-affiliations/pensioner/pensioner-25/filing-code");
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
          Adjunta los documentos requeridos para continuar con tu solicitud.
        </h3>
        <SectionSeparator />
      </div>
      <div className="w-full flex flex-col gap-12">
        <div className="w-full max-w-[912px] flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 border-2 border-principal-180 rounded-full flex items-center justify-center">
              <h4 className="text-principal-180 text-sm font-semibold">3</h4>
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
            <LoadFile
              title={TITLE_DOCS[26]}
              file={files.document_certificate}
              setFile={handleSetFile}
              name="document_certificate"
              maxSizeMB={5}
              allowedFileTypes={["pdf", "jpg", "png"]}
              errors={
                errors.document_certificate && (
                  <p className="text-principal-500">
                    {errors.document_certificate}
                  </p>
                )
              }
            />
          </div>
          <div className="max-w-[912px] flex items-center justify-between mb-10">
            <button
              className="text-principal-180 text-sm font-semibold"
              onClick={() =>
                router.push(
                  "/menu-affiliations/pensioner/pensioner-25/complete-information"
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

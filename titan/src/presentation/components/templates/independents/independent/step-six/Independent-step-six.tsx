"use client";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useRouter } from "next/navigation";
import { IndependentTemplate } from "../../IndependentTemplate";
import { useSession } from "next-auth/react";
import { useAppSelector } from "presentation/store";
import { Dropzone, StepSection } from "presentation/components/molecules";
import {
  AlertIcon,
  Button,
  Description,
  LoadingAnimation,
  LoadingSimpleAnimation,
} from "presentation/components/atoms";
import { useEffect, useState } from "react";
import {
  ACADEMIC_LEVEL,
  APORTANT_CATEGORY_SAP,
  APORTANT_TYPE,
  CIVIL_STATUS,
  Conditional,
  EPS_LIST,
  ETNICHITY,
  FILED_STATUS,
  GENDER,
  identificationTypeNomenclature,
  INDEPENDENT_DOCS_TITLE,
  SEXUAL_PREFERENCE,
  UserDataInterface,
  VULNERABILITY_FACT,
} from "lib";
import { ModalSecondTemplate } from "presentation/components/templates/filed";
import { FiledLayout } from "presentation/components/templates/affiliations";
import {
  CreateForm,
  CreateRequest,
  FormHeader,
  Request,
  Status,
} from "domain/models";
import { jwtDecode } from "jwt-decode";
import CreateRequestUseCase from "domain/usecases/request/createRequest.use.case";
import GetAportantStatusUseCase from "domain/usecases/aportant/getAportantStatus";

interface FileWithFlag {
  file: File;
  show: boolean;
}

type IResultProcess = {
  isFail: boolean;
  bodyMsg: string;
  processType: string;
  radicate?: Request;
};

export const IndependentStepSix = () => {
  const stateRnec = useAppSelector((state) => state.rnec.stateRnec);
  const router = useRouter();
  const { data: session, status } = useSession();
  const independentForm = useAppSelector((state) => state.independentSlice);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [susResult, setSusResult] = useState<IResultProcess>();
  const [finalResult, setFinalResult] = useState(false);

  const [filesSelected, setFilesSelected] = useState<FileWithFlag[]>([
    { file: new File([], "empty.PDF", { type: ".PDF" }), show: false },
    { file: new File([], "empty.PDF", { type: ".PDF" }), show: false },
    { file: new File([], "empty.PDF", { type: ".PDF" }), show: false },
    { file: new File([], "empty.PDF", { type: ".PDF" }), show: false },
    { file: new File([], "empty.PDF", { type: ".PDF" }), show: false },
    { file: new File([], "empty.PDF", { type: ".PDF" }), show: false },
    { file: new File([], "empty.PDF", { type: ".PDF" }), show: false },
  ]);

  const createRequestUseCase = appContainer.get<CreateRequestUseCase>(
    USECASES_TYPES._CreateRequestUseCase
  );

  const getAportantStatusUseCase = appContainer.get<GetAportantStatusUseCase>(
    USECASES_TYPES._GetAportantStatusUseCase
  );

  const addFile = (fileToAdd: File[], index: number) => {
    setFilesSelected((files) => {
      files[index] = { file: fileToAdd[0], show: true };
      return files;
    });
  };
  const removeFile = (fileToRemove: File[], index: number) => {
    setFilesSelected((files) => {
      files[index] = {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: true,
      };
      return files;
    });
  };

  const sendData = async () => {
    setLoading(true);
    let {
      identification_number,
      identification_type,
      preferred_username,
      family_name,
      given_name,
      email,
    } = jwtDecode(session?.access_token!) as UserDataInterface;

    const newList = filesSelected.filter((vals) => vals.show == true);
    for (let index = 0; index < newList.length; index++) {
      const element = newList[index];
      if (element.file.size == 0) {
        setModalOpen(true);
        setModalMessage("Faltan documentos por subir");
        return;
      }
    }

    // Find identificationType
    const titularIdentificationTypeNomenclature =
      identificationTypeNomenclature(identification_type ?? "");

    let indepFormAux = { ...independentForm.independentForm };

    const identificationTypeT = identificationTypeNomenclature(
      indepFormAux.TipoIdentTrab ?? ""
    );
    //TESTING
    // indepFormAux.NroIdentTrab = "555366006";

    // Validates correct documenttypes setted
    if (
      !titularIdentificationTypeNomenclature ||
      !indepFormAux.NroIdentTrab ||
      !indepFormAux.TipoIdentTrab
    ) {
      setLoading(false);
      return;
    }

    const status = await getAportantStatusUseCase.execute(
      session?.access_token!,
      indepFormAux.NroIdentTrab,
      indepFormAux.TipoIdentTrab,
      APORTANT_TYPE
    );

    const earnings = {
      "Ingreso económico": indepFormAux.ValorIngreso,
      "Modalidad de aporte":
        APORTANT_CATEGORY_SAP[indepFormAux.CategoriaAportante!],

      "Actividad Económica": indepFormAux.TituloSPCACTEcon,
      Ocupación: indepFormAux.TituloOcupacion,
      EPS: EPS_LIST.find((values) => values.value == indepFormAux.CodEPS)
        ?.label,
      "Has estado afiliado a otra caja":
        indepFormAux.CajaCompensacion == "0" ? "Si" : "No",
    };

    const personalData = {
      "Tipo de identificación": indepFormAux.TituloTipoIdentTrab,
      "Número de identificación": indepFormAux.NroIdentTrab,
      "Nombre completo": `${indepFormAux.Nombre1} ${
        indepFormAux.Nombre2 ?? ""
      } ${indepFormAux.PrimerApellido} ${
        indepFormAux.SegundoApellido ?? ""
      }`.trim(),
      "Fecha de nacimiento": indepFormAux.FechaNacimiento,
    };

    const identity = {
      "Estado Civil": CIVIL_STATUS.find(
        (values) => values.value == indepFormAux.EstadoCivil
      )?.label,
      Género: GENDER.find((values) => values.value == indepFormAux.Sexo)?.label,
      "Nivel académico": ACADEMIC_LEVEL.find(
        (values) => values.value == indepFormAux.NivelEscolaridad
      )?.label,
      "Orientación sexual": SEXUAL_PREFERENCE.find(
        (values) => values.value == indepFormAux.OrientacionSexual
      )?.label,
      "Factor de vulnerabilidad": VULNERABILITY_FACT.find(
        (values) => values.value == indepFormAux.FactorVulnerabilidad
      )?.label,
      Nacionalidad: indepFormAux.TituloNacionalidad,
      "Pertenencia étnica": ETNICHITY.find(
        (values) => values.value == indepFormAux.Pertenencia_Etnica
      )?.label,
      Resguardo: indepFormAux.TituloResguardo,
      "Pueblo indígena": indepFormAux.TituloPuebloIndigena,
      "Taxista independiente": indepFormAux.Taxi == "0" ? "Si" : "No",
    };

    const address = {
      Dirección: indepFormAux.Direccion,
      "Dirección restante": indepFormAux.DireccionRestante,
      Ciudad: indepFormAux.TituloCiudad,
      Departamento: indepFormAux.TituloDepartamento,
    };

    const headerForm: FormHeader = {
      version: "0.0.1",
      template: "afiliacion-independientes",
    };

    const createForm: CreateForm = {
      header: headerForm,
      content: {
        sapData: indepFormAux,
        portantSatus: status,
        usuarioSolicitante: {
          tipoDocumento: identification_type,
          numeroDocumento: identification_number,
          nombre: `${given_name} ${family_name}`.toUpperCase(),
          correo: email,
          celular: preferred_username,
        },
        proof: [
          {
            "Tipo de independiente": {
              "Tipo de independiente": "Independiente",
            },
          },
          { "Información de tus ingresos": earnings },
          { "Datos Personales": personalData },
          { "Información demográfica": identity },
          { "Datos de Ubicación y Contacto": address },
        ],
      },
    };

    let filesSelectedAux: File[] = [];
    const filesSelectedTemp: FileWithFlag[] = [...filesSelected];
    for (let index = 0; index < filesSelectedTemp.length; index++) {
      const element = filesSelectedTemp[index];
      filesSelectedAux.push(element.file);
    }

    const requestData: CreateRequest = {
      statusRnec: stateRnec,
      statusId: 1,
      userDocument: indepFormAux.NroIdentTrab,
      userTypeDocument: identificationTypeT,
      userFullName: `${indepFormAux.Nombre1} ${indepFormAux.Nombre2 ?? ""} ${
        indepFormAux.PrimerApellido
      } ${indepFormAux.SegundoApellido ?? ""}`
        .trim()
        .toUpperCase(),
      campaignId: "9", //TODO:Estandarizar nueva campaña
      workflowId: "584e0042-ef41-43cd-a137-19b6b5e5d4bf",
      referenceAcronym: "AFI",
      form: createForm,
    };
    const resultCreateRequestUseCase = await createRequestUseCase.execute(
      session?.access_token!,
      requestData,
      filesSelectedAux
    );

    const result: IResultProcess = {
      bodyMsg: "Consulta el estado de la solicitud en la opción Radicados.",
      isFail: false,
      processType: "",
      radicate: resultCreateRequestUseCase,
    };
    if (resultCreateRequestUseCase) {
      const status: Status = {
        id: resultCreateRequestUseCase.statusId!,
        name: FILED_STATUS[resultCreateRequestUseCase.statusId!],
        description: FILED_STATUS[resultCreateRequestUseCase.statusId!],
        type: 1,
        createdAt: "",
        updatedAt: "",
      };
      resultCreateRequestUseCase.status = status;
      result.radicate = resultCreateRequestUseCase;
      setSusResult(result);
      setFinalResult(true);
      setLoading(false);
    } else {
      result.isFail = true;
      setSusResult(result);
      setFinalResult(true);
      setLoading(false);
    }
    setFilesSelected(filesSelectedTemp);
  };

  useEffect(() => {
    setLoading(true);
    if (
      !independentForm.independentForm ||
      !independentForm.independentForm.CodigoDepartamento ||
      !independentForm.independentForm.TituloDepartamento ||
      !independentForm.independentForm.CodigoCiudad ||
      !independentForm.independentForm.TituloCiudad ||
      !independentForm.independentForm.Direccion
    ) {
      router.back();
      return;
    }
    const indepFormAux = { ...independentForm.independentForm };
    let filesAux = [...filesSelected];

    if (indepFormAux.CajaCompensacion == "0") {
      filesAux[0].show = true;
      filesAux[1].show = true;
      filesAux[2].show = true;
    } else {
      filesAux[0].show = true;
      filesAux[1].show = true;
    }

    setFilesSelected(filesAux);
    setLoading(false);

    return;
  }, []);

  return (
    <div className="w-full h-full pr-20">
      {loading ? (
        <div className="flex w-full h-full justify-center items-center">
          <LoadingAnimation className="w-full h-full max-h-14 min-h-14 mt-4 bg-none flex justify-center items-center overflow-hidden" />
        </div>
      ) : (
        <IndependentTemplate
          mainTitle="Afiliación independiente"
          description={
            !finalResult
              ? "Confirma tus datos personales para continuar la solicitud"
              : ""
          }
          buttonTitle="Finalizar"
          onBackButton={() => {
            router.back();
          }}
          onNextButton={async () => {
            sendData();
          }}
          hideButton={!finalResult}
        >
          <Conditional showWhen={!loading && !finalResult}>
            <StepSection
              number={6}
              descriptionStep="Documentos soporte"
              className="w-4/5"
            />

            <Description
              text={
                "Para completar la verificación, adjunta los documentos en PDF legibles y vigentes. Asegúrate de que no tengan contraseñas y que el tamaño sea de hasta 5 MB. "
              }
              className="text-sm font-normal text-principal-320 mb-1 my-5"
            />
            {filesSelected.map((values, index) => {
              return (
                values.show && (
                  <Dropzone
                    key={index}
                    className="w-4/5 mt-10"
                    onChange={(value) => {
                      addFile(value, index);
                    }}
                    onDelete={(value) => {
                      removeFile(value, index);
                    }}
                    title={INDEPENDENT_DOCS_TITLE[index]}
                  />
                )
              );
            })}
          </Conditional>
        </IndependentTemplate>
      )}
      {/* Succes screen  */}
      {susResult != undefined && !loading && finalResult && (
        <div className="h-full">
          <div className="h-[80%]">
            <FiledLayout
              radicate={susResult.radicate}
              bodyMsg={susResult.bodyMsg}
              isFail={susResult.isFail}
            />
          </div>

          <div className="flex w-full h-[20%] justify-end">
            <Button
              label="Ir a Radicados"
              primary={true}
              className="w-96 rounded-full mt-6"
              onClick={() => {
                router.push("/menu-affiliations/filed");
              }}
            />
          </div>
        </div>
      )}
      <ModalSecondTemplate
        isOpen={modalOpen}
        className="w-[calc(524px)]"
        onButtonClick={() => setModalOpen(false)}
      >
        <div className="flex flex-row justify-center">
          <AlertIcon className="top-4" />
          <p className="pt-16 text-lg font-poppins text-center text-principal-180">
            {modalMessage}
          </p>
        </div>
      </ModalSecondTemplate>
    </div>
  );
};

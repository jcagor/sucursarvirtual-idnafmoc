"use client";
import { useRouter } from "next/navigation";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { IndependentTemplate } from "../../IndependentTemplate";
import { Dropzone, StepSection } from "presentation/components/molecules";
import {
  SimplyConstributionFormValuesType,
  SimplyContributionForm,
} from "presentation/components/organisms";
import * as Yup from "yup";
import { FormikProps, isEmptyArray, useFormik } from "formik";
import {
  AlertIcon,
  Button,
  Description,
  LoadingAnimation,
} from "presentation/components/atoms";
import {
  ACADEMIC_LEVEL,
  APORTANT_TYPE,
  AUTH_LOADING_STATUS,
  AUTHENTICATED_STATUS,
  CIVIL_STATUS,
  Conditional,
  CONFIG_SMM,
  ETNICHITY,
  FILED_STATUS,
  GENDER,
  identificationTypeNomenclature,
  INDEPENDENT_DOCS_TITLE,
  SelectOption,
  SEXUAL_PREFERENCE,
  UserDataInterface,
  VULNERABILITY_FACT,
} from "lib";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "presentation/store";
import { FiledLayout } from "presentation/components/templates/affiliations";
import { ModalSecondTemplate } from "presentation/components/templates/filed";
import {
  CreateForm,
  CreateRequest,
  FormHeader,
  independentForm,
  Request,
  Status,
} from "domain/models";
import { jwtDecode } from "jwt-decode";
import CreateRequestUseCase from "domain/usecases/request/createRequest.use.case";
import { DateObject } from "react-multi-date-picker";
import GetAportantStatusUseCase from "domain/usecases/aportant/getAportantStatus";
import GetEconomicActivityUseCase from "domain/usecases/economicActivity/getEconomicActivity.use.case";
import GetConfigurationUseCase from "domain/usecases/configuration/getConfiguration.use.case";

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

export const ForeignStepFour = () => {
  const stateRnec = useAppSelector((state) => state.rnec.stateRnec);
  const router = useRouter();
  const { data: session, status } = useSession();
  const statusSession = status;
  const independentForm = useAppSelector((state) => state.independentSlice);

  const [loading, setLoading] = useState(false);
  const [finalResult, setFinalResult] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [susResult, setSusResult] = useState<IResultProcess>();
  const [gettingOptions, setGettingOptions] = useState<boolean>(true);
  const [authDefined, setAuthDefined] = useState<boolean>();
  const [activityOptions, setActivityOptions] = useState<SelectOption[]>();
  const [smm, setSmm] = useState<number>(0);
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

  const economicActivityUseCase = appContainer.get<GetEconomicActivityUseCase>(
    USECASES_TYPES._GetEconomicActivityUseCase
  );

  const configurationRepository = appContainer.get<GetConfigurationUseCase>(
    USECASES_TYPES._GetConfigurationUseCase
  );

  const formikInitialValues: SimplyConstributionFormValuesType = {
    affiliation: "",
    economic: "",
    income: "",
  };
  const formModuleOnePacsSchema = Yup.object().shape({
    income: Yup.string().required("Campo obligatorio *"),
    economic: Yup.string().required("Campo obligatorio *"),
    affiliation: Yup.string().required("Campo obligatorio *"),
  });

  const formikForm: FormikProps<SimplyConstributionFormValuesType> = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formModuleOnePacsSchema,
  });

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

  const getDateForward = (date: DateObject, split: string) => {
    const dateSplit: string[] = date.toString().split(split);
    if (dateSplit.length == 0) {
      return "";
    }

    return `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`;
  };

  const validateDocs = async () => {
    setFilesSelected((files) => {
      if (formikForm.values.affiliation?.toString() == "0") {
        files[3].show = true;
        files[4].show = true;
        files[5].show = true;
        files[6].show = true;
      } else {
        files[3].show = true;
        files[4].show = true;
        files[5].show = true;
        files[6].show = false;
      }
      return files;
    });
    setLoading(false);
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

    let filesAux = [...filesSelected];

    setFilesSelected(filesAux);
    setLoading(false);

    return;
  }, []);

  useEffect(() => {
    setLoading(true);

    validateDocs();

    return;
  }, [formikForm.values]);

  const getOptions = async () => {
    const config = await configurationRepository.execute(
      CONFIG_SMM,
      session?.access_token
    );
    const activities = await economicActivityUseCase.execute(
      session?.access_token
    );

    if (!activities || !config) {
      return;
    }

    const activitiesAux = activities.map((activity) => {
      return {
        value: activity.code,
        label: `${activity.code} - ${activity.name}`,
      };
    });
    setSmm(parseInt(config.value.SMM));
    setActivityOptions(activitiesAux);
    setGettingOptions(false);
  };

  const sendData = async () => {
    setLoading(true);
    await formikForm.submitForm();
    const errorsFormObject = await formikForm.validateForm();

    // Catch errors array
    const errorsFirtForm = Object.values(errorsFormObject);
    const valueIncome = formikForm.values
      .income!.replaceAll(".", "")
      .replaceAll(" ", "")
      .replaceAll("$", "");

    if (parseInt(valueIncome) < smm) {
      formikForm.setFieldError(
        "income",
        "El valor ingresado no puede ser inferior al salario mínimo del año en curso."
      );
      setLoading(false);

      return;
    }
    if (!isEmptyArray(errorsFirtForm)) {
      setLoading(false);

      return;
    }
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
        setLoading(false);

        return;
      }
    }

    // Find identificationType
    const titularIdentificationTypeNomenclature =
      identificationTypeNomenclature(identification_type ?? "");

    let indepFormAux = {
      ...independentForm.independentForm,
      ValorIngreso: valueIncome,
      SPCACTEcon: formikForm.values.economic,
      cajaCompensacion: formikForm.values.affiliation,
      CorreoElectronico: email,
      TipoAfiliado: "1",
      FechaAporte: getDateForward(new DateObject(), "/"),
      FechaAfiliacion: getDateForward(new DateObject(), "/"),
      CategoriaAportante: "I2",
    };
    //testing
    // indepFormAux.NroIdentTrab = "16456";
    const identificationTypeT = identificationTypeNomenclature(
      indepFormAux.TipoIdentTrab ?? ""
    );
    //TESTING
    // indepFormAux.NroIdentTrab = "11456";

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
      "Nacionalidad de residencia": indepFormAux.TitularForeignNationality,
      "Pertenencia étnica": ETNICHITY.find(
        (values) => values.value == indepFormAux.Pertenencia_Etnica
      )?.label,
      Resguardo: indepFormAux.TituloResguardo,
      "Pueblo indígena": indepFormAux.TituloPuebloIndigena,
    };

    const address = {
      Dirección: indepFormAux.Direccion,
      "Dirección restante": indepFormAux.DireccionRestante,
      "Teléfono celular": indepFormAux.TelefonoCel,
      Ciudad: indepFormAux.TituloCiudad,
      Departamento: indepFormAux.TituloDepartamento,
    };

    const earnings = {
      "Ingreso económico": indepFormAux.ValorIngreso,
      "Actividad Económica": activityOptions?.find(
        (values) => values.value == indepFormAux.SPCACTEcon
      )?.label,
      "Has estado afiliado a otra caja":
        formikForm.values.affiliation == "0" ? "Si" : "No",
    };

    const headerForm: FormHeader = {
      version: "0.0.1",
      template: "afiliacion-independientes",
    };

    const createForm: CreateForm = {
      header: headerForm,
      content: {
        sapData: indepFormAux,
        aportantSatus: status,
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
              "Tipo de independiente": "Vive en el exterior",
            },
          },
          { "Datos Personales": personalData },
          { "Información de identidad": identity },
          { "Datos de Ubicación y Contacto": address },
          { "Información de tus ingresos": earnings },
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
    // Loading
    setGettingOptions(true);
    if (authDefined) {
      getOptions();
    }
  }, [authDefined]);

  useEffect(() => {
    if (statusSession == AUTH_LOADING_STATUS) {
      setAuthDefined(false);
      return;
    }
    setAuthDefined(true);
    if (!(statusSession == AUTHENTICATED_STATUS)) {
      router.push("affiliations");
    }
  }, [statusSession]);

  return (
    <div className="w-full h-full pr-20">
      {loading ? (
        <div className="flex w-full h-full justify-center items-center">
          <LoadingAnimation className="w-full h-full max-h-14 min-h-14 mt-4 bg-none flex justify-center items-center overflow-hidden" />
        </div>
      ) : (
        <IndependentTemplate
          mainTitle="Afiliación independiente en el extranjero"
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
            await sendData();
          }}
          hideButton={!finalResult}
        >
          <Conditional showWhen={!loading && !finalResult}>
            <StepSection
              number={5}
              descriptionStep="Información de tus ingresos"
              className="w-4/5"
            />
            {!gettingOptions ? (
              <SimplyContributionForm
                formik={formikForm}
                classnameContainer="mx-6 my-12"
                activityOptions={activityOptions!}
              />
            ) : (
              <></>
            )}
            <StepSection
              number={6}
              descriptionStep="Documentos soporte"
              className="w-4/5 mt-20"
            />

            <Description
              text={
                "Para completar la verificación, adjunta los documentos en PDF legibles y vigentes. Asegúrate de que no tengan contraseñas y que el tamaño sea de hasta 5 MB. "
              }
              className="text-sm font-normal text-principal-320 mb-1 my-5"
            />
            <>
              {!loading &&
                filesSelected.map((values, index) => {
                  return (
                    values.show && (
                      <Dropzone
                        key={index}
                        className="w-4/5 relative mt-10"
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
            </>
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

"use client";
import {
  CreateForm,
  CreateRequest,
  FormHeader,
  PAC,
  Request,
  RightsVerifyInterface,
  Status,
  UpdateRequest,
} from "domain/models";
import CreateRequestUseCase from "domain/usecases/request/createRequest.use.case";
import UpdateRequestUseCase from "domain/usecases/request/updateRequest.use.case";
import RightsVerifyUseCase from "domain/usecases/rightsChecker/rightsVerify.use.case";
import WithdrawalPacUseCase from "domain/usecases/withdrawal/WithdrawalPac.use.case";
import { FormikProps, isEmptyArray, useFormik } from "formik";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import {
  CAMPAIGN_PAC_WITHDRAWAL_APROVED_CODE,
  CAMPAIGN_PAC_WITHDRAWAL_CODE,
  Conditional,
  DEATH_PAC,
  END_PAC,
  FILED_STATUS,
  FILED_STATUS_IN_PROGRESS_CODE,
  FILED_STATUS_SUCCESSFULLY_PROCESSED_CODE,
  formatMessageLogString,
  identificationTypeNomenclature,
  NO_DEPENDENT_PAC,
  REASON_WITHDRAWAL,
  REASON_WITHDRAWAL_PAC,
  RELATIONSHIP,
  SelectOption,
  SON_SAP_CODE,
  SPOUSE_SAP_CODE,
  STEPSON_SAP_CODE,
  UserDataInterface,
} from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AlertIcon,
  Button,
  Description,
  Divider,
  Dropzone,
  FailIcon,
  FiledLayout,
  FiledLayoutProps,
  ModalSecondTemplate,
  PacCard,
  SecondaryText,
} from "presentation";
import {
  FormWithdrawalPacs,
  FormWithdrawalPacsValuesType,
} from "presentation/components/organisms/affiliations";
import { useAppSelector } from "presentation/store";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import * as Yup from "yup";
type IResultProcess = {
  isFail: boolean;
  bodyMsg: string;
  processType: string;
  radicate: Request;
};
export const WithdrawalPacsComponent = () => {
  const { data: session, status } = useSession();
  const pacSelected = useAppSelector((state) => state.pacSlice.pac);
  const router = useRouter();
  const title = `Retiro del Beneficiario`;
  const formikInitialValues: FormWithdrawalPacsValuesType = {
    reasonWithdrawal: "",
    affiliationDate: undefined,
    deathDate: undefined,
  };
  const formModuleOnePacsSchema = Yup.object().shape({
    reasonWithdrawal: Yup.string().required("El motivo de retiro es requerido"),
    deathDate: Yup.string().when(
      "reasonWithdrawal",
      (reasonWithdrawal: string[], schema) => {
        if (reasonWithdrawal[0] == DEATH_PAC.value) {
          return schema.required("La fecha de fallecimiento se requerida");
        }
        return schema;
      }
    ),
  });
  const formikForm: FormikProps<FormWithdrawalPacsValuesType> = useFormik({
    initialValues: formikInitialValues,
    onSubmit: (values) => {
      return;
    },
    validationSchema: formModuleOnePacsSchema,
    validateOnMount: false,
  });
  const createRequestUseCase = appContainer.get<CreateRequestUseCase>(
    USECASES_TYPES._CreateRequestUseCase
  );

  const withdrawalPacUseCase = appContainer.get<WithdrawalPacUseCase>(
    USECASES_TYPES._WithdrawalPacUseCase
  );

  const verifyRightsCase = appContainer.get<RightsVerifyUseCase>(
    USECASES_TYPES._RightsVerifyUseCase
  );

  const updateRequestUseCase = appContainer.get<UpdateRequestUseCase>(
    USECASES_TYPES._UpdateRequestUseCase
  );

  const [name, setName] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const [kindship, setKindship] = useState<string>("");
  const [susResult, setSusResult] = useState<FiledLayoutProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [reasons, setReasons] = useState<SelectOption[]>([]);
  const [filesSelected, setFilesSelected] = useState<File[]>([
    new File([], "empty.PDF", { type: ".PDF" }),
    new File([], "empty.PDF", { type: ".PDF" }),
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const getFullName = (pac: PAC) => {
    const firstName = pac.PACPrimerNombre ? pac.PACPrimerNombre : "";
    const secondName = pac.PACSegundoNombre ? pac.PACSegundoNombre : "";
    const firstLastName = pac.PACPrimerApellido ? pac.PACPrimerApellido : "";
    const secondLastName = pac.PACSegundoApellido ? pac.PACSegundoApellido : "";

    return `${firstName} ${secondName} ${firstLastName} ${secondLastName}`;
  };

  const getDocument = (pac: PAC) => {
    const findType = identificationTypeNomenclature(pac.PACTipoDocumento);
    if (findType) {
      return `${findType} ${pac.PACNumeroDocumento}`;
    } else {
      return `${pac.PACNumeroDocumento}`;
    }
  };
  const getRelationship = (pac: PAC) => {
    const findRelation = RELATIONSHIP.find(
      (rel) => rel.value === pac.Parentesco
    );
    if (findRelation) {
      return findRelation.label;
    } else {
      return "";
    }
  };
  const getDate = (date: DateObject) => {
    // Format "DD | MM | YYYY"
    let bornDate: string[] | undefined = date
      .toString()
      .replace(/ /g, "")
      .split("|");
    // Format "AAAAMMDD"
    if (bornDate.length < 2) {
      bornDate = date.toString().replace(/ /g, "").split("/");
      return `${bornDate?.[0]}${bornDate?.[1]}${bornDate?.[2]}`;
    }

    return `${bornDate?.[2]}${bornDate?.[1]}${bornDate?.[0]}`;
  };
  const susProcess = async () => {
    if (!session || !session.access_token) {
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
    // identification_number = "66948178";

    const userIdentificationTypeNomenclature = identificationTypeNomenclature(
      identification_type ?? ""
    );

    const headerForm: FormHeader = {
      version: "0.0.1",
      template: "retiro-pacs",
    };
    // Create Radicate's Form
    const createForm: CreateForm = {
      header: headerForm,
      content: {
        sapData: {
          tipoAfiliado: pacSelected?.DescripcionParentesco,
          tipoDocumento: userIdentificationTypeNomenclature,
          numeroDocumento: identification_number,
          tipoDocumentoAfiliado: pacSelected?.PACTipoDocumento,
          numeroDocumentoAfiliado: pacSelected?.PACNumeroDocumento,
          fechaVigenciaHasta: getDate(new DateObject()),
          motivoRetiro: formikForm.values.reasonWithdrawal,
          afiliacion: getDate(formikForm.values.affiliationDate!),
          fallecimiento: formikForm.values.deathDate
            ? getDate(formikForm.values.deathDate)
            : "",
        },
        userDocument: pacSelected?.PACNumeroDocumento,
        userTypeDocument: identificationTypeNomenclature(
          pacSelected?.PACTipoDocumento ?? ""
        ),
        usuarioSolicitante: {
          correo: session?.user?.email,
          nombre: session?.user?.name,
        },
        userName: `${pacSelected?.PACPrimerNombre} ${
          pacSelected?.PACSegundoNombre ?? ""
        } ${pacSelected?.PACPrimerApellido} ${
          pacSelected?.PACSegundoApellido ?? ""
        }`.toUpperCase(),
      },
    };
    // Create Radicate
    const requestData: CreateRequest = {
      statusId: 1,
      userDocument: identification_number,
      userTypeDocument: identification_type,
      userFullName: `${given_name} ${family_name}`.toUpperCase(),
      campaignId: CAMPAIGN_PAC_WITHDRAWAL_CODE.toString(),
      workflowId: "584e0042-ef41-43cd-a137-19b6b5e5d4bb",
      referenceAcronym: "AFI",
      form: createForm,
    };
    if (
      formikForm.values.reasonWithdrawal == DEATH_PAC.value ||
      formikForm.values.reasonWithdrawal == END_PAC.value
    ) {
      requestData.campaignId = CAMPAIGN_PAC_WITHDRAWAL_APROVED_CODE.toString();
    }

    const resultCreateRequestUseCase = await createRequestUseCase.execute(
      session?.access_token!,
      requestData,
      filesSelected
    );
    return resultCreateRequestUseCase;
  };

  const processStepSonWithdrawals = async (
    verifyRightsResponse: RightsVerifyInterface,
    date: string
  ) => {
    let { identification_number, identification_type } = jwtDecode(
      session?.access_token!
    ) as UserDataInterface;
    const spoucePacs =
      verifyRightsResponse.pacs?.filter(
        (pac) => pac.Parentesco === STEPSON_SAP_CODE
      ) ?? [];

    if (spoucePacs.length === 0) return false;

    let allSuccess = true;
    for (const element of spoucePacs) {
      const sapResponseWithdrawal = await withdrawalPacUseCase.execute(
        verifyRightsResponse.TitularGrupoAfiliado ?? "",
        identificationTypeNomenclature(identification_type ?? "") ?? "",
        identification_number ?? "",
        element.PACTipoDocumento ?? "",
        element.PACNumeroDocumento ?? "",
        date,
        NO_DEPENDENT_PAC.value!,
        session?.access_token
      );
      if (!sapResponseWithdrawal) allSuccess = false;
    }
    return allSuccess;
  };

  const isEndingSpouce = () => {
    return (
      pacSelected?.Parentesco === SPOUSE_SAP_CODE &&
      formikForm.values.reasonWithdrawal === END_PAC.value
    );
  };

  const processWithdrawal = async (
    titular: string,
    pac: PAC | undefined,
    date: string
  ) => {
    let { identification_number, identification_type } = jwtDecode(
      session?.access_token!
    ) as UserDataInterface;
    return await withdrawalPacUseCase.execute(
      titular,
      identificationTypeNomenclature(identification_type ?? "") ?? "",
      identification_number ?? "",
      pac?.PACTipoDocumento ?? "",
      pac?.PACNumeroDocumento ?? "",
      date,
      formikForm.values.reasonWithdrawal!,
      session?.access_token
    );
  };

  const getVerifyRightsResponse = async () => {
    return await verifyRightsCase.execute(
      pacSelected?.PACNumeroDocumento ?? "",
      pacSelected?.PACTipoDocumento ?? "",
      session?.access_token
    );
  };

  const formatWithdrawalDate = (todayDate: DateObject) => {
    const month =
      todayDate.month.number! > 9 ? todayDate.month : `0${todayDate.month}`;
    const day = todayDate.day! > 9 ? todayDate.day : `0${todayDate.day}`;
    return `${todayDate.year}${month}${day}`;
  };

  const sapProcess = async () => {
    let {
      identification_number,
      identification_type,
      preferred_username,
      family_name,
      given_name,
      email,
    } = jwtDecode(session?.access_token!) as UserDataInterface;
    // TEST
    // identification_number = "66948178";

    const todayDate = new DateObject();
    const withdrawalDateFormat = formatWithdrawalDate(todayDate);
    const userIdentificationTypeNomenclature = identificationTypeNomenclature(
      identification_type ?? ""
    );

    const verifyRightsResponse = await getVerifyRightsResponse();
    if (!verifyRightsResponse) return "Error al verificar derechos.";

    const sapResponse = await processWithdrawal(
      verifyRightsResponse.TitularGrupoAfiliado ?? "",
      pacSelected,
      withdrawalDateFormat
    );
    if (!sapResponse)
      return "Error, no se obtuvo respuesta de SAP desafiliando el beneficiario";

    if (isEndingSpouce()) {
      const success = await processStepSonWithdrawals(
        verifyRightsResponse,
        withdrawalDateFormat
      );
      if (!success)
        return "Error, no se obtuvo respuesta de SAP desafiliando el hijastro producto del conyuge";
    }

    return sapResponse;
  };

  const addFile = (fileToAdd: File[], index: number) => {
    setFilesSelected((files) => {
      files[index] = fileToAdd[0];
      return files;
    });
  };

  const removeFile = (fileToRemove: File[], index: number) => {
    setFilesSelected((files) => {
      files[index] = new File([], "empty.PDF", { type: ".PDF" });
      return files;
    });
  };

  const withdrawal = async () => {
    setIsLoading(true);
    const errorsFormObject = await formikForm.validateForm();
    if (!isEmptyArray(Object.values(errorsFormObject))) {
      return;
    }

    const numberDocsUpload: number = filesSelected.filter(
      (values) => values.size != 0
    ).length;

    if (
      numberDocsUpload === 0 &&
      (formikForm.values.reasonWithdrawal === DEATH_PAC.value ||
        formikForm.values.reasonWithdrawal === END_PAC.value)
    ) {
      setModalMessage("Faltan documentos por subir");
      setShowModal(true);
      setIsLoading(false);
      return false;
    }

    const susProcessResult: Request | undefined = await susProcess();

    if (susProcessResult) {
      const result: FiledLayoutProps = {
        bodyMsg:
          "Consulta el estado de la solicitud beneficiarios en la opción Radicados.",
        isFail: false,
        radicate: susProcessResult,
      };
      // ==================== IN CASE OF REQUIRED APPROVAL FLOW ====================
      if (
        formikForm.values.reasonWithdrawal == DEATH_PAC.value ||
        formikForm.values.reasonWithdrawal == END_PAC.value
      ) {
        const status: Status = {
          id: susProcessResult.statusId!,
          name: FILED_STATUS[susProcessResult.statusId!],
          description: FILED_STATUS[susProcessResult.statusId!],
          type: 1,
          createdAt: "",
          updatedAt: "",
        };
        susProcessResult.status = status;
        result.radicate = susProcessResult;

        setSusResult(result);
        setShowResult(true);
        setIsLoading(false);
        return;
      }
      // ==================== IN CASE OF NON REQUIRED APPROVAL FLOW ====================

      const affiliationSapResult = await sapProcess();

      if (Array.isArray(affiliationSapResult)) {
        const requestTemp: UpdateRequest = {
          statusId: FILED_STATUS_SUCCESSFULLY_PROCESSED_CODE,
          reason: `Retiro Beneficiaro con error: ${formatMessageLogString(
            affiliationSapResult
          )}`,
        };
        const update = await updateRequestUseCase.execute(
          susProcessResult.id,
          requestTemp,
          session?.access_token!
        );

        if (update) {
          const status: Status = {
            id: update.statusId!,
            name: FILED_STATUS[update.statusId!],
            description: FILED_STATUS[update.statusId!],
            type: 1,
            createdAt: "",
            updatedAt: "",
          };
          update.status = status;
          result.radicate = update;
        }
      } else {
        const requestTemp: UpdateRequest = {
          statusId: FILED_STATUS_IN_PROGRESS_CODE,
          reason: `Retiro Beneficiaro con error: ${affiliationSapResult}`,
        };
        let update = await updateRequestUseCase.execute(
          susProcessResult.id,
          requestTemp,
          session?.access_token!
        );

        if (update) {
          const status: Status = {
            id: update.statusId!,
            name: FILED_STATUS[update.statusId!],
            description: FILED_STATUS[update.statusId!],
            type: 1,
            createdAt: "",
            updatedAt: "",
          };
          update.status = status;
          result.radicate = update;
        }
        result.isFail = false;
      }
      setSusResult(result);
      setShowResult(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!pacSelected) {
      router.back();
      return;
    }
    setName(getFullName(pacSelected));
    setDocument(getDocument(pacSelected));
    setKindship(getRelationship(pacSelected));
    formikForm.setFieldValue(
      "affiliationDate",
      new DateObject(pacSelected.PACFechaInicioVigencia)
    );

    let reasonConstants: SelectOption[];

    reasonConstants = REASON_WITHDRAWAL_PAC[pacSelected.Parentesco];

    if (
      parseInt(pacSelected.PACEdad.trim()) < 18 &&
      pacSelected.Parentesco == SON_SAP_CODE
    ) {
      reasonConstants = [DEATH_PAC];
    }

    setReasons(reasonConstants);
  }, []);

  return (
    <div className="w-full h-full pr-20">
      {!showResult && (
        <section className={"w-[90%]"}>
          <PacCard
            name={name}
            document={document}
            kinship={kindship}
            classname="mb-8"
          />
          <Divider className="my-5 " />
          <Description
            className="text-[calc(16px)] font-bold text-principal-180 font-outfit mt-5"
            text={title}
          />
          <FormWithdrawalPacs reasons={reasons} formik={formikForm} />
          <Conditional
            showWhen={
              formikForm.values.reasonWithdrawal == DEATH_PAC.value ||
              formikForm.values.reasonWithdrawal == END_PAC.value
            }
          >
            <div className="flex flex-wrap w-[59.75rem] mt-10">
              <Description
                className="w-full text-lg font-semibold text-principal-180 mt-3"
                text="Para llevar a cabo una verificación adecuada, por favor adjunta documentos legales y vigentes."
              />
              <Description
                className="w-full text-sm font-normal text-principal-180"
                text="(Los documentos no deben tener contraseña y su peso máximo permitido es de 5 MB)"
              />
            </div>
            <Conditional
              showWhen={formikForm.values.reasonWithdrawal == DEATH_PAC.value}
            >
              <div className="flex flex-wrap w-[59.75rem]">
                <Dropzone
                  className="w-full mt-8"
                  onChange={(value) => {
                    addFile(value, 0);
                  }}
                  onDelete={(value) => {
                    removeFile(value, 0);
                  }}
                  title="Soporte Registro Civil de Defunción"
                />
              </div>
            </Conditional>
            <Conditional
              showWhen={formikForm.values.reasonWithdrawal == END_PAC.value}
            >
              <div className="flex flex-wrap w-[59.75rem]">
                <Dropzone
                  className="w-full mt-8"
                  onChange={(value) => {
                    addFile(value, 1);
                  }}
                  onDelete={(value) => {
                    removeFile(value, 1);
                  }}
                  title="Certificación de fin convivencia"
                />
              </div>
            </Conditional>
          </Conditional>

          <ModalSecondTemplate
            isOpen={showModal}
            className="w-[calc(524px)]"
            onButtonClick={() => setShowModal(false)}
          >
            <div className="flex flex-row justify-center">
              <AlertIcon className="top-4" />
              <p className="pt-16 text-lg font-poppins text-center text-principal-180">
                {modalMessage}
              </p>
            </div>
          </ModalSecondTemplate>

          <div className="flex flex-wrap flex-row pb-10">
            <div className="flex w-full justify-between pt-9">
              <div
                onClick={() => {
                  router.back();
                }}
                className="self-center flex w-1/5"
              >
                <SecondaryText
                  text="Atrás"
                  className="font-outfit text-[calc(20px)] font-normal text-principal-180"
                />
              </div>
              <div className="self-center flex w-1/5">
                <Button
                  onClick={async () => {
                    if (!isLoading) {
                      await withdrawal();
                    }
                  }}
                  label="Finalizar"
                  primary={true}
                  className="rounded-full"
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Succes screen  */}
      {susResult != undefined && showResult && (
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
    </div>
  );
};

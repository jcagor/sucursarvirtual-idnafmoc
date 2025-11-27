"use client";
import { CreateForm, CreateRequest, FormHeader, RightsVerifyInterface, Status } from "domain/models";
import CreateRequestUseCase from "domain/usecases/request/createRequest.use.case";
import {
  AUTH_LOADING_STATUS,
  AUTHENTICATED_STATUS,
  CAMPAIGN_PAC_UPDATE_DOCUMENTS_CODE,
  CAMPAIGN_PAC_UPDATE_SCHOOL_CERTIFICATE,
  EDUCATION_UNLOCK_SAP_CONSTANT,
  FILED_STATUS,
  FILED_STATUS_FILED_CODE,
  getKindshipCodeFromOtherNomenclature,
  KINDSHIP_BROTHER_VALUE,
  KINDSHIP_SON_VALUE,
  KINDSHIP_SPOUCE_VALUE,
  KINDSHIP_STEPSON_VALUE,
  PACS_TEMPLATE,
  PARENTS_FATHER_KINDSHIP_CODE,
  PARENTS_MOTHER_KINDSHIP_CODE,
  TITLE_DOCS,
  UserDataInterface,
  WORKFLOW_UPDATE_PAC_DOCUMENTS_ID,
} from "lib";
import { identificationTypeNomenclature } from "lib";
import { useAppSelector } from "presentation/store";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertIcon,
  Button,
  Divider,
  Dropzone,
  ModalSecondTemplate,
  SecondaryText,
} from "presentation";

import { FiledLayout, FiledLayoutProps } from "../FiledTemplate";

import Link from "next/link";

import DownloadFilesUseCase from "domain/usecases/Files/downloadFiles.use.case";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import { UserCard } from "presentation/components/molecules/common/cards/UserCard";
import { getTitularNombreCompleto } from "lib/helpers/getFullNameBySap";

interface FileWithFlag {
  file: File;
  show: boolean;
  mandatory: boolean;
}
export const UpdatePacDocuments = () => {
  // ________________________________________ Hooks

  const router = useRouter();
  const { pac: pacSelected } = useAppSelector((state) => state.pacSlice);
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const isSchoolCertificateBlock = type === "certificado";
  const {
    identification_number,
    identification_type,
  } = jwtDecode(session?.access_token!) as UserDataInterface;

  const sapRights = useAppSelector((state) => state.setsapRights);
  // ________________________________________ Use Cases

  const createRequestUseCase = appContainer.get<CreateRequestUseCase>(
    USECASES_TYPES._CreateRequestUseCase
  );
  const DownloadFiles = appContainer.get<DownloadFilesUseCase>(
    USECASES_TYPES._DownloadFileUseCase
  );

  // ________________________________________ Constants and states

  const title = `Actualizar documentos del beneficiario`;
  const statusSession = status;

  const [susResult, setSusResult] = useState<FiledLayoutProps>();
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [reload, setReload] = useState(false);
  const [fileLink, setFileLink] = useState("");
  const [filesSelected, setFilesSelected] = useState<FileWithFlag[]>([
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJORegistroCivilNacimiento
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CertificadoEscolar
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJODocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJODeclaracionJuramentadaTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CONYUGEDocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CONYUGEDeclaracionJuramentadaDependenciaTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CONYUGECertificadoLaboral
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANORegistroCivilHermano
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANORegistroCivilTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANORegistroDefuncionPadre1
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANORegistroDefuncionPadre2
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANODeclaracionJuramentada
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HERMANODocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //PADRERegistroCivilTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //PADRECertificadoEPS
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //PADREDocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //PADREDeclaracionNoPension
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJASTRORegistroCivilNacimiento
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJASTRODocumentoIdentidad
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJASTRODocumentoCustodia
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //HIJASTRODeclaracionJuramentadaTrabajador
    {
      file: new File([], "empty.PDF", { type: ".PDF" }),
      show: false,
      mandatory: true,
    }, //CertificadoDiscapacidad
  ]);
  const [showLink, setShowLink] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // ________________________________________ Methods

  const susProcess = async () => {
    //  Returns in case of no session
    if (!session?.access_token) {
      return;
    }

    // Create header for Radicate's Form
    const headerForm: FormHeader = {
      version: "0.0.1",
      template: "update-pac-documents",
    };

    if (!pacSelected) {
      return;
    }

    const identificationType = identificationTypeNomenclature(
      identification_type ?? ""
    );
    const contentForm = {
      TitularNumeroDocumento: identification_number,
      TitularTipoDocumento: identificationType,
      PACNumeroDocumento: pacSelected?.PACNumeroDocumento,
      PACTipoDocumento: pacSelected?.PACTipoDocumento,
      Educacion: EDUCATION_UNLOCK_SAP_CONSTANT.toString(),
    };
    // Create Radicate's Form
    const createForm: CreateForm = {
      header: headerForm,
      content: {
        sapData: contentForm,
        usuarioSolicitante: {
          correo: session?.user?.email ?? "",
          nombre: getTitularNombreCompleto(sapRights.rights),
        },
      },
    };

    let filesSelectedAux: File[] = [];
    const filesSelectedTemp: FileWithFlag[] = [...filesSelected];
    for (const element of filesSelectedTemp) {
      if (element.show && element.file.size > 0) {
        filesSelectedAux.push(element.file);
      }
    }

    // Create Radicate
    const campaignId = isSchoolCertificateBlock
      ? CAMPAIGN_PAC_UPDATE_SCHOOL_CERTIFICATE?.toString()
      : CAMPAIGN_PAC_UPDATE_DOCUMENTS_CODE.toString();
    const requestData: CreateRequest = {
      statusId: FILED_STATUS_FILED_CODE,
      userDocument: identification_number, // Titular document
      ...(identification_type && {
        userTypeDocument: identificationTypeNomenclature(
          identification_type,
          false
        ),
      }),
      userFullName: `${pacSelected?.PACPrimerNombre ?? ""} ${pacSelected?.PACSegundoNombre ?? ""
        } ${pacSelected?.PACPrimerApellido ?? ""} ${pacSelected?.PACSegundoApellido ?? ""
        }`,
      campaignId,
      workflowId: WORKFLOW_UPDATE_PAC_DOCUMENTS_ID,
      referenceAcronym: "AFI",
      form: createForm,
    };

    if (filesSelectedAux.length > 0) {
      filesSelectedAux.forEach((file, idx) => {
        console.debug(`Archivo[${idx}]:`, {
          name: file.name,
          size: file.size,
          type: file.type,
        });
      });
    } else {
      console.debug("No se está enviando ningún archivo adjunto.");
    }

    const resultCreateRequestUseCase = await createRequestUseCase.execute(
      session?.access_token,
      requestData,
      filesSelectedAux
    );
    return resultCreateRequestUseCase;
  };
  const validations = async () => {
    let filesWithDocument: FileWithFlag[];
    if (isSchoolCertificateBlock) {
      // Solo validar el campo de certificado escolar (índice 1)
      filesWithDocument = [filesSelected[1]];
    } else {
      filesWithDocument = filesSelected.filter((values) => values.show);
    }
    console.debug('validations', { filesSelected, filesWithDocument });
    for (const element of filesWithDocument) {
      if (element.file.size === 0 && element.mandatory) {
        setModalOpen(true);
        setModalMessage("Faltan documentos por subir");
        return false;
      }
    }
    return true;
  };
  const sendData = async () => {
    // ========== VALIDATIONS ==========
    const isValid = await validations();

    if (!isValid) {
      return;
    }
    // ========== generate radicate in SUS ==========
    const susProcessResult = await susProcess();

    const result: FiledLayoutProps = {
      bodyMsg:
        "Consulta el estado de la solicitud beneficiarios en la opción Radicados.",
      isFail: false,
      radicate: susProcessResult,
    };
    if (susProcessResult) {
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
    } else {
      result.isFail = true;
      setSusResult(result);
    }
  };
  const download = async (key: string) => {
    if (!(statusSession == AUTHENTICATED_STATUS)) {
      return;
    }
    const result = await DownloadFiles.execute(key, session?.access_token);
    if (result) {
      setFileLink(result);
    }
  };
  const addFile = (fileToAdd: File[], index: number) => {
    setFilesSelected((files) => {
      const newFiles = [...files];
      const mandatory = newFiles[index]?.mandatory ?? true;
      newFiles[index] = {
        file: fileToAdd[0],
        show: true,
        mandatory,
      };
      console.debug('addFile', { index, file: fileToAdd[0], newFiles });
      return newFiles;
    });
  };
  const removeFile = (index: number) => {
    setFilesSelected((files) => {
      files[index] = {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: true,
        mandatory: files[index].mandatory,
      };
      return files;
    });
  };
  const clearDocuments = async () => {
    return [
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HIJORegistroCivilNacimiento
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //CertificadoEscolar
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HIJODocumentoIdentidad
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HIJODeclaracionJuramentadaTrabajador
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //CONYUGEDocumentoIdentidad
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //CONYUGEDeclaracionJuramentadaDependenciaTrabajador
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //CONYUGECertificadoLaboral
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HERMANORegistroCivilHermano
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HERMANORegistroCivilTrabajador
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HERMANORegistroDefuncionPadre1
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HERMANORegistroDefuncionPadre2
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HERMANODeclaracionJuramentada
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HERMANODocumentoIdentidad
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //PADRERegistroCivilTrabajador
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //PADRECertificadoEPS
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //PADREDocumentoIdentidad
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //PADREDeclaracionNoPension
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HIJASTRORegistroCivilNacimiento
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HIJASTRODocumentoIdentidad
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HIJASTRODocumentoCustodia
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //HIJASTRODeclaracionJuramentadaTrabajador
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //CertificadoDiscapacidad
    ];
  };

  // ________________________________________ Attachment Validations

  const validateSonDocs = async () => {
    if (pacSelected?.PACEdad == undefined) {
      return;
    }
    const age = Number.parseInt(pacSelected.PACEdad);
    let listDropzone: FileWithFlag[] = await clearDocuments();

    if (age < 7) {
      listDropzone[0].show = true;
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 12) {
      listDropzone[0].show = true;
      listDropzone[1].show = true;
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 18) {
      listDropzone[0].show = true;
      listDropzone[1].show = true;
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 19) {
      listDropzone[0].show = true;
      listDropzone[1].show = true;
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 24) {
      listDropzone[0].show = true;
      listDropzone[1].show = true;
      listDropzone[2].show = true;
      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    } else {
      alert("No se puede afiliar un beneficiario hijo mayor de 23 años");
    }
    setFilesSelected(listDropzone);
  };

  const validateSpouceDocs = async () => {
    let listDropzone: FileWithFlag[] = await clearDocuments();

    listDropzone[3].show = true;
    listDropzone[4].show = true;

    setShowLink(true);
    setFilesSelected(listDropzone);
  };

  const validateBrotherDocs = async () => {
    let listDropzone: FileWithFlag[] = await clearDocuments();

    listDropzone[6].show = true;
    listDropzone[7].show = true;
    listDropzone[8].show = true;
    listDropzone[9].show = true;
    listDropzone[10].show = true;
    listDropzone[11].show = true;

    setShowLink(true);
    setFilesSelected(listDropzone);
  };

  const validateParentDocs = async () => {
    let listDropzone: FileWithFlag[] = await clearDocuments();

    listDropzone[12].show = true;
    listDropzone[13].show = true;
    listDropzone[14].show = true;
    listDropzone[15].show = true;

    setShowLink(true);
    setFilesSelected(listDropzone);
  };

  const validateStepsonDocs = async () => {
    // TODO: Show message error
    if (pacSelected?.PACEdad == undefined) {
      return;
    }
    const age = Number.parseInt(pacSelected.PACEdad);
    let listDropzone: FileWithFlag[] = await clearDocuments();

    if (age < 7) {
      listDropzone[15].show = true;
      listDropzone[17].show = true;
      listDropzone[19].show = true;
      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 12) {
      listDropzone[15].show = true;
      listDropzone[16].show = true;
      listDropzone[17].show = true;
      listDropzone[19].show = true;
      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 19) {
      listDropzone[15].show = true;
      listDropzone[16].show = true;
      listDropzone[17].show = true;
      listDropzone[18].show = true;
      listDropzone[19].show = true;
      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    } else {
      alert("No se puede afiliar un beneficiario hijo mayor de 18 años");
    }
    setFilesSelected(listDropzone);
  };

  // ________________________________________ When not authenticated redirects to home

  useEffect(() => {
    if (statusSession == AUTH_LOADING_STATUS) {
      return;
    }
    if (!(statusSession == AUTHENTICATED_STATUS)) {
      router.push("affiliations");
    }
    if (pacSelected == undefined) {
      router.back();
    }

    const pacKindship = getKindshipCodeFromOtherNomenclature(
      "COMMON",
      pacSelected?.Parentesco
    );

    if (pacKindship == KINDSHIP_SON_VALUE) {
      validateSonDocs();
    }
    if (pacKindship == KINDSHIP_SPOUCE_VALUE) {
      validateSpouceDocs();
    }
    if (pacKindship == KINDSHIP_BROTHER_VALUE) {
      validateBrotherDocs();
    }
    if (pacKindship == KINDSHIP_STEPSON_VALUE) {
      validateStepsonDocs();
    }
    if (
      pacKindship == PARENTS_FATHER_KINDSHIP_CODE ||
      pacKindship == PARENTS_MOTHER_KINDSHIP_CODE
    ) {
      validateParentDocs();
    }
    if (isSchoolCertificateBlock) {
      // Mostrar solo el campo de certificado escolar (índice 1)
      const listDropzone = [...filesSelected].map((doc, idx) => ({
        ...doc,
        show: idx === 1,
      }));
      setFilesSelected(listDropzone);
      setShowLink(false);
      return;
    }
  }, [statusSession]);

  useEffect(() => {
    download(PACS_TEMPLATE ?? "");
  }, [reload]);

  return (
    <div className="w-full h-full pr-20">
      <SecondaryText
        className="text-[calc(16px)] font-bold text-principal-180 font-outfit"
        text={isSchoolCertificateBlock ? "Actualizar certificado escolar del beneficiario" : title}
      />
      <section className={"w-[90%]"}>
        {susResult != undefined ? (
          <div className="h-full">
            <div className="h-[80%]">
              <FiledLayout
                radicate={susResult.radicate}
                bodyMsg={susResult.bodyMsg}
                isFail={susResult.isFail}
              />
            </div>
            <div className="flex flex-row w-full h-auto justify-between py-9">
              <button
                type="button"
                onClick={() => {
                  router.back();
                }}
                className="self-center flex w-full cursor-pointer"
              >
                <SecondaryText
                  text="Atrás"
                  className="font-outfit text-[calc(20px)] font-normal text-principal-180"
                />
              </button>
              <div className="flex w-full max-w-96 h-[20%] justify-end self-center">
                <Button
                  label="Ir a Radicados"
                  primary={true}
                  className="w-full rounded-full mt-6"
                  onClick={() => {
                    router.push("/menu-affiliations/filed");
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <UserCard
              classname="mt-5"
              name={`
                ${pacSelected?.PACPrimerNombre ?? ""} ${pacSelected?.PACSegundoNombre ?? ""} ${pacSelected?.PACPrimerApellido ?? ""} ${pacSelected?.PACSegundoApellido ?? ""}`}
              document={`
                ${pacSelected?.PACTipoDocumento && identificationTypeNomenclature(pacSelected?.PACTipoDocumento, false)} ${pacSelected?.PACNumeroDocumento}`}
            />
            <div className="flex-row my-6">
              <SecondaryText
                className="text-[calc(16px)] font-bold text-principal-180 font-outfit"
                text={isSchoolCertificateBlock ? "Actualizar certificado escolar del beneficiario" : title}
              />
            </div>
            <section className={"w-[90%]"}>
              <div className={`flex flex-wrap overflow-y-scroll no-scrollbar w-full`}>
                {isSchoolCertificateBlock ? (
                  <>
                    <div className="mb-6 p-4 bg-neutral-100 rounded-lg">
                      <p className="text-sm" style={{ color: "#000" }}>
                        El documento debe estar legible, completo y corresponder al mismo periodo académico. Puedes presentar cualquiera de los siguientes documentos para acreditar la escolaridad de tu beneficiario:<br /><br />
                        <strong>• Certificado escolar. <br />
                          • Boletín de notas.<br />
                          • Comprobante de pago de matrícula.<br />
                          • Legalización de matrícula.</strong><br /><br />
                        Deben ser membretados (Contener en el encabezado el logo de la institución educativa).<br /><br />
                        Los soportes deben estar en formato PDF, JPG o JPEG, y su peso máximo es 5MB.
                      </p>
                    </div>
                    <Dropzone
                      className="w-full mb-6"
                      onChange={(value) => addFile(value, 1)}
                      onDelete={() => removeFile(1)}
                      title="Adjunta el certificado escolar legible."
                    />
                  </>
                ) : (
                  <>
                    {filesSelected &&
                      filesSelected.map((value, index) => {
                        return (
                          value.show && (
                            <Dropzone
                              key={index}
                              className="w-full mb-6"
                              onChange={(value) => {
                                addFile(value, index);
                              }}
                              onDelete={(value) => {
                                removeFile(index);
                              }}
                              title={TITLE_DOCS[index + 1]}
                            />
                          )
                        );
                      })}
                    {showLink && (
                      <div className="flex flex-row w-full justify-center mt-10">
                        <Link
                          href={fileLink}
                          passHref={true}
                          target="_blank"
                          onClick={() => {
                            setReload(!reload);
                          }}
                        >
                          <p className="font-outfit text-sm font-normal text-principal-180">
                            Haz click para descargar el formato de declaración
                            juramentada
                          </p>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
            <div className="flex flex-wrap flex-row pb-10">
              <div className="flex w-full justify-between pt-9">
                <button
                  type="button"
                  onClick={() => {
                    router.back();
                  }}
                  className="self-center flex w-1/5 cursor-pointer"
                >
                  <SecondaryText
                    text="Atrás"
                    className="font-outfit text-[calc(20px)] font-normal text-principal-180"
                  />
                </button>
                <div className="self-center flex w-1/5">
                  <Button
                    onClick={async () => {
                      setLoadingButton(true);
                      await sendData();
                      setLoadingButton(false);
                    }}
                    label={isSchoolCertificateBlock ? "Actualizar" : "Afiliar"}
                    primary={true}
                    className="rounded-full"
                    isLoading={loadingButton}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
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

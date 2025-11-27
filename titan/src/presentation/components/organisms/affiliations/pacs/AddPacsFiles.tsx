"use client";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";

import { FormikProps } from "formik";
import { Company } from "domain/models";
import { FormModuleOnePacsValuesType } from "./FormModuleOnePacs";
import { FormSecondModulePacsValuesType } from "./FormSecondModulePacs";
import { SpouceEmployeeFormValuesType } from "./SpouceEmployeeForm";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import DownloadFilesUseCase from "domain/usecases/Files/downloadFiles.use.case";
import {
  AUTHENTICATED_STATUS,
  generateUniqueKey,
  KINDSHIP_BROTHER_VALUE,
  KINDSHIP_SON_VALUE,
  KINDSHIP_SPOUCE_VALUE,
  KINDSHIP_STEPSON_VALUE,
  ONE_ANSWER,
  PACS_TEMPLATE,
  PARENTS_FATHER_KINDSHIP_CODE,
  PARENTS_MOTHER_KINDSHIP_CODE,
  RL_DOCUMENT_TYPE_CODE,
  TITLE_DOCS,
  VALID_IDENTIFICATION_TYPES_CODES,
} from "lib";
import {
  calculateAge,
  calculateAgeWithBornDate,
} from "lib/helpers/calculateAge";
import { SecondaryText } from "presentation/components/atoms";
import { Dropzone } from "presentation/components/molecules";

type FormPropsType = {
  filesSelected: FileWithFlag[];
  setFilesSelected: Dispatch<SetStateAction<FileWithFlag[]>>;
  formikFormModuleOnePacs: FormikProps<
    FormModuleOnePacsValuesType & FormSecondModulePacsValuesType
  >;
  formikSpouceEmployeeForm: FormikProps<SpouceEmployeeFormValuesType>;
};
interface FileWithFlag {
  file: File;
  show: boolean;
  mandatory: boolean;
}
export const AddPacsFiles: FC<FormPropsType> = ({
  filesSelected,
  setFilesSelected,
  formikFormModuleOnePacs,
  formikSpouceEmployeeForm,
}) => {
  const title_docs = `Documentos soporte`;
  const { data: session, status } = useSession();
  const statusSession = status;
  /** State variables */
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>(false);
  const [fileLink, setFileLink] = useState("");
  const [reload, setReload] = useState(false);

  /** Use cases */
  const DownloadFiles = appContainer.get<DownloadFilesUseCase>(
    USECASES_TYPES._DownloadFileUseCase
  );

  /** Methods */
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
      files[index] = {
        file: fileToAdd[0],
        show: true,
        mandatory: files[index].mandatory,
      };
      return files;
    });
  };
  const removeFile = (fileToRemove: File[], index: number) => {
    setFilesSelected((files) => {
      files[index] = {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: true,
        mandatory: files[index].mandatory,
      };
      return files;
    });
  };

  /**
   * Validates if the beneficiary has both parents
   * @returns true if the beneficiary has both parents, false otherwise
   */
  const validateBothParents = (): boolean => {
    // In case of both parents returns true
    if (
      formikFormModuleOnePacs?.values?.hasBothParents == ONE_ANSWER?.[0]?.value
    ) {
      return true;
    }
    return false;
  };

  const validateDisability = (): boolean => {
    if (
      formikFormModuleOnePacs.values.disability &&
      formikFormModuleOnePacs.values.disability.trim() === "1"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validateForeign = (): boolean => {
    if (
      formikFormModuleOnePacs.values.documentType !=
        VALID_IDENTIFICATION_TYPES_CODES[0] &&
      formikFormModuleOnePacs.values.documentType !=
        VALID_IDENTIFICATION_TYPES_CODES[4] &&
      formikFormModuleOnePacs.values.documentType !=
        VALID_IDENTIFICATION_TYPES_CODES[7]
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validateOccupation = (listDropzone: FileWithFlag[]): FileWithFlag[] => {
    if (
      formikSpouceEmployeeForm.values.ocupation &&
      formikSpouceEmployeeForm.values.ocupation.trim() === "02"
    ) {
      listDropzone[5].show = true;
    }

    return listDropzone;
  };

  const validateSonDocs = async () => {
    const age = calculateAgeWithBornDate(
      formikFormModuleOnePacs.values.bornDate
    );

    let listDropzone: FileWithFlag[] = await clearDocuments();

    if (validateDisability()) {
      listDropzone[20].show = true;
    } else if (age > 23) {
      alert("No se puede afiliar un beneficiario hijo mayor de 23 años");
      return;
    }

    if (validateForeign()) {
      listDropzone[21].show = true;
    }

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
      listDropzone[2].show = true;
      setShowLink(true);
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
    }

    setFilesSelected(listDropzone);
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
      {
        file: new File([], "empty.PDF", { type: ".PDF" }),
        show: false,
        mandatory: true,
      }, //DocumentoIdentidadExtranjeria
    ];
  };

  const validateSpouceDocs = async () => {
    let listDropzone: FileWithFlag[] = await clearDocuments();

    listDropzone = validateOccupation(listDropzone);

    if (validateDisability()) {
      listDropzone[20].show = true;
    }
    if (validateForeign()) {
      listDropzone[21].show = true;
    }

    listDropzone[3].show = true;
    listDropzone[4].show = true;

    setShowLink(true);
    setFilesSelected(listDropzone);
  };

  const validateBrotherDocs = async () => {
    let listDropzone: FileWithFlag[] = await clearDocuments();

    if (validateDisability()) {
      listDropzone[20].show = true;
    }
    if (validateForeign()) {
      listDropzone[21].show = true;
    }

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

    if (validateDisability()) {
      listDropzone[20].show = true;
    }
    if (validateForeign()) {
      listDropzone[21].show = true;
    }

    setShowLink(true);
    setFilesSelected(listDropzone);
  };

  const validateStepsonDocs = async () => {
    const bornDateSplit: string[] | undefined =
      formikFormModuleOnePacs.values.bornDate
        ?.toString()
        .replace(/ /g, "")
        .split("|");
    const bornYear = `${bornDateSplit?.[2]}`;
    const bornMonth = `${bornDateSplit?.[1]}`;
    const bornDay = `${bornDateSplit?.[0]}`;

    let age: number = 0;

    if (bornYear && bornMonth && bornDay) {
      // Convertimos a formato ISO para pasar al backend
      const bornDateIso = `${bornYear}-${bornMonth.padStart(
        2,
        "0"
      )}-${bornDay.padStart(2, "0")}`;

      age = calculateAge(bornDateIso);
    }

    let listDropzone: FileWithFlag[] = await clearDocuments();

    if (validateBothParents()) {
      listDropzone[18].show = true;
    }

    // Validate document type
    if (
      formikFormModuleOnePacs.values.documentType != RL_DOCUMENT_TYPE_CODE &&
      !validateForeign()
    ) {
      listDropzone[17].show = true;
      listDropzone[16].show = true;
    } else if (
      formikFormModuleOnePacs.values.documentType == RL_DOCUMENT_TYPE_CODE
    ) {
      listDropzone[16].show = true;
    } else if (validateForeign()) {
      listDropzone[16].show = true;
      listDropzone[21].show = true;
    }

    if (validateDisability()) {
      listDropzone[19].show = true;
      listDropzone[20].show = true;

      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    } else if (age > 23) {
      alert("No se puede afiliar un beneficiario hijo mayor de 23 años");
      return;
    }

    if (age < 7) {
      listDropzone[19].show = true;
      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 12) {
      listDropzone[19].show = true;
      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 19) {
      listDropzone[19].show = true;
      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    }
    if (age < 24) {
      listDropzone[19].show = true;
      setShowLink(true);
      setFilesSelected(listDropzone);
      return;
    }

    setFilesSelected(listDropzone);
  };

  /** Use effects*/

  useEffect(() => {
    setShowModal(false);
    setShowLink(false);

    if (formikFormModuleOnePacs.values.bornDate == undefined) {
      return;
    }

    if (formikFormModuleOnePacs.values.kindship == KINDSHIP_SON_VALUE) {
      validateSonDocs();
      setShowModal(true);
    }

    if (formikFormModuleOnePacs.values.kindship == KINDSHIP_SPOUCE_VALUE) {
      validateSpouceDocs();
      setShowModal(true);
    }

    if (formikFormModuleOnePacs.values.kindship == KINDSHIP_BROTHER_VALUE) {
      validateBrotherDocs();
      setShowModal(true);
    }

    if (formikFormModuleOnePacs.values.kindship == KINDSHIP_STEPSON_VALUE) {
      validateStepsonDocs();
      setShowModal(true);
    }

    if (
      formikFormModuleOnePacs.values.kindship == PARENTS_FATHER_KINDSHIP_CODE ||
      formikFormModuleOnePacs.values.kindship == PARENTS_MOTHER_KINDSHIP_CODE
    ) {
      validateParentDocs();
      setShowModal(true);
    }
  }, [
    formikFormModuleOnePacs.values.bornDate,
    formikFormModuleOnePacs.values.disability,
    formikSpouceEmployeeForm.values.ocupation,
    formikFormModuleOnePacs.values.kindship,
    formikFormModuleOnePacs.values.documentType,
    formikFormModuleOnePacs.values.hasBothParents,
  ]);

  useEffect(() => {
    download(PACS_TEMPLATE);
  }, [reload]);

  return (
    <>
      {showModal && (
        <section className={"w-[90%]"}>
          <div className="flex-row my-6">
            <SecondaryText
              className="text-[calc(16px)] font-bold text-principal-180 font-outfit"
              text={title_docs}
            />
          </div>
          <div
            className={`flex flex-wrap overflow-y-scroll no-scrollbar w-full`}
          >
            {filesSelected.map((value, index) => {
              return (
                value.show && (
                  <Dropzone
                    key={generateUniqueKey()}
                    className="w-full mb-6"
                    onChange={(value) => {
                      addFile(value, index);
                    }}
                    onDelete={(value) => {
                      removeFile(value, index);
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
          </div>
        </section>
      )}
    </>
  );
};

"use client";

import { PAC } from "domain/models";
import {
  BLOQUED_PAC_DOCUMENT,
  BLOQUED_PAC_DOCUMENT_QA,
  BLOQUED_PAC_SUBSIDY,
  BLOQUED_PAC_SUBSIDY_QA,
  extractDate,
  getGenderFromSap,
  identificationTypeNomenclature,
  kindshipSapNomenclature,
  UNLOCK_PAC_DOCUMENTS,
} from "lib";
import { useRouter } from "next/navigation";
import {
  ArrowIcon,
  KeyValueTextProps,
  LoadingAnimation,
  NeutralBlackText,
  RefreshIcon,
} from "presentation/components/atoms";
import {
  AlertComponent,
  CustomSimpleHeader,
  KeyValueTable,
  RedirectButtonProperty,
} from "presentation/components/molecules";
import { RedirectButtonList } from "presentation/components/organisms";
import { useAppSelector } from "presentation/store";
import { useEffect, useState } from "react";
import WithBackButton from "./withBackButton";

export const PacDetailsComponent = () => {
  // 1. ________________________________________ Hooks

  const router = useRouter();
  const pacSelected = useAppSelector((state) => state.pacSlice.pac);

  // 2. ________________________________________ Constants

  const buttonListInit: RedirectButtonProperty[] = [
    {
      description: "Retiro del beneficiario",
      to: "/menu-affiliations/affiliations/withdrawal-pacs",
      icon: <ArrowIcon className={"relative w-32 z-0"} />,
    },
  ];
  const [tableOneData, setTableOneData] = useState<KeyValueTextProps[]>([]);
  const [tableTwoData, setTableTwoData] = useState<KeyValueTextProps[]>([]);
  const [buttonList, setButtonList] =
    useState<RedirectButtonProperty[]>(buttonListInit);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 3. ________________________________________ Methods

  const setData = (pac: PAC) => {
    if (!pac) return;
    // ==================== IN CASE OF BLOQUED PAC ADDS BUTTONS ====================
    let buttonListAux = [...buttonListInit];
    // Bloqueo por documentación
    if (
      pac.PACMotivoBloqueoDocumentacion == BLOQUED_PAC_DOCUMENT ||
      pac.PACMotivoBloqueoDocumentacion == BLOQUED_PAC_DOCUMENT_QA
    ) {
      buttonListAux.push({
        description: "Actualizar documentos",
        to: "/menu-affiliations/affiliations/update-pac",
        icon: <RefreshIcon className={"relative w-32 z-0"} />,
      });
    }
    // Bloqueo por certificado escolar
    if (
      pac.PACMotivoBloqueoSubsidio == BLOQUED_PAC_SUBSIDY ||
      pac.PACMotivoBloqueoSubsidio == BLOQUED_PAC_SUBSIDY_QA
    ) {
      buttonListAux.push({
        description: "Actualizar certificado escolar",
        to: "/menu-affiliations/affiliations/update-pac?type=certificado",
        icon: <RefreshIcon className={"relative w-32 z-0"} />,
      });
    }
    setButtonList(buttonListAux);
    const dataToSetTableOne: KeyValueTextProps[] = [
      {
        keyReference: "Tipo de documento:",
        value:
          identificationTypeNomenclature(pac.PACTipoDocumento, true) ??
          "No disponible",
      },
      { keyReference: "Número de documento:", value: pac.PACNumeroDocumento },
      {
        keyReference: "Nombres:",
        value: `${pac?.PACPrimerNombre ?? ""} ${pac?.PACSegundoNombre ?? ""}`,
      },
      {
        keyReference: "Apellidos",
        value: `${pac?.PACPrimerApellido ?? ""} ${
          pac?.PACSegundoApellido ?? ""
        }`,
      },
      {
        keyReference: "Fecha de nacimiento:",
        value: pac?.PACFechaNacimiento
          ? extractDate(pac?.PACFechaNacimiento)
          : "No disponible",
      },
      {
        keyReference: "Edad:",
        value: pac?.PACEdad ?? "No disponible",
      },
      {
        keyReference: "Género:",
        value: pac?.PACGenero
          ? getGenderFromSap(pac?.PACGenero) ?? "No disponible"
          : "No disponible",
      },
    ];
    const dataToSetTableTwo: KeyValueTextProps[] = [
      {
        keyReference: "Fecha de afiliación:",
        value: pac.PACFechaInicioVigencia
          ? extractDate(pac.PACFechaInicioVigencia)
          : "No disponible",
      },
      { keyReference: "Categoría:", value: pac.PACCategoriaSalarial },
      {
        keyReference: "Estado:",
        value: pac?.estadoBeneficiario,
      },
    ];
    setTableOneData(dataToSetTableOne);
    setTableTwoData(dataToSetTableTwo);
    setIsLoading(false);
  };

  // 4. ________________________________________ Effects

  useEffect(() => {
    // ==================== IN CASE OF NO SELECTED PAC ====================
    if (!pacSelected) {
      router.back();
      return;
    }
    setIsLoading(true);
    setData(pacSelected);
  }, []);

  return (
    <div className="w-full h-full pr-20 pb-20">
      <WithBackButton>
        <CustomSimpleHeader
          title="Mis Beneficiarios"
          subTitle={`
          ${pacSelected?.PACPrimerNombre ?? ""} ${
            pacSelected?.PACSegundoNombre ?? ""
          } ${pacSelected?.PACPrimerApellido ?? ""} ${
            pacSelected?.PACSegundoApellido ?? ""
          }`}
          thirdTitle={kindshipSapNomenclature(pacSelected?.Parentesco)}
        />

        <div className="w-full mt-14">
          <NeutralBlackText
            fontSize="lg"
            className="self-start"
            text="Acciones:"
          />
          <RedirectButtonList
            className="flex flex-col lg:flex-row mt-10 w-full gap-12  "
            redirectButtons={buttonList}
          />
        </div>
        <div className="w-full flex flex-row justify-start mt-8 ">
          <NeutralBlackText
            fontSize="lg"
            className="self-center"
            text="Información del beneficiario:"
          />
          {isLoading && (
            <LoadingAnimation
              containerClassName="w-10 h-10 bg-none flex justify-center items-center ml-4 overflow-hidden"
              className="w-full h-full"
            ></LoadingAnimation>
          )}
        </div>
        <div className="mt-8 w-full flex flex-col gap-2">
          {(pacSelected?.PACMotivoBloqueoDocumentacion ==
            BLOQUED_PAC_DOCUMENT ||
            pacSelected?.PACMotivoBloqueoDocumentacion ==
              BLOQUED_PAC_DOCUMENT_QA) && (
            <AlertComponent
              text={`El beneficiario presenta un bloqueo por documentación, presiona la opción "Actualizar documentos".`}
            />
          )}
          {(pacSelected?.PACMotivoBloqueoSubsidio == BLOQUED_PAC_SUBSIDY ||
            pacSelected?.PACMotivoBloqueoSubsidio ==
              BLOQUED_PAC_SUBSIDY_QA) && (
            <AlertComponent text='El beneficiario presenta un bloqueo por certificado escolar, presiona la opción "Actualizar certificado escolar".' />
          )}
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full lg:w-[calc(500px)] h-fit lg:h-[calc(210px)] ">
            {tableOneData && <KeyValueTable keyValueData={tableOneData} />}
          </div>
          <div className="w-full lg:w-[calc(500px)] h-fit lg:h-[calc(210px)] ">
            {tableTwoData && <KeyValueTable keyValueData={tableTwoData} />}
          </div>
        </div>
      </WithBackButton>
    </div>
  );
};
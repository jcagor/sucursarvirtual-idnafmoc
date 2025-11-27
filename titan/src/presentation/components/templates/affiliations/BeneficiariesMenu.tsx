"use client";
import { Empleadores, PAC, RightsVerifyInterface } from "domain/models";
import { jwtDecode } from "jwt-decode";
import {
  APORTANT_COMPANY_RETIR_STATUS,
  BLOQUED_PAC_DOCUMENT,
  BLOQUED_PAC_DOCUMENT_QA,
  BLOQUED_PAC_SUBSIDY,
  formatFromSAPDateToSVEDate,
  identificationTypeNomenclature,
  RELATIONSHIP,
  TYPE_INDEPENDENT_CODE,
  TYPE_PENSIONER_25_CODE,
  TYPE_PENSIONER_CODE,
  UserDataInterface,
} from "lib";
import { toUpperCamelCase } from "lib/helpers/textFormat";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AssignmentIcon,
  FailIcon,
  FlexLoadingAnimation,
  KeyValueTable,
  KeyValueTextProps,
  MainTitle,
  NeutralBlackText,
  PacCard,
  PlusIcon,
  RedirectButtonProperty,
  SecondaryText,
  SectionSeparator,
  SimpleDropdown,
} from "presentation";
import { RedirectButtonList } from "presentation/components/organisms/affiliations";
import { useAppDispatch, useAppSelector } from "presentation/store";
import { setPacState } from "presentation/store/pac/pacSlice";
import React, { useEffect, useState } from "react";

type IPactItem = {
  pac: PAC;
  pacName: string;
  pacDocument: string;
  kindship: string;
  pacAffiliationDate: string;
};

export const BeneficiariesMenu = () => {
  // 1. ________________________________________ Constants and variables

  const sapRights = useAppSelector((state) => state.setsapRights);

  const buttonList: RedirectButtonProperty[] = [
    {
      description: "Afiliar \n beneficiario",
      to: "/menu-affiliations/affiliations/validate-rnec",
      icon: <PlusIcon className={"relative right-auto"} />,
    },
  ];
  const buttonListInit: RedirectButtonProperty[] = [
    {
      description: "Radicados",
      to: "/menu-affiliations/filed",
      icon: <AssignmentIcon className={"relative right-auto"} />,
    },
  ];

  const [pacsItems, setPacsItems] = useState<IPactItem[]>([]);
  const [workerButtonList, setWorkerButtonList] =
    useState<RedirectButtonProperty[]>(buttonListInit);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableOneData, setTableOneData] = useState<KeyValueTextProps[]>([]);
  const [tableTwoData, setTableTwoData] = useState<KeyValueTextProps[]>([]);
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [companySelected, setCompanySelected] = useState<Empleadores>();
  const [companies, setCompanies] = useState<Empleadores[]>();
  const [verifyRightsResponse, setVerifyRightsResponse] =
    useState<RightsVerifyInterface>();
  const [showCompany, setShowCompany] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  // 3. ________________________________________ Methods

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

  /**
   * Gets the full name of the PAC
   * @param pac
   * @returns
   */
  const getFullName = (pac: PAC) => {
    const firstName = pac.PACPrimerNombre ? pac.PACPrimerNombre : "";
    const secondName = pac.PACSegundoNombre ? pac.PACSegundoNombre : "";
    const firstLastName = pac.PACPrimerApellido ? pac.PACPrimerApellido : "";
    const secondLastName = pac.PACSegundoApellido ? pac.PACSegundoApellido : "";

    return `${firstName} ${secondName} ${firstLastName} ${secondLastName}`;
  };

  /**
   * Gets the document of the PAC to render
   * @param pac
   * @returns
   */
  const getDocument = (pac: PAC) => {
    const findType = identificationTypeNomenclature(pac.PACTipoDocumento);
    if (findType) {
      return `${findType} ${pac.PACNumeroDocumento}`;
    } else {
      return `${pac.PACNumeroDocumento}`;
    }
  };

  /**
   * Gets the starter information of the PAC
   * @returns
   */
  const getInfo = async () => {
    // 1. ____________________ Get the user information from token

    let {
      identification_number,
      identification_type,
      family_name,
      given_name,
    } = jwtDecode(session?.access_token!) as UserDataInterface;

    const identificationType = identificationTypeNomenclature(
      identification_type ?? ""
    );
    setName(`${given_name} ${family_name}`);

    // 2. ____________________ Validates the worker's parsed identification type

    if (!identificationType) {
      setIsLoading(false);
      return;
    }

    // 3. ____________________ Gets the Pacs data from right verifier

    const verifyRightsResponseAux: RightsVerifyInterface | undefined =
      sapRights.rights;

    // 4. ____________________ Validates the worker's data

    if (
      !verifyRightsResponseAux ||
      !verifyRightsResponseAux.pacs ||
      !verifyRightsResponseAux.empleadores
    ) {
      router.push("/");
      setIsLoading(false);
      return;
    }

    setVerifyRightsResponse(verifyRightsResponseAux);

    // if (
    //   verifyRightsResponseAux.Bp == null ||
    //   verifyRightsResponseAux.TitularNumeroDocumento != identification_number ||
    //   verifyRightsResponseAux.TitularEstado == APORTANT_COMPANY_RETIR_STATUS
    // ) {
    //   setIsLoading(false);
    //   setHasPermissions(false);
    //   return;
    // }

    setCompanyNames(
      verifyRightsResponseAux.empleadores
        .map((e) => e.EmpleadorRazonSocial ?? "")
        .filter((e) => e !== "")
    );

    setCompanySelected(verifyRightsResponseAux.empleadores[0]);
    setCompanies(verifyRightsResponseAux.empleadores);

    // 5. ____________________ Sets the worker's data to render

    const mappedDataToSetTableOne: KeyValueTextProps[] = [
      {
        keyReference: "Tipo de documento: ",
        value:
          identificationTypeNomenclature(identification_type ?? "", true) ?? "",
      },
      {
        keyReference: "Número de documento: ",
        value: identification_number ?? "",
      },
      {
        keyReference: "Nombres: ",
        value: toUpperCamelCase(
          `${verifyRightsResponseAux.TitularPrimerNombre ?? ""} ${
            verifyRightsResponseAux.TitularSegundoNombre ?? ""
          }`
        ),
      },
      {
        keyReference: "Apellidos: ",
        value: toUpperCamelCase(
          `${verifyRightsResponseAux.TitularPrimerApellido ?? ""} ${
            verifyRightsResponseAux.TitularSegundoApellido ?? ""
          }`
        ),
      },
      {
        keyReference: "Fecha de Nacimiento: ",
        value: `${formatFromSAPDateToSVEDate(
          verifyRightsResponseAux.TitularFechaNacimiento ?? ""
        )}`,
      },
      {
        keyReference: "Edad: ",
        value: `${verifyRightsResponseAux.TitularEdad} años`,
      },
    ];
    setTableOneData(mappedDataToSetTableOne);

    buildInfoTable();

    // 6. ____________________ Filters and sorts the PACs data

    let pacs = verifyRightsResponseAux?.pacs;
    pacs = pacs.filter((pac) => pac.BP !== null);
    pacs = pacs.filter((pac) =>
      RELATIONSHIP.some((rel) => rel.value === pac.Parentesco)
    );
    pacs = pacs.sort((a, b) =>
      a.PACPrimerNombre.localeCompare(b.PACPrimerNombre)
    );

    // 7. ____________________ Validate filtered sorted PACs data

    if (pacs.length < 1) {
      setHasPermissions(true);

      setIsLoading(false);
      return;
    }

    // 8. ____________________ Set PACs states data

    const pacsItem = pacs.map((pac) => {
      // ========= TESTING BLOQUED PAC =========
      // pac.PACMotivoBloqueoDocumentacion = BLOQUED_PAC_DOCUMENT
      // pac.PACMotivoBloqueoSubsidio = BLOQUED_PAC_SUBSIDY
      return {
        pac: pac,
        pacName: getFullName(pac),
        pacDocument: getDocument(pac),
        kindship: getRelationship(pac),
        pacAffiliationDate: pac.PACFechaInicioVigencia,
      } as IPactItem;
    });
    setPacsItems(pacsItem);
    setIsLoading(false);
    setHasPermissions(true);
  };

  const buildInfoTable = () => {
    if (!companySelected || !verifyRightsResponse) {
      return;
    }
    const mappedDataToSetTableTwo: KeyValueTextProps[] = [
      {
        keyReference: "Fecha de afiliación: ",
        value: formatFromSAPDateToSVEDate(
          companySelected.TitularFechaInicioVigencia ?? ""
        ),
      },
      {
        keyReference: "Categoria: ",
        value: verifyRightsResponse.TitularCategoriaSalarial ?? "",
      },
      {
        keyReference: "Salario: ",
        value: companySelected.Salario ?? "",
      },
    ];

    const mappedDataToSetTableTwoPlus: KeyValueTextProps[] =
      validateAffiliateType(verifyRightsResponse);

    setTableTwoData(
      mappedDataToSetTableTwo.concat(mappedDataToSetTableTwoPlus)
    );
  };

  const validateAffiliateType = (
    verifyRightsResponse: RightsVerifyInterface
  ) => {
    const mappedDataToSetTableTwo: KeyValueTextProps[] = [];

    switch (verifyRightsResponse.TipoTrabajador) {
      case TYPE_PENSIONER_CODE:
        setShowCompany(false);
        mappedDataToSetTableTwo.push({
          keyReference: "Tipo de afiliado: ",
          value: "Pensionado",
        });
        mappedDataToSetTableTwo.push({
          keyReference: "Fecha de afiliación: ",
          value: formatFromSAPDateToSVEDate(
            verifyRightsResponse.TitularFechaInicioVigencia ?? ""
          ),
        });
        mappedDataToSetTableTwo.push({
          keyReference: "Salario: ",
          value: verifyRightsResponse.ValorSalario ?? "",
        });
        break;
      case TYPE_PENSIONER_25_CODE:
        setShowCompany(false);
        mappedDataToSetTableTwo.push({
          keyReference: "Tipo de afiliado: ",
          value: "Pensionado 25 años",
        });
        mappedDataToSetTableTwo.push({
          keyReference: "Fecha de afiliación: ",
          value: formatFromSAPDateToSVEDate(
            verifyRightsResponse.TitularFechaInicioVigencia ?? ""
          ),
        });
        mappedDataToSetTableTwo.push({
          keyReference: "Salario: ",
          value: verifyRightsResponse.ValorSalario ?? "",
        });
        break;
      case TYPE_INDEPENDENT_CODE:
        setShowCompany(false);
        mappedDataToSetTableTwo.push({
          keyReference: "Tipo de afiliado: ",
          value: "Independiente",
        });
        mappedDataToSetTableTwo.push({
          keyReference: "Fecha de afiliación: ",
          value: formatFromSAPDateToSVEDate(
            verifyRightsResponse.TitularFechaInicioVigencia ?? ""
          ),
        });
        mappedDataToSetTableTwo.push({
          keyReference: "Salario: ",
          value: verifyRightsResponse.ValorSalario ?? "",
        });
        break;
      default:
        return mappedDataToSetTableTwo;
    }

    mappedDataToSetTableTwo.push({
      keyReference: "Tipo de aporte: ",
      value: verifyRightsResponse.Desc_mod_aporte ?? "",
    });

    return mappedDataToSetTableTwo;
  };

  useEffect(() => {
    buildInfoTable();
  }, [companySelected]);

  useEffect(() => {
    getInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 h-full w-[85%] flex justify-center items-center">
        <FlexLoadingAnimation
          containerClassName="w-32 h-32 bg-none flex justify-center items-center ml-4 overflow-hidden"
          className="w-full h-full"
        />
      </div>
    );
  }

  if (!hasPermissions) {
    // Usuario no tiene permisos: mostramos mensaje de error
    return (
      <div className="flex flex-col w-full h-full pr-20 justify-center items-center">
        <FailIcon className="mt-32" />
        <NeutralBlackText text="NO te encuentras afiliado como titular a la caja de compensación COMFANDI" />
      </div>
    );
  }

  // Usuario con permisos: render principal
  return (
    <div className="w-full h-full pr-20">
      <SectionSeparator className="w-full" />

      <MainTitle
        text={toUpperCamelCase(name ?? "")}
        className="font-outfit text-4xl font-bold text-principal-80"
      />
      {showCompany && (
        <div className="flex w-full justify-start self-start items-start mt-5">
          <SimpleDropdown
            label={companySelected!.EmpleadorRazonSocial ?? "Seleccionar"}
            content={companyNames}
            classname="w-full text-principal-180 font-outfit font-semibold"
            disabled={false}
            onChange={(name: string) => {
              const company = companies?.find(
                (c) => c.EmpleadorRazonSocial === name
              );
              if (company) {
                setCompanySelected(company);
              }
            }}
          />
        </div>
      )}

      {/* ________________________________________ Worker section */}

      {/* ____________________ Worker actions */}
      <SecondaryText
        text="Acciones"
        className="font-outfit text-2xl font-bold text-principal-180 mt-12"
      />

      <RedirectButtonList
        className="flex flex-col lg:flex-row mt-10 w-full gap-12"
        redirectButtons={workerButtonList}
      />

      {/* ____________________ Worker data */}
      <SecondaryText
        text="Información del trabajador"
        className="font-outfit text-2xl font-bold text-principal-180 mt-6"
      />

      <div className="w-full flex flex-col lg:flex-row mt-8 gap-8">
        <div className="w-full lg:w-[calc(500px)] h-fit lg:h-[calc(210px)]">
          {tableOneData && <KeyValueTable keyValueData={tableOneData} />}
        </div>
        <div className="w-full lg:w-[calc(500px)] h-fit lg:h-[calc(210px)]">
          {tableTwoData && <KeyValueTable keyValueData={tableTwoData} />}
        </div>
      </div>

      {/* ________________________________________ Beneficiaries section */}

      <SecondaryText
        text="Beneficiarios del trabajador"
        className="font-outfit text-2xl font-bold text-principal-180 pt-6"
      />

      {/* ____________________ Beneficiaries actions */}
      <div className="w-full md:-ml-5 grid grid-cols-3 md:grid-cols-1 md:m-0 md:px-4 md:gap-x-6 gap-y-10 xl:grid-cols-3 xl:w-fit place-items-center">
        <RedirectButtonList redirectButtons={buttonList} />
      </div>

      {/* ____________________ Beneficiaries list */}
      <div className="w-full flex flex-row justify-start mt-8">
        <NeutralBlackText
          fontSize="lg"
          className="self-center"
          text="Ingresa al beneficiario para gestionarlo"
        />
      </div>

      <div className="w-full grid xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 my-10 py-5">
        {pacsItems?.map((data) => (
          <PacCard
            key={`${data.pacName}-${data.pacDocument}`}
            name={data.pacName}
            document={data.pacDocument}
            kinship={data.kindship}
            version={
              data.pac.PACMotivoBloqueoDocumentacion == BLOQUED_PAC_DOCUMENT ||
              data.pac.PACMotivoBloqueoDocumentacion ==
                BLOQUED_PAC_DOCUMENT_QA ||
              data.pac.PACMotivoBloqueoSubsidio == BLOQUED_PAC_SUBSIDY ||
              data.pac.PACMotivoBloqueoSubsidio == BLOQUED_PAC_DOCUMENT_QA
                ? "3"
                : "2"
            }
            onPress={() => {
              dispatch(setPacState(data.pac));
              router.push("affiliations/pac-details");
            }}
          />
        ))}
      </div>
    </div>
  );
};

"use client";
import { Button } from "@nextui-org/react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import FindAllCampaignsFilteredUseCase from "domain/usecases/campaign/findAllCampaignsFiltered.use.case";
import FindAllStatusUseCase from "domain/usecases/status/findAllStatus.use.case";
import { FormikProps, useFormik } from "formik";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import {
  AFFILIATIONS_CAMPAIGN_TYPE,
  AUTH_LOADING_STATUS,
  AUTHENTICATED_STATUS,
  CAMPAIGN_APROVED_RETRAIT_AFFILIATION_CODE,
  CAMPAIGN_INDIVIDUAL_AFFILIATION_CODE,
  CAMPAIGN_MASSIVE_AFFILIATION_CODE,
  CAMPAIGN_PAC_AFFILIATION_CODE,
  CAMPAIGN_PAC_UPDATE_SCHOOL_CERTIFICATE,
  CAMPAIGN_PAC_WITHDRAWAL_APROVED_CODE,
  CAMPAIGN_PAC_WITHDRAWAL_CODE,
  CAMPAIGN_WHITOUT_APROVED_RETRAIT_AFFILIATION_CODE,
  CampaignsFilter,
  CAMPAING_AFFILIATIONS_PENSIONER_IDS,
  extractDate,
  FILED_STATUS_FILED_CODE,
  FILED_STATUS_PROCESSED_WITH_ERROR_CODE,
  FILED_STATUS_REJECTION_CODE,
  FILED_STATUS_SUCCESSFULLY_PROCESSED_CODE,
  formatDateRange,
  KINDSHIP,
  REASON,
  REASON_WITHDRAWAL_PAC_LIST,
  SALARY_TYPE,
  SelectOption,
  UserDataInterface,
} from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Description,
  DetailsIcon,
  MainTitle,
  NeutralBlackText,
} from "presentation/components/atoms";
import {
  FiledDetailsDeniedPensionerCard,
  FiledFilters,
  FormFiledValues,
} from "presentation/components/organisms/affiliations";

import { CreateForm, Form, Request } from "domain/models";
import FindAllRequestsUseCase from "domain/usecases/request/findAllRequests.use.case";
import { jwtDecode } from "jwt-decode";
import {
  FiledDetailsCardInterface,
  GenericDataRow,
  RequestFilter,
  RequestTable,
} from "lib/types/table";
import { FiledTableBody } from "presentation/components/molecules";
import Paginator from "presentation/components/molecules/common/table/Paginator";
import { FiledDetailsCard } from "presentation/components/organisms/affiliations/filed/FiledDetailsCard";
import { DataFetcher, usePagination } from "presentation/hooks";
import { useEffect, useState } from "react";
import { ModalSecondTemplate } from "./ModalSecondTemplate";

export default function FiledTable(): JSX.Element {
  const filedModalCard: FiledDetailsCardInterface = {
    filedInforSection: {
      mainTitle: "Estado de la Solicitud: ",
      status: "Procesando",
      firstDescription: "Tipo de Solicitud:",
      secondDescription: "Fecha de radicación:",
      rightTextTitle: "Número de Radicado:",
      rightTextDesc: "97087663",
    },
    bodyMessage: "Hemos recibido tu solicitud y estamos trabajando en ella.",
    secondBodyMessage: "Este procedimiento puede tomar unos minutos.",
    requestInfo: {},
  };

  const initalFilterValues: FormFiledValues = {
    affiliateDocumentNumber: "",
    benefitDocumentNumber: "",
    filed: "",
    requestType: "",
    requestStatus: { label: "Estado de la solicitud", value: "" },
    rangeDate: [],
  };

  const { data: session, status } = useSession();
  const statusSession = status;

  const findAllRequestsRepository = appContainer.get<FindAllRequestsUseCase>(
    USECASES_TYPES._FindAllRequestsTypesUseCase
  );
  const getCampaignFilters = appContainer.get<FindAllCampaignsFilteredUseCase>(
    USECASES_TYPES._FindAllCampaignsFilteredUseCase
  );
  const findAllStatusUseCase = appContainer.get<FindAllStatusUseCase>(
    USECASES_TYPES._FindAllStatusUseCase
  );

  const [requestData, setRequestData] = useState<Request[]>();
  const [filedTableItems, setFiledTableItems] = useState<RequestTable[]>([]);
  const [availableRequestStatus, setAvailableRequestStatus] =
    useState<{ label: string; value: string }[]>();
  const [availableRequestTypes, setAvailableRequestTypes] =
    useState<{ label: string; value: string }[]>();
  const [modalContent, setModalContent] =
    useState<FiledDetailsCardInterface>(filedModalCard);
  const [showModalDetails, setShowModalDetails] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<
    Request & { isDenied: boolean }
  >();

  const router = useRouter();
  //all good 1

  const getContentInfo = (campaignId: string, content: any) => {
    let contentInfo: Record<string, string> = {};

    if (parseInt(campaignId) == CAMPAIGN_INDIVIDUAL_AFFILIATION_CODE) {
      const tipoSalario = SALARY_TYPE.find(
        (val) => val.value == content.TipoSalario
      );

      const tipoContrato = SALARY_TYPE.find(
        (val) => val.value === content.TipoContrato
      );
      contentInfo = {
        "Nombres y apellidos": `${content.Nombre1 ?? ""} ${
          content.Nombre2 ?? ""
        } ${content.Apellido1 ?? ""} ${content.Apellido2 ?? ""}`,
        "Tipo y numero de identificación": `${content.tipoDocumento ?? ""} ${
          content.Documento ?? ""
        }`,
        "Fecha de nacimiento": content.Nacimiento,
        Dirección: content.NuevaLocacion,
        Celular: content.Celular,
        Email: content.Email,
        "Fecha de ingreso a la empresa": content.FechaIngreso,
        "Horas diarias": content.HorasDiarias,
        "Sueldo declarado": content.Sueldo,
        "Tipo de salario": tipoSalario?.label ?? "",
        "Tipo de contrato": tipoContrato?.label ?? "",
      };
    }
    if (parseInt(campaignId) == CAMPAIGN_PAC_AFFILIATION_CODE) {
      let parentesco = KINDSHIP.find(
        (val) => val.value == content.sapData.PACParentesco
      );
      parentesco ??= { label: "Padre o Madre", value: "3" };

      contentInfo = {
        "Nombres y apellidos": content.userName.trim(),
        "Tipo y numero de identificación": `${content.userTypeDocument ?? ""} ${
          content.userDocument ?? ""
        }`,
        "Fecha de nacimiento": `${content.sapData.PACDatosPersonaFechaNacimiento.slice(
          0,
          4
        )}-${content.sapData.PACDatosPersonaFechaNacimiento.slice(
          4,
          6
        )}-${content.sapData.PACDatosPersonaFechaNacimiento.slice(6, 8)}`,
        "Fecha de afiliación": `${content.sapData.FechaVigenciaDesde.slice(
          0,
          4
        )}-${content.sapData.FechaVigenciaDesde.slice(
          4,
          6
        )}-${content.sapData.FechaVigenciaDesde.slice(6, 8)}`,
        Parentesco: parentesco?.label ?? "",
      };
    }
    if (
      parseInt(campaignId) == CAMPAIGN_APROVED_RETRAIT_AFFILIATION_CODE ||
      parseInt(campaignId) == CAMPAIGN_WHITOUT_APROVED_RETRAIT_AFFILIATION_CODE
    ) {
      let motivo = REASON.find((val) => val.value == content.reason);
      contentInfo = {
        "Nombres y apellidos": content.userFullName.trim(),
        "Tipo y numero de identificación": `${content.userTypeDocument ?? ""} ${
          content.userDocument ?? ""
        }`,
        "Fecha de retiro": content.dateWithdrawal,
        "Motivo de retiro": motivo?.label ?? "",
      };
    }
    if (
      parseInt(campaignId) == CAMPAIGN_PAC_WITHDRAWAL_APROVED_CODE ||
      parseInt(campaignId) == CAMPAIGN_PAC_WITHDRAWAL_CODE
    ) {
      let motivo = REASON_WITHDRAWAL_PAC_LIST.find(
        (val) => val.value == content.sapData.motivoRetiro
      );
      contentInfo = {
        "Nombres y apellidos": content.userName.trim(),
        "Tipo y numero de identificación": `${content.userTypeDocument ?? ""} ${
          content.userDocument ?? ""
        }`,
        "Fecha de retiro": `${content.sapData.fechaVigenciaHasta.slice(
          0,
          4
        )}-${content.sapData.fechaVigenciaHasta.slice(
          4,
          6
        )}-${content.sapData.fechaVigenciaHasta.slice(6, 8)}`,
        "Motivo de retiro": motivo?.label ?? "",
      };
    }

    return contentInfo;
  };

  const getRequests: DataFetcher<Request, RequestFilter> = async (
    pageIndex: number,
    pageSize: number,
    filters?: RequestFilter
  ) => {
    if (!(statusSession == AUTHENTICATED_STATUS)) {
      return { items: [], totalRecords: 0 };
    }

    let { identification_number } = jwtDecode(
      session?.access_token!
    ) as UserDataInterface;
    let filtersToSend: RequestFilter;
    if (!filters) {
      filtersToSend = {
        document: identification_number,
        // companyId: companySelected?.id.toString(), TODO: Ajustar filtros por usuario
      };
    } else {
      filtersToSend = filters;
    }

    const result = await findAllRequestsRepository.execute(
      session?.access_token,
      pageIndex,
      pageSize,
      filtersToSend
    );

    if (!result) {
      return { items: [], totalRecords: 0 };
    }

    const sortedRequests = result.requests.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    // Setting request in state
    setRequestData(sortedRequests);
    const requestMap: RequestTable[] = sortedRequests.map((request, index) => {
      return {
        id: request.id,
        radicate: request.radicate.toString() ?? "-", // Already safe, as radicate is a string
        campaign: request.campaigns?.name ?? "-",
        status: request.status,
        createdAt: extractDate(request.createdAt) ?? "-",
        documentType:
          (request.userTypeDocument?.trim() ?? "").length < 1
            ? ""
            : request.userTypeDocument,
        document:
          (request.userDocument?.trim().length ?? 0) < 1
            ? ""
            : request.userDocument,
        fullname:
          (request.userFullName?.trim().length ?? 0) < 1
            ? "-"
            : request.userFullName ?? "",
        beneffitDocumentType:
          (request.beneffitDocumentType?.trim() ?? "").length < 1
            ? ""
            : request.beneffitDocumentType,
        beneffitDocument:
          (request.beneffitDocument?.toString().trim().length ?? 0) < 1 // Convert to string
            ? ""
            : request.beneffitDocument?.toString(), // Convert to string
        beneffitFullname:
          (request.beneffitFullname?.trim().length ?? 0) < 1
            ? "-"
            : request.beneffitFullname ?? "",
      };
    });

    setFiledTableItems(requestMap);
    return { items: sortedRequests, totalRecords: result.trecords };
  };

  const columns: ColumnDef<GenericDataRow>[] = [
    {
      accessorKey: "radicate",
      header: "Número de radicado",
      cell: (info) => (
        <NeutralBlackText
          className={
            "w-full justify-self-center line-clamp-2 align-middle text-start self-center"
          }
          text={info.row.original.radicate}
        />
      ),
    },
    {
      accessorKey: "detail",
      header: "Detalle",
      cell: (info) => (
        <Button
          className="rounded-full h-[calc(40px)] w-[calc(40px)]"
          isIconOnly
          onPress={() => {
            const request = requestData?.find(
              (requestStored) => requestStored.id == info.row.original.id
            );
            setModalContent({ ...filedModalCard });
            const instaceOfModalCard = { ...filedModalCard };
            const formInfo: CreateForm = request?.form! as CreateForm;

            setShowModalDetails(true);
            instaceOfModalCard.filedInforSection.status =
              request?.statusId?.toString();
            instaceOfModalCard.filedInforSection.firstDescription = `Tipo de Solicitud: ${request?.campaigns?.name}`;
            instaceOfModalCard.filedInforSection.secondDescription = `Fecha de radicación: ${extractDate(
              request?.createdAt ?? "-"
            )}`;
            instaceOfModalCard.filedInforSection.rightTextDesc = `${request?.radicate}`;
            instaceOfModalCard.filedId = request?.id;
            if (
              request?.statusId ==
              Number(FILED_STATUS_SUCCESSFULLY_PROCESSED_CODE)
            ) {
              instaceOfModalCard.bodyMessage =
                "Tu solicitud se encuentra finalizada puedes encontrar mas detalles aquí:";
              instaceOfModalCard.secondBodyMessage = undefined;
              instaceOfModalCard.filedInforSection.ClassNameStatus = undefined;
            } else if (
              request?.statusId ==
              Number(FILED_STATUS_PROCESSED_WITH_ERROR_CODE)
            ) {
              instaceOfModalCard.bodyMessage = `Lamentamos informarte que tu ${request?.campaigns?.name.toLowerCase()} ha sido rechazada. No te preocupes, descarga los documentos previamente cargados para corregir tu solicitud`;
              instaceOfModalCard.secondBodyMessage = undefined;
              instaceOfModalCard.filedInforSection.ClassNameStatus =
                "text-principal-510";
            } else if (request?.statusId == Number(FILED_STATUS_FILED_CODE)) {
              instaceOfModalCard.bodyMessage =
                "Hemos recibido su solicitud de afiliación";
              instaceOfModalCard.secondBodyMessage = `${
                request.userFullName ?? ""
              } ${request.userDocument ?? ""} y estamos trabajando en ella.`;
              instaceOfModalCard.thridBodyMessage = `Este proceso puede tomar unos minutos.`;
              instaceOfModalCard.filedInforSection.ClassNameStatus = undefined;
            } else {
              instaceOfModalCard.filedInforSection.ClassNameStatus = undefined;
            }
            instaceOfModalCard.requestInfo = getContentInfo(
              request?.campaignId!,
              formInfo.content
            );

            if (
              request?.campaignId !=
              CAMPAIGN_MASSIVE_AFFILIATION_CODE.toString()
            ) {
              instaceOfModalCard.requestInfo = {
                ...instaceOfModalCard.requestInfo,
                "Nombre y apellido titular": request?.userFullName ?? "",
                " Tipo y numero de documento del titular": `${request?.userTypeDocument} ${request?.userDocument}`,
              };
            }

            if (
              request?.campaignId == CAMPAIGN_PAC_AFFILIATION_CODE.toString() &&
              request.statusId == FILED_STATUS_SUCCESSFULLY_PROCESSED_CODE
            ) {
              instaceOfModalCard.canCertificate = true;
            }

            setModalContent({ ...instaceOfModalCard });
          }}
        >
          <DetailsIcon />
        </Button>
      ),
    },
    {
      id: "campaing",
      header: "Tipo de solicitud",
      cell: (info) => (
        <NeutralBlackText
          className={
            "w-full justify-self-center line-clamp-2 align-middle text-start self-center"
          }
          text={info.row.original.campaign}
        />
      ),
    },
    {
      id: "status",
      header: "Estado del Radicado",
      cell: (info) => (
        <NeutralBlackText
          className={
            "w-full justify-self-center line-clamp-2 align-middle text-start self-center"
          }
          text={info.row.original.status?.name}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Fecha del radicado",
      cell: (info) => (
        <NeutralBlackText
          className={
            "w-full justify-self-center line-clamp-2 align-middle text-start self-center"
          }
          text={info.row.original.createdAt}
        />
      ),
    },
    {
      accessorKey: "beneficiary", // Identificador único para la nueva columna
      header: "Beneficiario",
      cell: (info) => {
        // Acceder a los valores de tipo de documento, número de documento y nombre completo desde el objeto `row`
        const documentType = info.row.original.beneffitDocumentType ?? "";
        const document = info.row.original.beneffitDocument ?? "";
        const fullname = info.row.original.beneffitFullname?.trim() ?? "";
        // Retorna ambos valores en un formato unido para la visualización
        return (
          <NeutralBlackText
            className={
              "w-full justify-self-center line-clamp-2 align-middle text-start self-center"
            }
            text={`${fullname} - ${
              documentType && document ? documentType + " " + document : "-"
            }`}
          />
        );
      },
    },
    {
      id: "trabajador", // Identificador único para la nueva columna
      header: "Trabajador",
      cell: (info) => {
        // Acceder a los valores de tipo de documento, número de documento y nombre completo desde el objeto `row`
        const documentType = info.row.original.documentType ?? "";
        const document = info.row.original.document ?? "";
        const fullname = info.row.original.fullname ?? "";
        // Retorna ambos valores en un formato unido para la visualización
        return (
          <NeutralBlackText
            className={
              "w-full justify-self-center line-clamp-2 align-middle text-start self-center"
            }
            text={`${fullname.length > 0 ? fullname : "-"} - ${
              documentType && document ? documentType + " " + document : "-"
            }`}
          />
        );
      },
    },
  ];

  const table = useReactTable<GenericDataRow>({
    columns,
    data: filedTableItems,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  const { setPageSize } = table;

  const { pageIndex, setPageIndex, pageCount, setFilters, isLoading, filters } =
    usePagination<Request>(getRequests, table.getState().pagination.pageSize);

  const onPaginationChange = (newPageIndex: number, newPageSize: number) => {
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);
    getRequests(newPageIndex, newPageSize, filters);
  };

  const getFiltersData = async () => {
    if (!(statusSession == AUTHENTICATED_STATUS)) {
      return;
    }
    const campaignFilter: CampaignsFilter[] = [];
    Object.entries(AFFILIATIONS_CAMPAIGN_TYPE).forEach((key) => {
      const campaingFilterToAdd: CampaignsFilter = {
        campaignType: key[0],
      };
      campaignFilter.push(campaingFilterToAdd);
    });

    const CampaignsToShow = await getCampaignFilters.execute(
      session?.access_token,
      campaignFilter
    );

    if (CampaignsToShow) {
      const optionCampaign: { label: string; value: string }[] = [];
      CampaignsToShow?.forEach((campaign) => {
        if (
          campaign.id!.toString() ===
          CAMPAIGN_PAC_UPDATE_SCHOOL_CERTIFICATE.toString()
        ) {
          return;
        }
        optionCampaign.push({
          label: campaign.name,
          value: campaign.id!.toString(),
        });
      });

      setAvailableRequestTypes(optionCampaign);
    }
    const status = await findAllStatusUseCase.execute(session?.access_token);

    const optionsLocal =
      status?.status.map((camp) => {
        return {
          label: camp.name,
          value: camp.id?.toString() ?? "",
        };
      }) ?? [];

    setAvailableRequestStatus(optionsLocal);
  };
  useEffect(() => {
    getRequests(0, 5, filters);
    getFiltersData();
    return () => {};
  }, [session]);

  const formikFormFilter: FormikProps<FormFiledValues> = useFormik({
    initialValues: initalFilterValues,
    onSubmit: (values) => {
      const { identification_number } = jwtDecode(
        session?.access_token!
      ) as UserDataInterface;
      const { startDate, endDate } = formatDateRange(values.rangeDate ?? []);

      const filters: RequestFilter = {
        radicate: values.filed,
        campaignId: values.requestType ? values.requestType.toString() : "",
        status:
          typeof values.requestStatus === "object" || !values.requestStatus
            ? ""
            : String(values.requestStatus),
        document: identification_number,
        startCreatedAt: startDate,
        endCreatedAt: endDate,
      };

      // Recarga la tabla con la página inicial y los nuevos filtros
      getRequests(0, table.getState().pagination.pageSize, filters);
    },
    onReset(values) {
      getRequests(0, table.getState().pagination.pageSize);
    },
  });

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <MainTitle text="Radicados" />
      <Description
        className="text-base text-justify mt-4 font-light text-principal-180"
        text="Aquí podrás visualizar los radicados de tu empresa"
      />
      <div className="w-full flex flex-col gap-5 sm:gap-6">
        <FiledFilters
          formik={formikFormFilter}
          className=""
          AvailableRequestStatus={availableRequestStatus ?? []}
          AvailableRequestsTypes={availableRequestTypes ?? []}
        />
        <FiledTableBody table={table} isLoading={isLoading} />
        <Paginator
          pageIndex={pageIndex}
          pageSize={table.getState().pagination.pageSize}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < pageCount - 1}
          pageCount={pageCount}
          setPageIndex={(newPageIndex) => {
            setPageIndex(newPageIndex);
            onPaginationChange(
              newPageIndex,
              table.getState().pagination.pageSize
            );
          }}
          setPageSize={(newPageSize) => {
            onPaginationChange(0, newPageSize);
          }}
        />
      </div>
      {showModalDetails && (
        <ModalSecondTemplate
          className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh] overflow-y-auto"
          onButtonClick={() => setShowModalDetails(!showModalDetails)}
          isOpen={showModalDetails}
        >
          <FiledDetailsCard
            {...modalContent}
            onPressBackButton={() => setShowModalDetails(!showModalDetails)}
          />
        </ModalSecondTemplate>
      )}
    </section>
  );
}

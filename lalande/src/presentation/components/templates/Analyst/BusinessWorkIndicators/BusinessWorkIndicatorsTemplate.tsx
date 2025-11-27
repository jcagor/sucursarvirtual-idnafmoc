"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { BusinessHoursReportList } from "domain/models/Appointment/reportsTypes";
import GetBusinessHoursReportUseCase from "domain/usecases/Appointment/getBusinessHoursReport.use.case";
import GetWorkPlanReportUseCase from "domain/usecases/WorkPlan/GetWorkPlanReport.usecase";
import { isString } from "formik";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import { CONSULTANT_TRACKING_BUSINESS_PER_PAGE } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NeutralNCText, SectionSeparator } from "presentation";
import { useEffect, useState } from "react";

export const BusinessWorkIndicatorsTemplate = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [reports, setReports] = useState<BusinessHoursReportList>();
  const [businessInformation, setBusinessInformation] =
    useState<Array<string | Object>>();

  const previousSteep = () => {
    router.push("/analyst/reports/review");
  };

  // PAGINATION
  const [cardPage, setCardPage] = useState(1);

  const navigateOffersForward = () => {
    //console.log("fw");
    if (reports) {
      if (
        reports?.length > 0 &&
        cardPage * CONSULTANT_TRACKING_BUSINESS_PER_PAGE < reports?.length
      ) {
        setCardPage((prevState) => {
          return prevState + 1;
        });
        //console.log("page:", cardPage);
      }
    }
  };

  const navigateOffersBackwards = () => {
    //console.log("bk");
    if (reports) {
      if (reports.length > 0 && cardPage > 1) {
        setCardPage((prevState) => {
          return prevState - 1;
        });
        //console.log("page:", cardPage);
      }
    }
  };

  const getBusinessIndicatorsList = async () => {
    const query = {};
    const getReportList = appContainer.get<GetWorkPlanReportUseCase>(
      USECASES_TYPES._GetWorkPlanReportUseCase
    );
    const interventionData = await getReportList.execute(
      query,
      session?.access_token ?? ""
    );
    if (interventionData === undefined) {
      return;
    }
    //console.log(interventionData);
    const interventionDataReview = interventionData.map((row, index) => {
      let newRow;

      let workPlan = row.workPlan;

      let indicators = workPlan.indicators.map((ind) => {
        return [
          ind.indicator,
          ind.baseline,
          ind.unit,
          ind.goal,
          ind.finalValue,
          ind.mobility,
        ];
      });

      if (indicators.length >= 1) {
        newRow = [
          { rowSpan: workPlan.indicators.length, text: index + 1 + "" },
          { rowSpan: workPlan.indicators.length, text: row.businessName },
          { rowSpan: workPlan.indicators.length, text: workPlan.keyActivity },
          ...indicators[0],
        ];

        let leftIndicators = indicators.slice(1, indicators.length);
        return [newRow, ...leftIndicators];
      } else {
        let refill = ["", "", "", "", ""];
        newRow = [
          { rowSpan: workPlan.indicators.length, text: index + 1 + "" },
          { rowSpan: workPlan.indicators.length, text: row.businessName },
          { rowSpan: workPlan.indicators.length, text: workPlan.keyActivity },
          ...refill,
        ];
        return newRow;
      }
    });

    //console.log(interventionDataReview);

    let interventionRows;
    for (const intervention of interventionDataReview) {
      interventionRows = [...(interventionRows ?? []), ...intervention];
    }

    console.log(interventionRows);

    if (interventionRows && interventionRows.length >= 1) {
      setBusinessInformation(interventionRows);
    }
  };

  useEffect(() => {
    getBusinessIndicatorsList();
  }, []);

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Reporte de indicadores por empresa" />
      <SectionSeparator className="mt-4" />

      <div className="w-full md:w-11/12 mb-10 text-xs">
        {/*<div className="block text-center">*/}
        {/**border-2 border-dotted border-[#000] */}

        <table className="table-auto w-full text-align-center">
          <thead>
            <tr className="border-t-gray-700 text-gray-500">
              <th>No.</th>
              <th>Empresa</th>
              <th>Actividades Clave</th>
              <th>Indicador Asociado</th>
              <th>Linea Base</th>
              <th>Unidad</th>
              <th>Meta</th>
              <th>Valor Final</th>
              <th>Movilidad</th>
            </tr>
          </thead>
          <tbody>
            {businessInformation ? (
              businessInformation.map((businessInfo, idx) => {
                let rowSpan = 1;
                let partial = false;
                //console.log(businessInfo);
                if (
                  Array.isArray(businessInfo) &&
                  !isString(businessInfo[0]) &&
                  "rowSpan" in businessInfo[0]
                ) {
                  rowSpan = businessInfo[0].rowSpan;
                } else {
                  partial = true;
                }
                return (
                  <tr
                    className="border-t-2 border-gray-300"
                    key={"table_row_" + idx}
                  >
                    {!partial && (
                      <td scope="col" rowSpan={rowSpan} className="px-6 py-3">
                        {Array.isArray(businessInfo) && businessInfo[0].text}
                      </td>
                    )}
                    {!partial && (
                      <td scope="col" rowSpan={rowSpan} className="px-6 py-3">
                        {Array.isArray(businessInfo) && businessInfo[1].text}
                      </td>
                    )}
                    {!partial && (
                      <td scope="col" rowSpan={rowSpan} className="px-6 py-3">
                        {Array.isArray(businessInfo) && businessInfo[2].text}
                      </td>
                    )}

                    <td scope="col" className="px-6 py-3">
                      {Array.isArray(businessInfo) &&
                        (partial ? businessInfo[0] : businessInfo[3])}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {Array.isArray(businessInfo) &&
                        (partial ? businessInfo[1] : businessInfo[4])}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {Array.isArray(businessInfo) &&
                        (partial ? businessInfo[2] : businessInfo[5])}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {Array.isArray(businessInfo) &&
                        (partial ? businessInfo[3] : businessInfo[6])}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {Array.isArray(businessInfo) &&
                        (partial ? businessInfo[4] : businessInfo[7])}
                    </td>
                    <td scope="col" className="px-6 py-3">
                      {Array.isArray(businessInfo) &&
                        (partial ? businessInfo[5] : businessInfo[8])}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9}>No se encuentran registros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/** Navigation */}
      <div className="mt-10 flex justify-center">
        <div className="w-15">
          <div className="flex">
            <a
              onClick={navigateOffersBackwards}
              onKeyUp={() => {}}
              className="cursor-pointer"
            >
              <Image
                src={"/lalande/icons/icon_back.svg"}
                alt="Pagina anterior"
                width={10}
                height={10}
                draggable={false}
                className="flex mr-2"
              />
            </a>
            <NeutralNCText
              text={` Pag. ${cardPage} de (${
                reports?.length
                  ? Math.ceil(
                      reports.length / CONSULTANT_TRACKING_BUSINESS_PER_PAGE
                    )
                  : "0"
              }) `}
              className={"text-md cf-text-principal-180 font-bold"}
            />
            <a
              onClick={navigateOffersForward}
              onKeyUp={() => {}}
              className="cursor-pointer"
            >
              <Image
                src={"/lalande/icons/icon_next.svg"}
                alt="Pagina siguiente"
                width={10}
                height={10}
                draggable={false}
                className="flex ml-2"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex-auto flex items-center">
        <a
          onClick={previousSteep}
          onKeyDown={() => {}}
          className="cursor-pointer"
        >
          <NeutralNCText
            text="Atrás"
            className="cf-text-principal-180 mb-[2rem] md:mb-9"
            fontSize="md"
          />
        </a>
      </div>
    </div>
  );
};

"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import GetBusinessHoursReportUseCase from "domain/usecases/Appointment/getBusinessHoursReport.use.case";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import { CONSULTANT_TRACKING_BUSINESS_PER_PAGE } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { NeutralNCText, SectionSeparator } from "presentation";
import { useEffect, useState } from "react";

export const ConsultantHoursTrackingTemplate = () => {

  const { data: session } = useSession();
  const [reports, setReports] = useState<BusinessHoursReportList>();

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

  const getHoursReportsList = async () => {
    const query = {};
    const getReportList = appContainer.get<GetBusinessHoursReportUseCase>(
      USECASES_TYPES._GetBusinessHoursReportUseCase
    );
    const response = await getReportList.execute(query, session?.access_token);
    if (response === undefined) {
      return;
    }
    console.log(response);
    setReports(response);
  };

  useEffect(() => {
    getHoursReportsList();
  }, []);

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Reporte de horas soporte por empresa" />
      <SectionSeparator className="mt-4" />

      <div className="w-full md:w-11/12 mb-10 text-xs">
        <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-1 px-8">
          <div className="w-full grid grid-cols-8 gap-2 items-center justify-center text-center text-principal-350 font-bold rounded-t-lg py-2 border-b-[2px] border-principal-450/20">
            <div>Item N°</div>
            <div>Empresa</div>
            <div>Horas Proyectadas</div>
            <div>Horas Ejecutadas</div>
            <div>Horas Proyectadas (%)</div>
            <div>Horas Ejecutadas (%)</div>
            <div>Horas Proyectadas Total</div>
            <div>Horas Ejecutadas Total</div>
          </div>
          <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full rounded-b-lg">
            {reports &&
              reports.map((report, index) => {
                let startIndex =
                  cardPage * CONSULTANT_TRACKING_BUSINESS_PER_PAGE -
                  CONSULTANT_TRACKING_BUSINESS_PER_PAGE;
                let stopIndex =
                  cardPage * CONSULTANT_TRACKING_BUSINESS_PER_PAGE;

                if (index >= startIndex && index < stopIndex) {
                  return (
                    <div
                      key={"h-rep-" + index}
                      className="w-full grid grid-cols-8 gap-2 items-center justify-center text-center text-principal-450 py-2"
                    >
                      <div>{`#${index + 1}`}</div>
                      <div>{report.businessName}</div>
                      <div>{report.hoursPlaned}</div>
                      <div>{report.hoursExecuted}</div>
                      <div>
                        <span>{"100%"}</span>
                      </div>
                      <div>
                        <span>
                          {Number(
                            (Number.parseInt(report.hoursExecuted) * 100) /
                              Number.parseInt(report.hoursPlaned)
                          ).toFixed(2)}
                          %
                        </span>
                      </div>
                      <div>{report.hoursPlanedComplete}</div>
                      <div>{report.hoursExecutedComplete}</div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
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
    </div>
  );
};

"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { BusinessAttendedReportList } from "domain/models/Appointment/reportsTypes";
import GetBusinessHoursReportUseCase from "domain/usecases/Appointment/getBusinessHoursReport.use.case";
import GetConsultantBusinessReportUseCase from "domain/usecases/Appointment/getConsultantBusinessReport.use.case";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import { CONSULTANT_TRACKING_BUSINESS_PER_PAGE } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { NeutralNCText, SectionSeparator } from "presentation";
import { useEffect, useState } from "react";

export const ConsultantBusinessTrackingTemplate = () => {
  const { data: session } = useSession();
  const [reports, setReports] = useState<BusinessAttendedReportList>();

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

  const getBusinessReportList = async () => {
    const query = {};
    const getReportList = appContainer.get<GetConsultantBusinessReportUseCase>(
      USECASES_TYPES._GetConsultantBusinessReportUseCase
    );
    const response = await getReportList.execute(query, session?.access_token);
    if (response === undefined) {
      return;
    }
    console.log(response);
    setReports(response);
  };

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    getBusinessReportList();
  }, []);

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Reporte de empresas por consultor" />
      <SectionSeparator className="mt-4" />

      <div className="w-full md:w-11/12 mb-10 text-xs">
        <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-1 px-8">
          <div className="w-full grid grid-cols-4 gap-2 items-center justify-center text-center text-principal-350 font-bold rounded-t-lg py-2 border-b-[2px] border-principal-450/20">
            <div>Item N°</div>
            <div>Consultor</div>
            <div>Nº Empresas</div>
            <div>Detalle</div>
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
                    <div key={"h-rep-" + index} className="w-full">
                      <div className="grid grid-cols-4 gap-2 items-center justify-center text-center text-principal-450 py-2">
                        <div>{`#${index + 1}`}</div>
                        <div>{report.consultantName}</div>
                        <div>{report.businessAttended}</div>
                        <div>
                          <span
                            onClick={() => toggleExpand(report.consultantId)}
                            onKeyUp={() => {}}
                            className="cursor-pointer"
                          >
                            {"VER"}
                          </span>
                        </div>
                      </div>

                      {/* Empleados desplegados */}
                      {expandedId === report.consultantId &&
                        report.businessList &&
                        report.businessList.length > 0 && (
                          <div className="pl-4 pr-4 pb-2 bg-gray-50">
                            {report.businessList.map((business) => (
                              <div
                                key={report.consultantId + "-" + business.nit}
                                className="grid grid-cols-5 gap-1 items-center justify-center text-center text-gray-700 py-2 border-b border-principal-450/20"
                              >
                                <div className="col-span-2">
                                  {business.name}
                                </div>
                                <div>{business.nit}</div>
                                <div>{business.city}</div>
                                <div>{business.department}</div>
                              </div>
                            ))}
                          </div>
                        )}
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

"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { BusinessHoursReportList } from "domain/models/Appointment/reportsTypes";
import { S3FileId } from "domain/models/tech-assistance-cert/techAssistanceForm";
import GetBusinessHoursReportUseCase from "domain/usecases/Appointment/getBusinessHoursReport.use.case";
import GetMilestonesReportUseCase from "domain/usecases/MonthlyReport/GetMilestonesReport.usecase";
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

export const BusinessMilestonesTemplate = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [reports, setReports] = useState<BusinessHoursReportList>();
  const [milestonesInformation, setMilestonesInformation] =
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
    const getReportList = appContainer.get<GetMilestonesReportUseCase>(
      USECASES_TYPES._GetMilestonesReportUseCase
    );
    const response = await getReportList.execute(query, session?.access_token!);
    if (response === undefined) {
      console.log("No milestones found!");
      return;
    }
    console.log(response);

    let milestones = response;

    // Format information for table
    let milestoneRowsFinal;
    let index = 1;
    for (const portion of milestones) {
      //console.log("portion", portion);
      let milestoneRowInfo;
      let businessRow;
      for (const milestoneList of portion.milestones) {
        //console.log("milestoneList", milestoneList);
        for (const milestone of milestoneList) {
          if (!milestoneRowInfo) {
            milestoneRowInfo = [
              [milestone.description, milestone.percentageOfProgress],
            ];
          } else {
            let found = false;
            for (const milestoneRow of milestoneRowInfo) {
              if (milestoneRow[0] == milestone.description) {
                milestoneRow.push(milestone.percentageOfProgress);
                found = true;
              }
            }
            if (!found) {
              milestoneRowInfo = [
                ...milestoneRowInfo,
                [milestone.description, milestone.percentageOfProgress],
              ];
            }
          }
        }
      }
      if (milestoneRowInfo && milestoneRowInfo.length >= 1) {
        let milestoneRowsTmp = [
          {
            rowSpan: milestoneRowInfo ? milestoneRowInfo.length : 1,
            text: "" + index++,
          },
          {
            rowSpan: milestoneRowInfo ? milestoneRowInfo?.length : 1,
            text: portion.businessName,
          },
          ...milestoneRowInfo[0],
        ];
        let leftMilestones = milestoneRowInfo.slice(1, milestoneRowInfo.length);
        milestoneRowsFinal = [
          ...(milestoneRowsFinal ?? []),
          milestoneRowsTmp,
          ...leftMilestones,
        ];
      }

      //milestoneRowsFinal = [...(milestoneRowsFinal ?? []), businessRow ?? []];
    }

    console.log(milestoneRowsFinal);

    // End Format information for table

    if (milestoneRowsFinal && milestoneRowsFinal.length >= 1) {
      setMilestonesInformation(milestoneRowsFinal);
    }
  };

  useEffect(() => {
    getBusinessIndicatorsList();
  }, []);

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Reporte de hitos por empresa" />
      <SectionSeparator className="mt-4" />

      <div className="w-full md:w-11/12 mb-10 text-xs">
        {/*<div className="block text-center">*/}
        {/**border-2 border-dotted border-[#000] */}

        <table className="table-auto w-full text-align-center">
          <thead>
            <tr className="border-t-gray-700 text-gray-500">
              <th>No.</th>
              <th>Empresa</th>
              <th>Hito</th>
              <th>Mes 1</th>
              <th>Mes 2</th>
              <th>Mes 3</th>
              <th>Mes 4</th>
              <th>Mes 5</th>
              <th>Mes 6</th>
            </tr>
          </thead>
          <tbody>
            {milestonesInformation ? (
              milestonesInformation.map((milestoneBusinessReport, idx) => {
                let rowSpan = 1;
                let partial = false;
                //console.log(milestoneBusinessReport);
                if (
                  Array.isArray(milestoneBusinessReport) &&
                  !isString(milestoneBusinessReport[0]) &&
                  "rowSpan" in milestoneBusinessReport[0]
                ) {
                  console.log("!partial", milestoneBusinessReport);
                  rowSpan = milestoneBusinessReport[0].rowSpan;
                } else {
                  partial = true;
                  console.log("partial", milestoneBusinessReport);
                }
                return (
                  <tr
                    className="border-t-2 border-gray-300"
                    key={"table_row_" + idx}
                  >
                    {!partial && (
                      <td scope="col" rowSpan={rowSpan} className="px-6 py-3">
                        {Array.isArray(milestoneBusinessReport) &&
                          milestoneBusinessReport[0].text}
                      </td>
                    )}
                    {!partial && (
                      <td scope="col" rowSpan={rowSpan} className="px-6 py-3">
                        {Array.isArray(milestoneBusinessReport) &&
                          milestoneBusinessReport[1].text}
                      </td>
                    )}

                    {!partial &&
                      Array.isArray(milestoneBusinessReport) &&
                      milestoneBusinessReport.map((value, index) => {
                        if (index >= 2) {
                          return (
                            <td
                              key={"milestone-id-" + index}
                              scope="col"
                              className="px-6 py-3"
                            >
                              {value}
                            </td>
                          );
                        }
                      })}

                    {partial &&
                      Array.isArray(milestoneBusinessReport) &&
                      milestoneBusinessReport.map((value, index) => {
                        return (
                          <td
                            key={"milestone-id-" + index}
                            scope="col"
                            className="px-6 py-3"
                          >
                            {value}
                          </td>
                        );
                      })}
                  </tr>
                );
              })
            ) : (
              <div></div>
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

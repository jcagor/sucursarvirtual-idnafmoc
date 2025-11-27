"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import {
  MonthlyReportResponseList,
  QueryMonthlyReportAdmin,
} from "domain/models/MonthlyReport/MonthlyReportType";
import { TechAssistanceRecordRevisionList } from "domain/models/tech-assistance-cert/techAssistanceForm";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import ListAnalystTechReportsUseCase from "domain/usecases/techAssistanceRegister/listAnalystTechAssistanceRecords";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import {
  APPOINTMENT_ATTENDANCE_STATUS,
  APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE,
  FORM_DB_SELECT_OPTIONS,
  MPAC_USER_ROLE,
  SelectOption,
  TECH_REVISION_STATUS,
  TECH_REVISION_STATUS_TRANSLATE,
} from "lib";
import { translateAttendanceStatus, translateTechRegisterStatus } from "lib/helpers/uiUtils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  CustomSelectRole,
  RolSelectSection,
  SectionSeparator,
  useAppSelector,
} from "presentation";
import { useEffect, useState } from "react";
import { IUserToken } from "types";

export const SupportRegisterAnalystTemplate = () => {
  interface ReportEntry {
    id: string;
    date: Date;
  }

  interface ReportEntryList extends Array<ReportEntry> {}

  const { data: session } = useSession();
  const [reports, setReports] = useState<TechAssistanceRecordRevisionList>();

  /* USER ROLE */
  const [business, setBusiness] = useState<SelectOption>();
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userIsAnalyst, setUserIsAnalyst] = useState(false);

  const selectedBusiness = useAppSelector(
    (state) => state.selectedBusiness
  );
  const userRole = useAppSelector((state) => state.userRole);

  const getUserInfo = () => {
    let SessionToken = session?.access_token;

    if (SessionToken) {
      let userInfo: IUserToken = jwtDecode(SessionToken);
      //console.log(userInfo);
      return userInfo;
    }
    return;
  };
  /* USER ROLE */

  // Business List Query
  const [businessList, setBusinessList] = useState<Array<SelectOption>>();

  const getAnalystInformation = async () => {
    const getOptionsList = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const response = await getOptionsList.execute(
      FORM_DB_SELECT_OPTIONS.BUSINESS_LIST_ANALYST,
      session?.access_token
    );
    if (response && response.length) {
      setBusinessList(response);
      if (!selectedBusiness && response.length >= 1) {
        setBusiness(response[0]);
      }
    }
  };

  useEffect(() => {
    getAnalystInformation();
  }, []);

  useEffect(() => {
    if (business) {
      getReportsList(business);
    }
  }, [business]);
  // Business List Query

  useEffect(() => {
    if (userRole && userRole == MPAC_USER_ROLE.admin) {
      if (selectedBusiness) {
        console.log("Store selected", selectedBusiness);
        setBusiness(selectedBusiness);
        getReportsList(selectedBusiness);
      }
      setUserIsAdmin(true);
    }
    if (userRole && userRole == MPAC_USER_ROLE.analista) {
      setUserIsAnalyst(true);
    }
  }, [selectedBusiness, userRole]);

  const getReportsList = async (selectedBusiness: SelectOption) => {
    const query: QueryMonthlyReportAdmin = {
      businessId: selectedBusiness.shorthand ?? "",
    };
    const getReportList = appContainer.get<ListAnalystTechReportsUseCase>(
      USECASES_TYPES._ListAnalystTechReportsUseCase
    );
    const response = await getReportList.execute(query, session?.access_token);
    if (response === undefined) {
      return;
    }
    console.log(response);
    setReports(response);
  };

  return (
    <div className="w-full md:w-11/12">
      {(userIsAdmin || userIsAnalyst) && (
        <div
          className={`flex w-full justify-end min-h-15 text-center text-wrap rounded-lg p-3 mr-5`}
        >
          <div className="flex w-[350px]">
            <CustomSelectRole
              label={
                (getUserInfo() ? getUserInfo()?.given_name : "Usuario") +
                `, actualmente estás en: `
              }
              options={businessList ?? []}
              selectedValue={business}
              onChangeValue={(selected: SelectOption) => {
                getReportsList(selected);
              }}
            />
          </div>
        </div>
      )}
      <MainTitle text="Reportes por empresa" />
      <SectionSeparator className="mt-4" />

      <div className="w-full md:w-11/12 mb-10 text-xs">
        <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-1 px-8">
          <div className="w-full grid grid-cols-6 gap-2 items-center justify-center text-center text-principal-350 font-bold rounded-t-lg py-2 border-b-[2px] border-principal-450/20">
            <div>Item N°</div>
            <div>Fecha de cita</div>
            <div>Estado cita</div>
            <div>Fecha del acta</div>
            <div>Estado acta</div>
            <div>Revisar</div>
          </div>
          <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full rounded-b-lg">
            {reports &&
              reports.map((report, index) => (
                <div
                  key={report.tech_record_id}
                  className="w-full grid grid-cols-6 gap-2 items-center justify-center text-center text-principal-450 py-2"
                >
                  <div>{`#${index + 1}`}</div>
                  <div>
                    {new Date(report.appointment_date).toLocaleDateString()}
                  </div>
                  <div>
                    {translateAttendanceStatus(report.appointment_attendance)}
                  </div>
                  <div>
                    {new Date(
                      report.tech_assistance_created_at
                    ).toLocaleDateString()}
                  </div>
                  <div>
                    <span>{translateTechRegisterStatus(report.tech_revision_status)}</span>
                  </div>
                  <div>
                    <Link
                      href={`/analyst/revision?id=${report.tech_record_id}`}
                      className="font-medium text-principal-150 hover:underline"
                    >
                      <button
                        onClick={(e) => {}}
                        onKeyUp={() => {}}
                        className="success m-3 rounded-lg bg-principal-700 h-6 text-principal-150 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        <span className="flex">
                          Revisar {/*<IoMdOpen className="mx-2 h-5" />*/}
                        </span>
                      </button>
                    </Link>
                  </div>                  
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { MonthlyReportResponseList, QueryMonthlyReportAdmin } from "domain/models/MonthlyReport/MonthlyReportType";
import ListAdminMonthlyReportUseCase from "domain/usecases/MonthlyReport/listAdminMonthlyReport.use.case";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import { getAdminBusinessList, MPAC_USER_ROLE, SelectOption } from "lib";
import { useSession } from "next-auth/react";
import {
  RolSelectSection,
  SectionSeparator,
  useAppSelector,
} from "presentation";
import { useEffect, useState } from "react";
import { IUserToken } from "types";

export const ReportListTemplateAdmin = () => {
  interface ReportEntry {
    id: string;
    date: Date;
  }

  interface ReportEntryList extends Array<ReportEntry> {}

  const { data: session } = useSession();
  const [reports, setReports] = useState<MonthlyReportResponseList>();

  /* USER ROLE */
  const [business, setBusiness] = useState<SelectOption>();
  const [userIsAdmin, setUserIsAdmin] = useState(false);

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

  const getAdminInformation = async () => {
    const response = await getAdminBusinessList(session?.access_token ?? "");
    console.log(response);
    if (response && response.business.BUSINESS_SELECT?.length) {
      setBusinessList(response.business.BUSINESS_SELECT);
    }
  };

  useEffect(() => {
    getAdminInformation();
  }, []);
  // Business List Query

  useEffect(() => {
    if (userRole && userRole == MPAC_USER_ROLE.admin) {
      if (selectedBusiness) {
        console.log("Store selected", selectedBusiness);
        setBusiness(selectedBusiness);
        getReportsList(selectedBusiness)
      }
      setUserIsAdmin(true);
    }
  }, [selectedBusiness, userRole]);

  
  const getReportsList = async (selectedBusiness:SelectOption) => {   

    const query: QueryMonthlyReportAdmin = {
        businessId: selectedBusiness.shorthand ?? "",
    }
    const getReportList =
      appContainer.get<ListAdminMonthlyReportUseCase>(
        USECASES_TYPES._ListAdminMonthlyReportUseCase
      );
    const response = await getReportList.execute(
      query,
      session?.access_token
    );
    if (response === undefined) {
      return;
    }
    setReports(response);
  };
  

  return (
    <div className="w-full md:w-11/12">
      {userIsAdmin && (
        <RolSelectSection
          options={businessList ?? []}
          userName={getUserInfo() ? getUserInfo()?.given_name : "Usuario"}
          selectedValue={business}
        />
      )}
      <MainTitle text="Reportes por empresa" />
      <SectionSeparator className="mt-4" />

      <div className="w-full md:w-11/12 mb-10 text-xs">
        <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-1 px-8">
          <div className="w-full grid grid-cols-3 gap-2 items-center justify-center text-center text-principal-350 font-bold rounded-t-lg py-2 border-b-[2px] border-principal-450/20">
            <div>Item N°</div>
            <div>Fecha</div>
            <div>Revisar</div>
          </div>
          <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full rounded-b-lg">
            {reports &&
              reports.map((report, index) => (
                <div
                  key={report.id}
                  className="w-full grid grid-cols-3 gap-2 items-center justify-center text-center text-principal-450 py-2"
                >
                  <div>{`#${index + 1}`}</div>
                  <div>{new Date(report.createdAt).toLocaleDateString()}</div>
                  <div>Ver</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

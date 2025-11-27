"use client";

import GetSummaryReportFileUseCase from "domain/usecases/MonthlyReport/userGetResumeFile.usecase";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import {
  getAdminBusinessList,
  HomeMenuCards,
  MPAC_USER_ROLE,
  ReviewReportsCards,
  SelectOption,
} from "lib";
import { useSession } from "next-auth/react";
import {
  ActionMenuCard,
  RolSelectSection,
} from "presentation/components/molecules";
import { useAppSelector } from "presentation/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserToken } from "types";
import { array } from "yup";

export const HomeReviewReports = () => {
  const session = useSession();

  /* USER ROLE */
  const [business, setBusiness] = useState<SelectOption>();
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const selectedBusiness = useAppSelector(
    (state) => state.selectedBusiness
  );
  const userRole = useAppSelector((state) => state.userRole);

  const getUserInfo = () => {
    let SessionToken = session.data?.access_token;

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
  const buttonDownload = useRef<HTMLAnchorElement>(null);

  const getAdminInformation = async () => {
    const response = await getAdminBusinessList(
      session.data?.access_token ?? ""
    );
    console.log(response);
    if (response && response.business.BUSINESS_SELECT?.length) {
      setBusinessList(response.business.BUSINESS_SELECT);
    }
  };

  const downloadReport = async () => {
    try {
      let token = session.data?.access_token;

      const reportFileCase = appContainer.get<GetSummaryReportFileUseCase>(
        USECASES_TYPES._GetSummaryReportFileUseCase
      );

      if (token) {
        const response = await reportFileCase.execute({}, token);
        if (!response) {
          return;
        } else if (buttonDownload.current) {
          buttonDownload.current.href = URL.createObjectURL(response);
          buttonDownload.current.download = `Reporte_Recopilatorio_${new Date()
            .toJSON()
            .slice(0, 10)}.pdf`;
          buttonDownload.current?.click();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminInformation();
  }, []);
  // Business List Query

  useEffect(() => {
    if (userRole && userRole == MPAC_USER_ROLE.admin) {
      if (selectedBusiness) {
        //console.log("Store selected", selectedBusiness);
        setBusiness(selectedBusiness);
      }
      setUserIsAdmin(true);
    }
  }, [selectedBusiness, userRole]);

  return (
    <div className="block w-full h-full scroll-y-auto scroll-x-hidden">
      {userIsAdmin && (
        <RolSelectSection
          options={businessList ?? []}
          userName={getUserInfo() ? getUserInfo()?.given_name : "Usuario"}
          selectedValue={business}
        />
      )}

      <div>
        <p> ¿En qué podemos ayudarte hoy? </p>
        <div className="w-9/12 flex flex-wrap gap-4 mt-10">
          {ReviewReportsCards.map((card) => {
            return card.canAccess.includes(userRole) ? (
              <ActionMenuCard
                imageUrl={card.image}
                text={card.text}
                url={card.url}
              />
            ) : (
              <></>
            );
          })}
        </div>
        <div className="my-5">
          <p> Descargas </p>
          <div className="w-9/12 flex flex-wrap gap-4 mt-10">
            <a ref={buttonDownload} ></a>
            <a onClick={()=>{downloadReport()}}>
            <ActionMenuCard
              imageUrl="/lalande/icons/pdf_icon.svg"
              text="Informe consolidado mensual"
              url="#"              
            />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

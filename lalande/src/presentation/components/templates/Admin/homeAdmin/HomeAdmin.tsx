"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { jwtDecode } from "jwt-decode";
import { getAdminBusinessList, MPAC_USER_ROLE, SelectOption } from "lib";
import { useSession } from "next-auth/react";
import { ActionMenuCard, RolSelectSection, useAppSelector } from "presentation";
import { useEffect, useState } from "react";
import { IUserToken } from "types";

export const HomeAdmin = () => {
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

  const getAdminInformation = async () => {
    const response = await getAdminBusinessList(
      session.data?.access_token??""
    );
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
      }
      setUserIsAdmin(true);
    }
  }, [selectedBusiness, userRole]);

  return (
    <div className="flex flex-col gap-4 w-full h-full pr-6">
      {userIsAdmin && (
        <RolSelectSection
          options={businessList ?? []}
          userName={getUserInfo() ? getUserInfo()?.given_name : "Usuario"}
          selectedValue={business}
        />
      )}
      <MainTitle text="Ruta de" />
      <MainTitle text="Proceso MiPyme" />
      <p> ¿En qué podemos ayudarte hoy? </p>
      <div className="w-9/12 flex flex-wrap gap-4 mt-10">
        <ActionMenuCard
          imageUrl="/lalande/icons/assignment-dates.png"
          text="Cronogramas por empresa"
          url="/admin/schedule"
        />
        <ActionMenuCard
          imageUrl="/lalande/icons/certifications-icon.png"
          text="Informes"
          url="/admin/reports"
        />
      </div>
    </div>
  );
};

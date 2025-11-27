"use client";

import { jwtDecode } from "jwt-decode";
import {
  getAdminBusinessList,
  HomeMenuCards,
  MPAC_USER_ROLE,
  SelectOption,
} from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ActionMenuCard,
  RolSelectSection,
} from "presentation/components/molecules";
import { useAppSelector } from "presentation/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserToken } from "types";
import { array } from "yup";

export const HomeTemplate = () => {
  const session = useSession();
  const router = useRouter();

  /* USER ROLE */
  const [business, setBusiness] = useState<SelectOption>();
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const selectedBusiness = useAppSelector((state) => state.selectedBusiness);
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

  switch (userRole) {
    case MPAC_USER_ROLE.admin:
      if (!selectedBusiness) {
        router.push("/adminHome");
      }
      break;

    case MPAC_USER_ROLE.consultor:
    case MPAC_USER_ROLE.analista:
    case MPAC_USER_ROLE.administrador_activos:
    case MPAC_USER_ROLE.administrador_general:
      break;

    default:
      console.log("invalid role for user:", userRole);
  }

  /* USER ROLE */

  // Business List Query
  const [businessList, setBusinessList] = useState<Array<SelectOption>>();

  const getAdminInformation = async () => {
    const response = await getAdminBusinessList(
      session.data?.access_token ?? ""
    );
    //console.log(response);
    if (response && response.business.BUSINESS_SELECT?.length) {
      setBusinessList(response.business.BUSINESS_SELECT);
    }
  };

  useEffect(() => {
    //console.log("TOKEN:", session.data?.access_token ?? "")
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
          {HomeMenuCards.map((card, index) => {
            return card.canAccess.includes(userRole) ? (
              <div key={"home-menu-card" + index}>
                <ActionMenuCard
                  imageUrl={card.image}
                  text={card.text}
                  url={card.url}
                />
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

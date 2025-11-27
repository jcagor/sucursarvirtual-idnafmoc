"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import getAdminInformationUseCase from "domain/usecases/User/UserInformation.use.case";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import { getAdminBusinessList, MPAC_USER_ROLE, SelectOption } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  CustomSelectRole,
  MainTitle,
  SectionSeparator,
} from "presentation/components/atoms";
import { RolSelectSection } from "presentation/components/molecules";
import { useAppDispatch } from "presentation/store";
import {
  setMpacUserBusiness,
  setMpacUserRole,
} from "presentation/store/mpacUserStatus/mpacUserStatusSlice";
import { useEffect, useState } from "react";
import { IUserToken } from "types";

export const AdminHomeTemplate = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const session = useSession();

  const setSessionInfo = (selectBusiness: SelectOption) => {
    dispatch(setMpacUserRole(MPAC_USER_ROLE.admin));
    dispatch(setMpacUserBusiness(selectBusiness));

    router.push("/");
  };

  const setSessionInfoConsultant = (selectBusiness: SelectOption) => {
    dispatch(setMpacUserRole(MPAC_USER_ROLE.consultor));
    //dispatch(setMpacUserBusiness(selectBusiness));

    router.push("/");
  };

  const setSessionInfoAnalyst = (selectBusiness: SelectOption) => {
    dispatch(setMpacUserRole(MPAC_USER_ROLE.analista));
    //dispatch(setMpacUserBusiness(selectBusiness));

    router.push("/");
  };

  const getUserSessionInfo = () => {
    let SessionToken = session.data?.access_token;

    if (SessionToken) {
      let userInfo: IUserToken = jwtDecode(SessionToken);
      //console.log(userInfo);
      return userInfo;
    }
    return;
  };

  // Business List Query
  const [businessList, setBusinessList] = useState<Array<SelectOption>>();

  const getAdminInformation = async () => {
    const response = await getAdminBusinessList(
      session.data?.access_token ?? ""
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

  return (
    <div className="block w-full h-full scroll-y-hidden scroll-x-hidden">
      <div className="flex scroll-y-hidden">
        {/*<!-- Primera columna -->*/}
        <div className="col-md-4 column w-[440px] min-w-[440px]">
          <img
            alt="logo"
            src="/lalande/img/lateral.png"
            className="h-full pl-0"
          />
        </div>

        {/*<!-- Segunda columna -->*/}
        <div className="col-md-6 column p-10 place-items-center flex scroll-y-auto">
          <div className="">
            <MainTitle text="Hola, Bienvenido a la Sucursal de" />
            <MainTitle text="Gestión MiPyme" />
            <SectionSeparator className="mt-4" />

            <div className="my-10">
              <TertiaryTitle text="Antes de comenzar, selecciona la cuenta que deseas gestionar." />
            </div>

            <div className="rounded-lg shadow-md bg-[#FFF] h-15 px-10 w-11/12 xl:w-[874px]">
              <div className=" flex py-5">
                <div>
                  <span className="text-principal-180 text-[1.5em]">
                    Selecciona la cuenta que quieres gestionar
                  </span>
                </div>
                <div className="mx-10">
                  <div className="flex w-[350px]">
                    <CustomSelectRole
                      label=""
                      options={businessList ?? []}
                      simple
                      onChangeValue={(selected: SelectOption) => {
                        setSessionInfo(selected);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*
            <div className="py-5">
              <Button
                onClick={setSessionInfoConsultant}
                onKeyUp={() => {}}
                label="Ver UI consultor"
              >
                <span>Vista Consultor</span>
              </Button>
            </div>
            <div className="py-5">
              <Button
                onClick={setSessionInfoAnalyst}
                onKeyUp={() => {}}
                label="Ver UI Analista"
              >
                <span> Vista Analista</span>
              </Button>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

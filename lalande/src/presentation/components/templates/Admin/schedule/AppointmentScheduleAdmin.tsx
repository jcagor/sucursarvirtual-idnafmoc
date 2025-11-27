"use client";

import { MainTitle, TertiaryTitle } from "@comfanditd/chronux-ui";
import { AppointmentType } from "domain/models/Appointment/AppointmentType";
import { AdminRangeDateType } from "domain/models/Appointment/rangeDateType";
import GetAppointmentAdminUseCase from "domain/usecases/Appointment/getAppointmentAdmin.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import {
  dateInUTC,
  getAdminBusinessList,
  MPAC_USER_ROLE,
  SelectOption,
} from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  AppointmentsTableAdmin,
  CardManageSection,
  RolSelectSection,
  SectionSeparator,
  useAppSelector,
  WeekPicker,
  WeekPlanner,
} from "presentation";
import { useEffect, useState } from "react";
import { IUserToken } from "types";
import { MdCleaningServices } from "react-icons/md";
import { toast } from "react-toastify";

export const AppointmentScheduleAdmin = () => {
  const MAX_NUMBER_BUSINESS_FILTER = 10;

  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<[Date, Date]>();
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);

  /* USER ROLE */
  const [businessOrg, setBusinessOrg] = useState<SelectOption | undefined>(
    undefined
  );
  const [business, setBusiness] = useState<SelectOption>();
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const selectedBusiness = useAppSelector((state) => state.selectedBusiness);
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

  /* Multi Select Business */
  const [businessMultiList, setBusinessMultiList] = useState(false);
  const [businessFilteredList, setBusinessFilteredList] = useState<
    Array<SelectOption>
  >([]);
  const [businessSelectedList, setBusinessSelectedList] = useState<
    Array<SelectOption>
  >([]);
  const [businessListComplete, setBusinessListComplete] =
    useState<Array<SelectOption>>();

  const getAdminInformation = async () => {
    const response = await getAdminBusinessList(session?.access_token ?? "");
    //console.log(response);
    if (response && response.business.BUSINESS_SELECT?.length) {
      setBusinessList(response.business.BUSINESS_SELECT);
      setBusinessListComplete(response.business.BUSINESS_SELECT);
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
        if (selectedWeek) {
          getAppointments();
        }
      }
      setUserIsAdmin(true);
    }
  }, [selectedBusiness, userRole]);

  useEffect(() => {
    if (selectedWeek) {
      getAppointments();
    }
  }, [selectedWeek]);

  const getSelectedBusinessList = (): Array<string> => {
    let filtered: Array<string> = [];
    const businessList = businessSelectedList.map((bss) => bss.shorthand);
    if (businessList.length) {
      for (const val of businessList) {
        if (val && typeof val == "string" && val != "") {
          filtered.push(val);
        }
      }
    }
    return filtered;
  };

  const getAppointments = async () => {
    if (!selectedWeek) return;

    const rangeDate: AdminRangeDateType = {
      startDate: dateInUTC(selectedWeek[0]),
      endDate: dateInUTC(
        new Date(selectedWeek[1].getTime() + 24 * 60 * 60 * 1000)
      ),
      businessId: selectedBusiness?.shorthand ?? "",
      multiBusiness: businessMultiList ? getSelectedBusinessList() : undefined,
    };

    const getAppointmentByBusiness =
      appContainer.get<GetAppointmentAdminUseCase>(
        USECASES_TYPES._GetAppointmentAdminUseCase
      );
    const response = await getAppointmentByBusiness.execute(
      rangeDate,
      session?.access_token
    );
    if (response === undefined) {
      return;
    }
    setAppointments(response);
  };

  const clickPlusIconListener = () => {
    //console.log("Plus click!");
    //console.log("Selected", selectedBusiness);

    if (selectedBusiness) {
      //console.log("filter start");
      setBusinessMultiList(true);

      const added = businessSelectedList.find(
        (reg) => reg.shorthand == selectedBusiness.shorthand
      );

      if (businessSelectedList.length >= MAX_NUMBER_BUSINESS_FILTER) {
        toast.error("Se alcanzo el numero máximo de empresas seleccionadas");
        return;
      } else if (!added) {
        const newArr = [...businessSelectedList, selectedBusiness];
        setBusinessSelectedList(newArr);
      } else {
        toast.warn("La empresa ya esta seleccionada en el filtro.");
        return;
      }

      if (!businessOrg) {
        setBusinessOrg(selectedBusiness);
      }

      const filteredList = businessListComplete?.filter((business) => {
        for (const selected of businessSelectedList) {
          if (
            business.shorthand == selected.shorthand ||
            selectedBusiness.shorthand == business.shorthand
          ) {
            return false;
          }
        }
        return true;
      });
      setBusiness(undefined);
      setBusinessList(filteredList);
    }
  };

  const removeCard = (cardId: string) => {
    const filteredSelectedList = businessSelectedList?.filter((business) => {
      for (const selected of businessSelectedList) {
        if (business.shorthand == cardId) {
          return false;
        }
      }
      return true;
    });

    const filteredList = businessListComplete?.filter((business) => {
      if (business.shorthand == cardId) {
        return true;
      }
      for (const selected of businessSelectedList) {
        if (business.shorthand == selected.shorthand) {
          return false;
        }
      }
      return true;
    });
    setBusinessSelectedList(filteredSelectedList);
    setBusinessList(filteredList);
  };

  const resetFilters = () => {
    //console.log("reset");
    setBusinessMultiList(false);

    setBusinessList(businessListComplete);
    setBusinessSelectedList([]);
    if (businessOrg) {
      setBusiness(businessOrg);
    }
  };

  //useEffect(() => {
  //  console.log("MultiList: ", businessMultiList);
  //  console.log("Filtered: ", businessFilteredList);
  //}, [businessFilteredList, businessMultiList]);

  useEffect(() => {
    //console.log("Selected: ", businessSelectedList);
    //if (businessSelectedList.length && businessMultiList) {
    getAppointments();
    //}
  }, [businessSelectedList]);

  return (
    <div className="w-full flex flex-col md:w-11/12 gap-4">
      {userIsAdmin && (
        <div className="flex">
          <RolSelectSection
            options={businessList ?? []}
            userName={getUserInfo() ? getUserInfo()?.given_name : "Usuario"}
            selectedValue={business}
          />
          <div className="mt-10">
            <Image
              onClick={() => {
                clickPlusIconListener();
              }}
              alt="Agregar"
              src="/lalande/icons/plus-icon.webp"
              width={50}
              height={50}
            />
          </div>
        </div>
      )}

      {businessMultiList && (
        <>
          <div>
            <span>
              Filtro por multiples empresas: {businessSelectedList.length}{" "}
              seleccionadas, de {MAX_NUMBER_BUSINESS_FILTER}
            </span>
          </div>
          <CardManageSection className="bg-principal-150">
            {businessSelectedList.map((card, index, array) => {
              return (
                <div
                  className="flex p-2 min-w-[120px] md:ml-8 mx-auto bg-principal-180 text-principal-150 rounded-lg font-bold"
                  key={"business-card-" + index}
                >
                  <span>{`${card.label}`}</span>
                  <div
                    className="block ml-1"
                    onClick={() => {
                      removeCard(card.shorthand ?? "");
                    }}
                    onKeyUp={() => {}}
                  >
                    <Image
                      src="/lalande/icons/fail.webp"
                      alt="remove"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              );
            })}
          </CardManageSection>
          <div className="flex w-full justify-end mr-5">
            <button
              onClick={(e) => {
                resetFilters();
              }}
              onKeyUp={() => {}}
              className="success m-1 rounded-lg bg-principal-500 text-principal-150 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <span className="flex">
                Borrar selección <MdCleaningServices className="mx-2 h-5" />
              </span>
            </button>
          </div>
        </>
      )}

      <MainTitle text="Cronograma por empresa" />
      <SectionSeparator />
      <div className="flex justify-between">
        <TertiaryTitle text="Calendario de asistencias" />
        <WeekPicker className="w-72" onChange={setSelectedWeek} />
      </div>
      {selectedWeek && (
        <WeekPlanner
          selectedWeek={selectedWeek}
          appointments={appointments}
          setSelectedHour={setSelectedHour}
        />
      )}

      <div>
        <div className="">
          <TertiaryTitle text="Listado de citas" />
          <AppointmentsTableAdmin appointments={appointments} disabled={true} />
        </div>
      </div>

      {/* DISABLE APPOINTMENT CREATION FOR ADMIN */}
      {/*selectedHour && (
        <Modal onClose={() => setSelectedHour(null)} className="px-10 py-8">
          <FormAppointment
            selectDate={selectedHour}
            onClose={() => {
              getAppointments();
              setSelectedHour(null);              
            }}
            onCancel={()=>{
              setSelectedHour(null);
            }}
          />
        </Modal>
      )*/}
    </div>
  );
};

const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClose, children, className }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-principal-50 bg-opacity-50 `}
      onClick={onClose}
      onKeyDown={(e) => {}}
    >
      <div
        className={`bg-principal-150 p-6 rounded-lg shadow-lg w-[50vw] ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {}}
      >
        {children}
      </div>
    </div>
  );
};

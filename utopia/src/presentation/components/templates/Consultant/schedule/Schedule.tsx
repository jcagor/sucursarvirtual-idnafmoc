"use client";

import { MainTitle, TertiaryTitle } from "@comfanditd/chronux-ui";
import { AppointmentType, RangeDateType } from "domain/models";
import GetAppointmentByBusinessUseCase from "domain/usecases/Appointment/getAppointmentByBusiness.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { dateInUTC } from "lib";
import { useSession } from "next-auth/react";
import {
  AppointmentsTable,
  FormAppointment,
  SectionSeparator,
  WeekPicker,
  WeekPlanner,
} from "presentation";
import { useEffect, useState } from "react";

export const Schedule = () => {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<[Date, Date]>();
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);

  useEffect(() => {
    if (selectedWeek) {
      getAppointments();
    }
  }, [selectedWeek]);

  const getAppointments = async () => {
    if (!selectedWeek) return;

    const rangeDate: RangeDateType = {
      startDate: dateInUTC(selectedWeek[0]),
      endDate: dateInUTC(
        new Date(selectedWeek[1].getTime() + 24 * 60 * 60 * 1000)
      ),
    };

    const getAppointmentByBusiness =
      appContainer.get<GetAppointmentByBusinessUseCase>(
        USECASES_TYPES._GetAppointmentsByBusiness
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

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Cronograma por empresa" />
      <SectionSeparator className="mt-4" />
      <div className="flex justify-between py-4">
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
      <AppointmentsTable appointments={appointments} />
      {selectedHour && (
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
      )}
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

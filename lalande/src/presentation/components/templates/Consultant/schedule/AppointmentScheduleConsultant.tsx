"use client";

import { MainTitle, TertiaryTitle } from "@comfanditd/chronux-ui";
import { AppointmentType } from "domain/models/Appointment/AppointmentType";
import { RangeDateType } from "domain/models/Appointment/rangeDateType";
import { TechAssistanceCorrectionList } from "domain/models/tech-assistance-cert/techAssistanceForm";
import GetAppointmentByBusinessUseCase from "domain/usecases/Appointment/getAppointmentByBusiness.use.case";
import ListRejectedTechAssistanceRecordsUseCase from "domain/usecases/techAssistanceRegister/listRejectedTechAssistanceRecords";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { dateInUTC } from "lib";
import { useSession } from "next-auth/react";
import {
  AppointmentsTable,
  FormAppointment,
  FormAppointmentReschedule,
  SectionSeparator,
  WeekPicker,
  WeekPlanner,
} from "presentation";
import { AppointmentsRejectedTable } from "presentation/components/organisms/Consultant/schedule/AppointmentsRejectedTable";
import { useEffect, useState } from "react";

export const AppointmentScheduleConsultant = () => {
  const { data: session } = useSession();
  const [appointmentReschedule, setAppointmentReschedule] = useState<
    AppointmentType | undefined
  >(undefined);

  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [rejectedTechRegisters, setRejectedTechRegisters] =
    useState<TechAssistanceCorrectionList>();

  const [selectedWeek, setSelectedWeek] = useState<[Date, Date]>();
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);

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

  const getRejectedTechSupportRegList = async () => {
    const getAppointmentByBusiness =
      appContainer.get<ListRejectedTechAssistanceRecordsUseCase>(
        USECASES_TYPES._ListRejectedTechAssistanceRecordsUseCase
      );
    const response = await getAppointmentByBusiness.execute(
      {},
      session?.access_token
    );
    if (response === undefined) {
      return;
    }
    setRejectedTechRegisters(response);
  };

  useEffect(() => {
    if (selectedWeek) {
      getAppointments();
    }
  }, [selectedWeek]);

  useEffect(() => {
    getRejectedTechSupportRegList();
  }, []);

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Cronograma por empresa" />
      <SectionSeparator className="mt-4" />

      {Array.isArray(rejectedTechRegisters) &&
        rejectedTechRegisters.length >= 1 && (
          <div className="py-5">
            <TertiaryTitle text="Revisión Actas rechazadas" />
            <AppointmentsRejectedTable
              registers={rejectedTechRegisters ?? []}
            />
            <SectionSeparator className="mt-4" />
          </div>
        )}

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

      <div>
        <div className="">
          <TertiaryTitle text="Listado de citas" />
          <AppointmentsTable
            appointments={appointments}
            setAppointmentReschedule={setAppointmentReschedule}
          />
        </div>
      </div>

      {selectedHour && (
        <Modal onClose={() => setSelectedHour(null)} className="px-10 py-8">
          <FormAppointment
            selectDate={selectedHour}
            onClose={() => {
              getAppointments();
              setSelectedHour(null);
            }}
            onCancel={() => {
              setSelectedHour(null);
            }}
          />
        </Modal>
      )}

      {appointmentReschedule && (
        <Modal
          onClose={() => setAppointmentReschedule(undefined)}
          className="px-10 py-8"
        >
          <FormAppointmentReschedule
            appointment={appointmentReschedule}
            onClose={() => {
              setAppointmentReschedule(undefined);
              getAppointments();
            }}
            onCancel={() => {
              setAppointmentReschedule(undefined);
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
      className={`fixed inset-0 flex items-center justify-center bg-principal-50 bg-opacity-50 z-10`}
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

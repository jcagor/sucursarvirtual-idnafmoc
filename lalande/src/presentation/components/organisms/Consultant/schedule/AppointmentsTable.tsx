"use client";

import { AppointmentType } from "domain/models/Appointment/AppointmentType";
import {
  APPOINTMENT_ATTENDANCE,
  APPOINTMENT_ATTENDANCE_STATUS,
  dateUTCtoLocal,
} from "lib";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

const ITEMS_PER_PAGE = 5;

type AppointmentsTableProps = {
  appointments: AppointmentType[];
  setAppointmentReschedule: (appointment: AppointmentType) => void;
  disabled?: boolean;
};

export const AppointmentsTable: React.ForwardRefRenderFunction<
  HTMLInputElement,
  AppointmentsTableProps
> = ({ appointments, setAppointmentReschedule, disabled }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return appointments.slice(start, start + ITEMS_PER_PAGE);
  }, [appointments, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(appointments.length / ITEMS_PER_PAGE),
    [appointments]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [appointments]);

  return (
    <div className="flex flex-col w-full py-4 gap-3 text-sm">
      <div className="grid grid-cols-7 py-2 bg-principal-50 text-center rounded-lg font-bold">
        <div>Cédula</div>
        <div>Nombre y apellido</div>
        <div>Fecha de la sesión</div>
        <div>Hora</div>
        <div>Asistencia</div>
        <div>Acta</div>
        <div>Reasignar</div>
      </div>
      {paginatedAppointments.map((appointment) => (
        <AppointmentsRow
          key={appointment.id}
          appointment={appointment}
          setAppointmentReschedule={setAppointmentReschedule}
          disabledActions={disabled ?? false}
        />
      ))}
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="px-3 py-1 rounded-lg disabled:text-principal-450"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`px-2 py-1 rounded-lg ${
                  page === currentPage ? "font-bold" : "text-principal-450"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          className="px-3 py-1 rounded-lg disabled:text-principal-450"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export interface rowProps {
  appointment: AppointmentType;
  setAppointmentReschedule: (appointment: AppointmentType) => void;
  disabledActions: boolean;
}

const AppointmentsRow: React.FC<rowProps> = ({
  appointment,
  setAppointmentReschedule,
  disabledActions,
}) => {
  const router = useRouter();

  const attendanceInfo = APPOINTMENT_ATTENDANCE.find(
    (a) => a.attendace === appointment.attendance
  );

  const handleViewDetails = (id: string) => {
    router.push(`/Consultant/tech-assistence-record/register/${id}`);
  };

  return (
    <div className="grid grid-cols-7 items-center py-2 bg-principal-150 rounded-lg text-center border border-principal-50">
      <div>{appointment.document_number}</div>
      <div>{appointment.name}</div>
      <div>
        {new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(appointment.date))}
      </div>
      <div>
        {dateUTCtoLocal(new Date(appointment.date)).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
      <div className="flex flex-row items-center gap-2 justify-center">
        <div
          className={`flex flex-row items-center gap-2 px-3 py-2 rounded-xl`}
          style={{ backgroundColor: attendanceInfo?.bg_color || "" }}
        >
          <div
            className={`w-2 h-2 rounded-full`}
            style={{ backgroundColor: attendanceInfo?.text_color || "" }}
          ></div>
          <span style={{ color: attendanceInfo?.text_color || "" }}>
            {attendanceInfo?.text}
          </span>
        </div>
      </div>
      <div>
        {!disabledActions && (
          <button
            className="px-3 py-1 bg-principal-700 text-principal-150 rounded-lg disabled:bg-principal-450 disabled:text-principal-300"
            onClick={() => handleViewDetails(appointment.id)}
            disabled={
              appointment.attendance !== APPOINTMENT_ATTENDANCE_STATUS.Assigned
            }
          >
            Asignar acta
          </button>
        )}
      </div>
      <div>
        <button
          className="px-3 py-1 bg-principal-700 text-principal-150 rounded-lg disabled:bg-principal-450 disabled:text-principal-300"
          onClick={() => setAppointmentReschedule(appointment)}
          disabled={
            appointment.attendance !== APPOINTMENT_ATTENDANCE_STATUS.Assigned
          }
        >
          Reasignar
        </button>
      </div>
    </div>
  );
};

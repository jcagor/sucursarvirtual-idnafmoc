"use client";

import { AppointmentType } from "domain/models/Appointment/AppointmentType";
import {
  TechAssistanceCorrection,
  TechAssistanceCorrectionList,
} from "domain/models/tech-assistance-cert/techAssistanceForm";
import { translateTechRegisterStatus } from "lib/helpers/uiUtils";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

const ITEMS_PER_PAGE = 5;

type AppointmentsRejectedTableProps = {
  registers: TechAssistanceCorrectionList;
};

export const AppointmentsRejectedTable: React.ForwardRefRenderFunction<
  HTMLInputElement,
  AppointmentsRejectedTableProps
> = ({ registers }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return registers.slice(start, start + ITEMS_PER_PAGE);
  }, [registers, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(registers.length / ITEMS_PER_PAGE),
    [registers]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [registers]);

  return (
    <div className="flex flex-col w-full py-4 gap-3 text-sm">
      <div className="grid grid-cols-5 py-2 bg-principal-50 text-center rounded-lg font-bold">
        <div>Fecha creación</div>
        <div>Fecha de la cita</div>
        <div>Fecha de revisión</div>
        <div>Estado</div>
      </div>
      {paginatedAppointments.map((reg) => (
        <AppointmentsRow key={reg.appointment_id} register={reg} />
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

const AppointmentsRow = ({
  register,
}: {
  register: TechAssistanceCorrection;
}) => {
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/Consultant/tech-assistence-record/edit/${id}`);
  };

  return (
    <div className="grid grid-cols-5 py-2 bg-principal-150 rounded-lg text-center border border-principal-50">
      <div>{new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(register.appointment_created_at))}</div>
      <div>{new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(register.appointment_date))}</div>
      <div>
        {new Intl.DateTimeFormat("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        }).format(new Date(register.tech_revision_created_at??"now"))}
      </div>
      <div className="flex items-center gap-2 justify-center">
        {translateTechRegisterStatus(register.tech_revision_status)}
      </div>
      <div>
        <button
          className="px-3 py-1 bg-principal-700 text-principal-150 rounded-lg disabled:bg-principal-450 disabled:text-principal-300"
          onClick={() => handleViewDetails(register.tech_record_id??"now")}
        >
          Corregir Acta
        </button>
      </div>
    </div>
  );
};

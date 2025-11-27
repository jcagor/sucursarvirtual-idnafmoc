"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { EmployeeType, QueryDeleteCourseRegistration } from "domain/models";
import { PostulationType } from "domain/models/PostulationType";
import CreateCourseRegistrationUseCase from "domain/usecases/Business/createCourseRegistration.use.case";
import DeleteEmployeeCourseRegisterUseCase from "domain/usecases/worker-management/deleteEmployeeCourseRegister.use.case";
import GetRegisteredEmployeesByScheduleUseCase from "domain/usecases/worker-management/getRegisteredRegisteredBySchedule.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Button,
  ModalWithChildren,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";
import { addAlert } from "presentation/store/slices/alertSlice";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const ITEMS_PER_PAGE = 10;

interface ListRegisteredEmployeesProps {
  id: string;
}

export const ListRegisteredEmployees: React.FC<
  ListRegisteredEmployeesProps
> = ({ id }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [postulations, setPostulations] = useState<PostulationType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getRegisteredEmployeesBySchedule();
  }, []);

  const paginatedPostulations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return postulations.slice(start, start + ITEMS_PER_PAGE);
  }, [postulations, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(postulations.length / ITEMS_PER_PAGE),
    [postulations]
  );

  const getRegisteredEmployeesBySchedule = async () => {
    const getRegisteredEmployeesBySchedule =
      appContainer.get<GetRegisteredEmployeesByScheduleUseCase>(
        USECASES_TYPES._GetRegisteredEmployeesBySchedule
      );
    const response = await getRegisteredEmployeesBySchedule.execute(id);
    if (!response) {
      return;
    }
    console.log(response);
    setPostulations(response);
  };

  const deleteEmployeePostulation = async (postulationId: string) => {
    const query = {
      registrationId: postulationId,
    } as QueryDeleteCourseRegistration;

    const deletePostulationQuery =
      appContainer.get<DeleteEmployeeCourseRegisterUseCase>(
        USECASES_TYPES._DeleteEmployeeCourseRegisterUseCase
      );
    const response = await deletePostulationQuery.execute(
      query,
      session?.access_token ?? ""
    );

    if (!response) {
      console.error("Error al contactar el servidor.");
    }

    if (response?.success) {
      return true;
    }

    if (response?.error) {
      console.error(
        "Error al eliminar la postulación al curso:",
        response.message
      );

      dispatch(
        addAlert({
          message: `Error al eliminar la postulación al curso: ${response.message}`,
          type: "error",
        })
      );
    }

    return false;
  };

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedPostulation, setSelectedPostulation] =
    useState<PostulationType | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className="w-full md:w-11/12">
        <MainTitle text="Listado de trabajadores registrados" />
        <SecondaryText text="A continuación se muestran los trabajadores registrados." />
        <SectionSeparator />
        <div className="flex flex-col w-full items-center bg-principal-150 rounded-lg py-4 px-8">
          <div className="w-full grid grid-cols-3 gap-1 items-center justify-center text-center text-principal-350 rounded-t-lg py-3 border-b-[2px] border-principal-450/20">
            <div>Numero de postulación</div>
            <div>Numero de empleados registrados</div>
            <div>Acciones</div>
          </div>
          <div className="flex flex-col divide-y-[2px] divide-principal-450/20 w-full rounded-b-lg">
            {paginatedPostulations.map((postulation, index) => (
              <div key={postulation.id} className="w-full">
                <div
                  className="grid grid-cols-3 gap-1 items-center justify-center text-center text-principal-450 py-4 border-b border-principal-450/20 cursor-pointer"
                  onClick={() => toggleExpand(postulation.id)}
                >
                  <div>{`Postulación ${index + 1}`}</div>
                  <div>{postulation.courseRegistration.length}</div>
                  <div className="flex justify-center gap-2">
                    <button
                      className="w-28 bg-principal-500/50 hover:bg-principal-500/30 text-white px-3 py-1 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation(); // para que no se dispare toggleExpand
                        setSelectedPostulation(postulation);
                        setOpenModal(true);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Empleados desplegados */}
                {expandedId === postulation.id &&
                  postulation.courseRegistration.length > 0 && (
                    <div className="pl-4 pr-4 pb-2 bg-gray-50">
                      {postulation.courseRegistration.map((employee) => (
                        <div
                          key={employee.document_number}
                          className="grid grid-cols-6 gap-1 items-center justify-center text-center text-gray-700 py-2 border-b border-principal-450/20"
                        >
                          <div className="col-span-2">
                            {employee.firstName +
                              " " +
                              employee.middleName +
                              " " +
                              employee.firstLastName}
                          </div>
                          <div>{employee.document_type}</div>
                          <div>{employee.document_number}</div>
                          <div>{employee.email}</div>
                          <div>{employee.phoneNumber}</div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-4 rounded-xl justify-center">
          <div className="flex bg-principal-150 rounded-xl">
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
      </div>
      {openModal && (
        <ModalWithChildren
          onClose={() => setOpenModal(false)}
          className={`md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/utopia/icons/campaign-alert.png"
            alt="Close icon"
            width={80}
            height={80}
            className={`cursor-pointer`}
            priority
          />
          <ModalTitle
            text="¿Estas seguro de eliminar la postulación?"
            className="mt-2"
          />
          <div className="flex flex-col w-[70%] space-y-3 py-2">
            <Button
              label="Continuar"
              onClick={async () => {
                if (selectedPostulation?.id) {
                  if (
                    await deleteEmployeePostulation(selectedPostulation?.id)
                  ) {
                    setPostulations((prev) =>
                      prev.filter((e) => e.id !== selectedPostulation?.id)
                    );
                  }
                }
                setOpenModal(false);
              }}
              className="w-full"
              primary
            />
          </div>
        </ModalWithChildren>
      )}
    </>
  );
};

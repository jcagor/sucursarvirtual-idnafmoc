"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { BusinessToAssignConsultantType } from "domain/models/Business/BusinessToAssignConsultantType";
import FindBusinessToAssignConsultantUseCase from "domain/usecases/Business/FindBusinessToAssignConsultant.use.case";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import Image from "next/image";
import { SecondaryText, SectionSeparator } from "presentation/components/atoms";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ListBusiness = () => {
  const [businessToAssign, setBusinessToAssign] = useState<
    BusinessToAssignConsultantType[]
  >([]);

  useEffect(() => {
    findBusinessToAssignConsultant();
  }, []);

  const findBusinessToAssignConsultant = async () => {
    const findAll = appContainer.get<FindBusinessToAssignConsultantUseCase>(
      USECASES_TYPES._FindBusinessToAssignConsultant
    );
    const response = await findAll.execute();

    if (!response) {
      toast.error("No se pudieron cargar las empresas.");
      return;
    }

    setBusinessToAssign(response);
  };

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Lista de empresas" />
      <SecondaryText text="Listado de empresas a las que puden asignar consultores" />
      <SectionSeparator />

      <div className="flex flex-col w-full rounded-b-lg">
        {businessToAssign.length > 0 ? (
          <>
            <div className="w-full grid grid-cols-4 gap-3 mt-8 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
              <div className="font-bold text-lg">NIT</div>
              <div className="font-bold text-lg">Nombre</div>
              <div className="font-bold text-lg">
                Numero de consultores asignados
              </div>
              <div className="font-bold text-lg">
                Numero de administradores asignados
              </div>
            </div>
            {businessToAssign.map((item) => (
              <div
                key={item.id}
                className="w-full grid grid-cols-4 gap-3 py-3 px-3 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10"
              >
                <div className="text-lg">{item.document_number}</div>
                <div className="text-lg">{item.name}</div>
                <div className="text-lg flex flex-row gap-2 justify-center items-center ">
                  <span className="font-bold">
                    {item.numberOfConsultantsAssigned}
                  </span>
                  <a
                    href={`/lalande/admin/assign-consultant-to-business/${item.id}`}
                  >
                    <Image
                      src="/lalande/icons/edit-icon.svg"
                      alt="Editar asignación"
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
                <div className="text-lg flex flex-row gap-2 justify-center items-center ">
                  <span className="font-bold">
                    {item.numberOfAdministratorsAssigned}
                  </span>
                  <a
                    href={`/lalande/admin/assign-admin-to-business/${item.id}`}
                  >
                    <Image
                      src="/lalande/icons/edit-icon.svg"
                      alt="Editar asignación"
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="w-full py-3 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10">
            <div className="text-lg font-bold">No se encontraron empresas </div>
          </div>
        )}
      </div>
    </div>
  );
};

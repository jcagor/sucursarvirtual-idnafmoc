"use client";

import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { Greatment, SectionSeparator } from "presentation/components/atoms";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProgramType } from "domain/models/program/ProgramType";
import findAllProgramsUseCase from "domain/usecases/program/findAllPrograms.use.case";

export const ProgramManagement = () => {
  const [programs, setPrograms] = useState<ProgramType[]>([]);

  useEffect(() => {
    findAllPrograms();
  }, []);

  const findAllPrograms = async () => {
    const findAll = appContainer.get<findAllProgramsUseCase>(
      USECASES_TYPES._findAllPrograms
    );
    const response = await findAll.execute();

    if (!response) {
      toast.error("No se pudieron cargar los programas.");
      return;
    }

    setPrograms(response);
  };

  return (
    <>
      <div className="w_full md:w-11/12">
        <div className="flex justify-between mb-2 md:mb-7 md:-mt-3">
          <Greatment text={`Lista de programas`} className="" />
        </div>
        <SectionSeparator />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {programs.length > 0 ? (
            programs.map((program) => (
              <CardProgram
                key={program.id}
                Title={program.name}
                Text={program.description}
                Icon={`/lalande${program.iconUrl}`}
                path={`/admin/program/schedule-management/${program.id}`}
              />
            ))
          ) : (
            <div className="text-2xl font-bold text-center text-principal-350">
              No hay programas disponibles por el momento.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface programProps {
  Title: string;
  Text: string;
  Icon: string;
  IconHeight?: number;
  IconWidth?: number;
  path: string;
}

export const CardProgram: React.FC<programProps> = ({
  Title,
  Text,
  Icon,
  IconHeight,
  IconWidth,
  path,
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleNavigation}
      className="bg-principal-150 rounded-xl shadow-md p-6 hover:bg-opacity-5 hover:bg-principal-180"
    >
      <div className="flex items-center gap-3">
        <Image
          src={Icon}
          alt="img"
          width={IconWidth ?? 50}
          height={IconHeight ?? 50}
        />
        <div className="text-principal-180 font-semibold text-lg">{Title}</div>
      </div>
      <div className="text-principal-450 mt-3 text-sm leading-relaxed">
        {Text}
      </div>
    </button>
  );
};

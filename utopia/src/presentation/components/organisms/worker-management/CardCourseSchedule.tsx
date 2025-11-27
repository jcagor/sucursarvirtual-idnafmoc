"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "presentation/components/atoms";

interface CardCourseScheduleProps {
  name: string;
  ImageUrl: string;
  startDate: string;
  endDate: string;
  modality: string;
  typeUser: string;
  sessions: string;
  assingEmployeesPath: string;
  curriculumMeshPath: string;
  listRegisteredEmployeesPath: string;
}

export const CardCourseSchedule: React.FC<CardCourseScheduleProps> = ({
  name,
  ImageUrl,
  startDate,
  endDate,
  modality,
  typeUser,
  sessions,
  assingEmployeesPath,
  curriculumMeshPath,
  listRegisteredEmployeesPath,
}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="h-72 bg-principal-150 rounded-xl shadow-md p-5 hover:bg-opacity-5 hover:bg-principal-180">
      <div className="flex gap-5">
        <img
          src={ImageUrl}
          alt="img"
          className="rounded-lg h-full max-h-64 max-w-96"
        />
        <div className="flex flex-col w-full justify-between grid-cols-2 text-principal-180 text-left">
          <div className=" font-bold text-2xl">{name}</div>
          <div className="flex">
            <Image
              src={"/utopia/icons/calendar-icon.svg"}
              alt="calendar"
              width={18}
              height={18}
              className="mr-2"
            />
            <div className="font-bold mr-1">Fecha de Inicio:</div>
            <div>{new Date(startDate).toLocaleDateString("es-ES")}</div>
          </div>
          <div className="flex">
            <Image
              src={"/utopia/icons/calendar-icon.svg"}
              alt="calendar"
              width={18}
              height={18}
              className="mr-2"
            />
            <div className="font-bold mr-1">Fecha de Fin:</div>
            <div>{new Date(endDate).toLocaleDateString("es-ES")}</div>
          </div>
          <div className="flex">
            <Image
              src={"/utopia/icons/briefcase-icon.svg"}
              alt="calendar"
              width={18}
              height={18}
              className="mr-2"
            />
            <div className="font-bold mr-1">Modalidad:</div>
            <div>{modality}</div>
          </div>
          <div className="flex">
            <Image
              src={"/utopia/icons/user-icon.svg"}
              alt="calendar"
              width={18}
              height={18}
              className="mr-2"
            />
            <div className="font-bold mr-1">Tipo de Usuario:</div>
            <div>{typeUser}</div>
          </div>
          <div className="flex">
            <Image
              src={"/utopia/icons/book-user-icon.svg"}
              alt="calendar"
              width={18}
              height={18}
              className="mr-2"
            />
            <div className="font-bold mr-1">Sesiones:</div>
            <div>{sessions}</div>
          </div>
          <div className="flex gap-4">
            <Button
              label="Ver malla curricular"
              className="w-46 self-end"
              onClick={() => handleNavigation(curriculumMeshPath)}
              primary
            />
            <Button
              label="Registrar empleados"
              className="w-52 self-end"
              onClick={() => handleNavigation(assingEmployeesPath)}
              primary
            />
            <Button
              label="Lista de empleados registrados"
              className="w-64 self-end"
              onClick={() => handleNavigation(listRegisteredEmployeesPath)}
              primary
            />
          </div>
        </div>
      </div>
    </div>
  );
};

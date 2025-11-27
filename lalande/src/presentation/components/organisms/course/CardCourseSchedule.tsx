"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardCourseScheduleProps {
  name: string;
  ImageUrl: string;
  startDate: string;
  endDate: string;
  modality: string;
  typeUser: string;
  sessions: string;
}

export const CardCourseSchedule: React.FC<CardCourseScheduleProps> = ({
  name,
  ImageUrl,
  startDate,
  endDate,
  modality,
  typeUser,
  sessions,
}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="lg:h-64 xl:h-72 bg-principal-150 rounded-xl shadow-md p-2 lg:p-5 text-sm lg:text-base">
      <div className="flex gap-4 xl:gap-10 h-full items-center">
        <img
          src={ImageUrl}
          alt="img"
          className="rounded-lg h-full max-h-32 max-w-52 lg:max-h-52 lg:max-w-80 xl:max-h-64 xl:max-w-96"
        />
        <div className="flex flex-col h-full justify-between grid-cols-2 text-principal-180 text-left">
          <div className=" font-bold text-2xl lg:text-3xl">{name}</div>
          <div className="flex">
            <Image
              src={"/lalande/icons/calendar-icon.svg"}
              alt="calendar"
              width={18}
              height={18}
              className="mr-2"
            />
            <div className="font-bold mr-1">Fecha de Inicio:</div>
            <div>{startDate}</div>
          </div>
          <div className="flex">
            <Image
              src={"/lalande/icons/calendar-icon.svg"}
              alt="calendar"
              width={18}
              height={18}
              className="mr-2"
            />
            <div className="font-bold mr-1">Fecha de Fin:</div>
            <div>{endDate}</div>
          </div>
          <div className="flex">
            <Image
              src={"/lalande/icons/briefcase-icon.svg"}
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
              src={"/lalande/icons/user-icon.svg"}
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
              src={"/lalande/icons/book-user-icon.svg"}
              alt="calendar"
              width={18}
              height={18}
              className="mr-2"
            />
            <div className="font-bold mr-1">Sesiones:</div>
            <div>{sessions}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

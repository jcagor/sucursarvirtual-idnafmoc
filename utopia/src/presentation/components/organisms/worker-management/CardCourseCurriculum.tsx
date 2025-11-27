"use client";
import { CourseSessionType } from "domain/models/CourseSessionType";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CardCourseCurriculum: React.FC<CourseSessionType> = ({
  name,
  date,
  typeSession,
  startTime,
  endTime,
}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col justify-between h-48 bg-principal-150 rounded-xl shadow-md py-5 px-8 text-principal-180 text-left">
      <div className=" font-bold text-2xl">{name}</div>
      <div className="flex">
        <Image
          src={"/utopia/icons/calendar-icon.svg"}
          alt="calendar"
          width={18}
          height={18}
          className="mr-2"
        />
        <div className="font-bold mr-1">Fecha:</div>
        <div>{new Date(date).toLocaleDateString()}</div>
      </div>
      <div className="flex">
        <Image
          src={"/utopia/icons/schedule-icon.svg"}
          alt="calendar"
          width={18}
          height={18}
          className="mr-2"
        />
        <div className="font-bold mr-1">Horario:</div>
        <div>{startTime + " - " + endTime}</div>
      </div>
      <div className="flex">
        <Image
          src={"/utopia/icons/session-type-icon.svg"}
          alt="calendar"
          width={18}
          height={18}
          className="mr-2"
        />
        <div className="font-bold mr-1">Tipo de sesión:</div>
        <div>{typeSession}</div>
      </div>
      {/* <div className="flex">
        <Image
          src={"/utopia/icons/session-icon.svg"}
          alt="calendar"
          width={18}
          height={18}
          className="mr-2"
        />
        <div className="font-bold mr-1">Sesión:</div>
        <div>{session}</div>
      </div> */}
    </div>
  );
};

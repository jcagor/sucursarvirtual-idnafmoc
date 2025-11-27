"use client";
import Image from "next/image";
import { CardText, NeutralBlackText } from "presentation";
import React, { useEffect, useRef } from "react";
import redirectArrow from "public/icons/redirect-arrow.svg";
import {
  CONFLICT_TYPE,
  CourseAccessType,
  CourseScheduleType,
} from "presentation/components/templates/training/training.types";

interface Props {
  imageUrl: string;
  label: string;
  width?: number;
  height?: number;
  imageClassname?: string;
  ellipseUrl?: string;
  ellipseClassname?: string;
  betaAccess?: string[] | undefined;
  description?: string;
  duration?: string;
  loading?: boolean;
  schedule?: CourseScheduleType;
}

export const MenuCourseCard = ({
  imageUrl,
  label,
  width = 352,
  height = 208,
  imageClassname = "rounded-xl",
  ellipseUrl = "",
  ellipseClassname = "",
  betaAccess = undefined,
  description = "",
  duration = "",
  schedule,
  loading = false,
}: Props) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  const getUserDate = (timeString: string) => {
    let dateObj = new Date(timeString);
    return dateObj.toLocaleDateString();
  };

  const conflictMessage = (conflictType:CONFLICT_TYPE|undefined) =>{

    if (!conflictType){
      return "";
    }
    
    switch (conflictType) {
      case CONFLICT_TYPE.TIME_OVERLAP:
        return " (Cruce de Horarios)"
      
      case CONFLICT_TYPE.ALREADY_ENROLLED:
        return " (Matriculado)"
    
      default:
        return " (Conflicto detectado)"
    }

  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("lottie-web/build/player/lottie_light").then((lottie: any) => {
      if (animationContainer.current) {
        const anim = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("/public/animations/spinner.json"),
        });

        return () => anim.destroy();
      }
    });
  }, []);

  return (
    <div className="w-full md:w-[20.375rem] rounded-xl menuCourseCardShadow bg-[#FFF] items-center md:justify-center cursor-pointer hover:scale-[102%] active:scale-100 z-10">
      <div className="p-3 w-full md:w-[20.375rem] md:h-[14.813rem] relative flex flex-row items-center md:justify-center">
        {betaAccess && (
          <div className="absolute right-0 top-0 md:-top-6 text-xs py-[0.1rem] px-2 font-outfit rounded-md text-principal-150 bg-gradient-to-r from-[#38bdf8] to-[#3b82f6]">
            BETA
          </div>
        )}

        {loading ? (
          <div className={`w-16 h-16`} ref={animationContainer}></div>
        ) : (
          <>
            {ellipseUrl && (
              <Image
                src={ellipseUrl}
                alt="Card ellipse"
                width={44}
                height={47}
                draggable={false}
                className={ellipseClassname}
                loading="lazy"
              />
            )}
            <div className="w-[30%] md:w-full">
              <Image
                src={imageUrl}
                alt="Card image"
                width={width}
                height={height}
                draggable={false}
                className={imageClassname}
                unoptimized
              />
            </div>

            <div className="absolute right-4 mt-[0.2rem] md:hidden">
              <Image
                src={redirectArrow}
                alt="Redirect arrow image"
                width={8}
                height={8}
                draggable={false}
                className="opacity-70"
                unoptimized
              />
            </div>
          </>
        )}
      </div>
      <div className="p-1">
        <NeutralBlackText
          text={label +  conflictMessage(schedule?.conflict_type)}
          className="p-1 cf-text-principal-180 flex w-full text-start font-bold items-start justify-start"
        />
      </div>
      {schedule && (
        <div className="p-1">
          <NeutralBlackText
            text={`Fecha Inicio: ${getUserDate(schedule.startDate)}`}
            className="p-1 cf-text-principal-180 flex w-full text-start font-bold items-start justify-start"
          />
        </div>
      )}
      {schedule?.accessType == CourseAccessType.cerrado && (
        <div className="p-1">
          <NeutralBlackText
            text={`CURSO EMPRESARIAL: Inscrito`}
            className="p-1 cf-text-principal-180 flex w-full text-start font-bold items-start justify-start"
          />
        </div>
      )}
      {schedule?.accessType == CourseAccessType.abierto && (
        <div className="p-1">
          <NeutralBlackText
            text={`Curso Disponible`}
            className="p-1 cf-text-principal-180 flex w-full text-start font-bold items-start justify-start"
          />
        </div>
      )}
      <div className="p-1">
        <CardText
          text={description}
          className="font-light text-[#777777]"
          fontSize="sm"
        />
      </div>
    </div>
  );
};

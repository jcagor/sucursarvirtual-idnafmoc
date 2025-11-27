import Image from "next/image";
import React, { FC, useState } from "react";
import { Button, NeutralBlackText, Spinner } from "presentation";
import { motion, AnimatePresence } from "framer-motion";
import { ModalTitle } from "./text/ModalTitle";
import Link from "next/link";
import { UserTrainingEntityInterface } from "lib";
import { CourseScheduleType, CourseType } from "presentation/components/templates/training/training.types";

interface Props {
  urlImage?: string;
  title?: string;
  description: string;
  course: UserTrainingEntityInterface | undefined;
  courseType: CourseType | undefined;
  schedule: CourseScheduleType;
  loading?: boolean;
  containerClass?: string;
  imageClass?: string;
  titleClass?: string;
  imageWidth?: number;
  primaryButtonText?: string;
  SecondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  hideSecondaryButton?: boolean;
  lockModal?: boolean;
}

// Función que convierte el texto con * * en partes estilizadas
const formatDescription = (text: string) => {
  return text.split(/\n+/).map((line, index) => (
    <span key={"nt-gen-" + index} className="mb-2">
      {line.split(/(\*[^*]+\*)/).map((part, subIndex) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={"ft-gen-" + subIndex} className="font-semibold">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        )
      )}
    </span>
  ));
};

const ModalCourseInscription: FC<Props> = ({
  urlImage = "/img/hello_full.png",
  title,
  description,
  course,
  schedule,
  loading = false,
  containerClass,
  imageClass,
  titleClass,
  imageWidth = 147,
  primaryButtonText = "Reintentar",
  SecondaryButtonText = "Cancelar",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
  hideSecondaryButton = false,
  lockModal = false,
}) => {
  const [visible, setVisible] = useState(true);

  const handlePrimaryClick = () => {
    onPrimaryClick();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick();
    setVisible(false);
  };

  const handleMainClick = () => {
    if (!loading && !lockModal) {
      handleSecondaryClick();
    }
  };

  return (
    <>
      {visible && (
        <div
          className={`w-screen h-screen absolute top-0 left-0 z-[90000] flex justify-center items-center bg-principal-800`}
          onClick={handleMainClick}
          onKeyDown={() => {}}
          role="button"
        >
          <AnimatePresence>
            <motion.div
              key={"sucursalmodal"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className={`relative md:w-[763px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 ${containerClass} subpixel-antialiased`}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={() => {}}
              role="button"
            >
              {!loading && !lockModal && (
                <Image
                  src="/icons/close-icon.svg"
                  alt="Close icon"
                  width={25}
                  height={25}
                  className={`absolute top-4 right-4 cursor-pointer ${
                    loading ? "hidden" : ""
                  }`}
                  onClick={handleSecondaryClick}
                  onKeyDown={() => {}}
                  role="button"
                  priority
                />
              )}
              {urlImage && (
                <Image
                  src={urlImage}
                  alt="Modal Image"
                  width={imageWidth}
                  height={200}
                  className={`${imageClass} mt-[-59px] antialiased crisp-edges`}
                  draggable={false}
                  quality={100}
                  priority
                  unoptimized
                />
              )}
              {title && <ModalTitle text={title} className={`${titleClass}`} />}
              <p
                className={`font-outfit text-[1rem] w-[70%] px-4 text-justify font-light modalText text-principal-180 ${
                  !title && "mt-4"
                }`}
              ></p>

              <div className="flex flex-col w-full p-10 justify-between grid-cols-2 text-principal-180 text-left">
                <div className=" font-bold text-2xl">{course?course.label:schedule.course?.name}</div>
                <div className=" font-bold text-2xl">{schedule.name}</div>

                <div className="flex">
                  <Image
                    src={"/icons/calendar-icon.svg"}
                    alt="calendar"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  <div className="font-bold mr-1">Fecha de Inicio:</div>
                  <div>{schedule.startDate?new Date(schedule.startDate).toLocaleDateString():schedule.startDate}</div>
                </div>
                <div className="flex">
                  <Image
                    src={"/icons/calendar-icon.svg"}
                    alt="calendar"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  <div className="font-bold mr-1">Fecha de Fin:</div>
                  <div>{schedule.endDate?new Date(schedule.endDate).toLocaleDateString():schedule.endDate}</div>
                </div>
                <div className="flex">
                  <Image
                    src={"/icons/briefcase-icon-min.svg"}
                    alt="calendar"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  <div className="font-bold mr-1">Modalidad:</div>
                  <div>{schedule.modality}</div>
                </div>
                <div className="flex">
                  <Image
                    src={"/icons/user-icon.svg"}
                    alt="calendar"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  <div className="font-bold mr-1">Tipo de Usuario:</div>
                  <div>{schedule.typeUser}</div>
                </div>
                <div className="flex">
                  <Image
                    src={"/icons/book-user-icon.svg"}
                    alt="calendar"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  <div className="font-bold mr-1">Sesiones:</div>
                  <div>{schedule.sessions}</div>
                </div>
                { schedule.accessType == "CLOSED" && (
                  <div className="flex">
                  <Image
                    src={"/icons/briefcase-icon-min.svg"}
                    alt="calendar"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  <div className="font-bold mr-1">Curso cerrado:</div>
                  <div>{"La empresa contratante te asigno este curso"}</div>
                </div>
                )
                }
                
              </div>

              {/*
              
              {formatDescription(description)}

              <NeutralBlackText text={course.label} />

              <NeutralBlackText text={`Programa: ${schedule.name}`} />

              <NeutralBlackText text={`Impartido por: ${schedule.supplier}`} />

              <NeutralBlackText
                text={`Fecha de inicio: ${new Date(
                  schedule.startDate
                ).toLocaleDateString()}`}
              />

              <NeutralBlackText
                text={`Fecha de Cierre: ${new Date(
                  schedule.endDate
                ).toLocaleDateString()}`}
              />

              <NeutralBlackText text={`Modalidad: ${schedule.modality}`} />

              <NeutralBlackText text={`Descripción: ${schedule.description}`} />

              */}

              {loading && (
                <div className="pt-8 pb-6">
                  <Spinner />
                </div>
              )}
              {!loading && (
                <div className="flex flex-col w-[70%] space-y-3 mt-6 pb-8">
                  <Button
                    label={primaryButtonText}
                    onClick={handlePrimaryClick}
                    onKeyDown={() => {}}
                    className="w-full"
                    primary
                  />
                  {!hideSecondaryButton && (
                    <Button
                      label={SecondaryButtonText}
                      onClick={handleSecondaryClick}
                      className="w-full"
                    />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default ModalCourseInscription;

"use client";

import { CourseCurriculumType } from "domain/models/CourseCurriculumType";
import { CourseScheduleType } from "domain/models/CourseScheduleType";
import { CourseSessionType } from "domain/models/CourseSessionType";
import findCourseCurriculumByCourseSheduleIdUseCase from "domain/usecases/Business/findCourseCurriculumByCourseSheduleIdUseCase.use.case";
import FindAllSessionByScheduleUseCase from "domain/usecases/worker-management/FindAllSessionBySchedule.use.case";
import FindScheduleUseCase from "domain/usecases/worker-management/FindSchedule.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import {
  CardCourseCurriculum,
  Greatment,
  HeaderNotificationCard,
  SecondaryText,
} from "presentation";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface PageProps {
  id: string;
}

export const CurriculumMesh: React.FC<PageProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [curriculums, setCurriculums] = useState<CourseCurriculumType[]>([]);
  const [sessions, setSessions] = useState<CourseSessionType[]>([]);
  const [courseSchedule, setCourseSchedule] = useState<CourseScheduleType>();

  useEffect(() => {
    // findCourseCurriculumByCourseSheduleId();
    findAllSessionBySchedule();
    findSchedule();
  }, []);

  const findCourseCurriculumByCourseSheduleId = async () => {
    if (!session?.access_token) {
      return;
    }

    const Curriculums =
      appContainer.get<findCourseCurriculumByCourseSheduleIdUseCase>(
        USECASES_TYPES._findCourseCurriculumByCourseScheduleId
      );
    const response = await Curriculums.execute(id, session.access_token);

    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener el cronograma, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }

    setCurriculums(response);
  };

  const findSchedule = async () => {
    const findScheduleUseCase = appContainer.get<FindScheduleUseCase>(
      USECASES_TYPES._FindSchedule
    );
    const response = await findScheduleUseCase.execute(
      id,
      session?.access_token
    );
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener el nombre del cronograma, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }
    setCourseSchedule(response);
  };

  const findAllSessionBySchedule = async () => {
    if (!session?.access_token) {
      return;
    }

    const Curriculums = appContainer.get<FindAllSessionByScheduleUseCase>(
      USECASES_TYPES._findAllSessionBySchedule
    );
    const response = await Curriculums.execute(id, session.access_token);

    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener el curriculum, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }

    setSessions(response);
  };

  return (
    <div className="w_full md:w-11/12 xl:w-2/3 mb-10">
      <HeaderNotificationCard
        startText="¡Tu empresa ya puede acceder al portafolio de entrenamientos Comfandi!"
        middleBoldText=""
        endText=""
      />
      <Greatment
        text={courseSchedule?.name ? courseSchedule.name : ""}
        className="text-xl mb-3"
      />
      <SecondaryText text="Estructura del entrenamiento con sesiones para modelar y fortalecer tu emprendimiento." />
      <div className="grid grid-cols-2 gap-4 mt-5">
        {sessions.map((session) => (
          <CardCourseCurriculum {...session} key={session.id} />
        ))}
      </div>
    </div>
  );
};

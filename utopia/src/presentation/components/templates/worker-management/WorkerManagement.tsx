"use client";

import { CourseType } from "domain/models";
import findAllCoursesUseCase from "domain/usecases/Business/findAllCourses.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import {
  Greatment,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { HeaderNotificationCard } from "presentation/components/molecules/common/notification";
import { CardCourse } from "presentation/components/organisms";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const WorkerManagement = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    if (status === "authenticated" && session?.access_token) {
      findAllCourses();
    }
  }, [status, session]);

  const findAllCourses = async () => {
    if (!session?.access_token) {
      return;
    }

    const findAllCourses = appContainer.get<findAllCoursesUseCase>(
      USECASES_TYPES._findAllCourses
    );
    const response = await findAllCourses.execute(session?.access_token);

    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener los cursos, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }

    setCourses(response);
  };

  return (
    <div className="w_full md:w-11/12">
      <HeaderNotificationCard
        startText="¡Tu empresa ya puede acceder al portafolio de entrenamientos Comfandi!"
        middleBoldText=""
        endText=""
      />
      <Greatment text={`Bienvenid@ 👋`} className="mb-2 md:mb-7 md:-mt-3" />
      <SectionSeparator />
      <SecondaryText text="Iniciar entrenamiento profesional." />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CardCourse
              key={course.id}
              Title={course.name}
              Text={course.description}
              Icon={`/utopia${course.iconUrl}`}
              path={`/worker-management/course/${course.id}`}
            />
          ))
        ) : (
          <div className="text-2xl font-bold text-center text-principal-350">
            No hay cursos disponibles por el momento.
          </div>
        )}
      </div>
    </div>
  );
};

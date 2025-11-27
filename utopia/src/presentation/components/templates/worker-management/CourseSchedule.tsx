"use client";

import { CourseScheduleType } from "domain/models";
import findCourseSheduleByCourseIdUseCase from "domain/usecases/Business/findCourseSheduleByCourseId.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Greatment,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { HeaderNotificationCard } from "presentation/components/molecules/common/notification";
import { CardCourseSchedule } from "presentation/components/organisms/worker-management/CardCourseSchedule";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface CourseScheduleProps {
  id: string;
}

export const CourseSchedule: React.FC<CourseScheduleProps> = ({ id }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [schedules, setShedules] = useState<CourseScheduleType[]>([]);

  useEffect(() => {
    findCourseSheduleByCourseId();
  }, []);

  const findCourseSheduleByCourseId = async () => {
    if (!session?.access_token) {
      return;
    }

    const findCourseSheduleByCourseId =
      appContainer.get<findCourseSheduleByCourseIdUseCase>(
        USECASES_TYPES._findCourseSheduleByCourseId
      );
    const response = await findCourseSheduleByCourseId.execute(
      id,
      session.access_token
    );

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

    setShedules(response);
  };

  const previousForm = () => {
    router.back();
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
      <SecondaryText text="Selecciona el cronograma disponible." />

      {schedules.length > 0 ? (
        <div className="flex flex-col gap-3">
          {schedules.map((schedule) => (
            <CardCourseSchedule
              key={schedule.id}
              name={schedule.name}
              ImageUrl={"/utopia/img/CourseSchedule_1.jpg"}
              startDate={schedule.startDate}
              endDate={schedule.endDate}
              modality={schedule.modality}
              typeUser={schedule.typeUser}
              sessions={schedule.sessions}
              assingEmployeesPath={`/worker-management/course/assign-employees/${schedule.id}`}
              curriculumMeshPath={`/worker-management/course/curriculum-mesh/${schedule.id}`}
              listRegisteredEmployeesPath={`/worker-management/course/list-registered-employees/${schedule.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-2xl font-bold text-center text-principal-350">
          No hay cronogramas disponibles en este momento.
        </div>
      )}
      <div className="flex flex-row justify-start items-center mt-5">
        <a
          className="cursor-pointer"
          onClick={previousForm}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              previousForm();
            }
          }}
        >
          Atrás
        </a>
      </div>
    </div>
  );
};

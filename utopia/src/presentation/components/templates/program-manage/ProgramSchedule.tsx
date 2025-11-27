"use client";

import { CourseScheduleType } from "domain/models";
import {
  ProgramInscription,
  ScheduleObjectList,
} from "domain/models/ProgramType";
import createBusinessProgramInscriptionUseCase from "domain/usecases/Business/createBusinessProgramInscription.use.case";
import findCourseSheduleByCourseIdUseCase from "domain/usecases/Business/findCourseSheduleByCourseId.use.case";
import findSchedulesByProgramId from "domain/usecases/Business/findSchedulesByProgram.use.case";
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
import { CardProgramSchedule } from "presentation/components/organisms";
import { CardCourseSchedule } from "presentation/components/organisms/worker-management/CardCourseSchedule";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface ProgramScheduleProps {
  id: string;
}

export const ProgramSchedule: React.FC<ProgramScheduleProps> = ({ id }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [schedules, setSchedules] = useState<ScheduleObjectList>();

  useEffect(() => {
    findProgramScheduleById();
  }, []);

  const findProgramScheduleById = async () => {
    if (!session?.access_token) {
      return;
    }
    const query = {
      id: id,
    };

    const findProgramSchedules = appContainer.get<findSchedulesByProgramId>(
      USECASES_TYPES._findSchedulesByProgramId
    );
    const response = await findProgramSchedules.execute(
      query,
      session.access_token
    );

    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al obtener los cronogramas, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }

    setSchedules(response);
  };

  const createNewProgramInscription = async (programSchedule_id: string) => {
    if (!session?.access_token) {
      return;
    }
    const query = {
      programSchedule_id: programSchedule_id,
    } as ProgramInscription;

    const programInscription =
      appContainer.get<createBusinessProgramInscriptionUseCase>(
        USECASES_TYPES._createBusinessProgramInscriptionUseCase
      );
    const response = await programInscription.execute(
      session.access_token,
      query
    );

    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al realizar la inscripción, por favor intenta nuevamente.",
          type: "error",
        })
      );
      return;
    }

    dispatch(
      addAlert({
        message:
          "Inscripción realizada con éxito, regresando al menu de programas.",
        type: "success",
      })
    );

    setTimeout(() => {
      router.push("/program-management");
    }, 700);
  };

  return (
    <div className="w_full md:w-11/12">
      <HeaderNotificationCard
        startText="¡Elige la programación que mas se ajuste a tus necesidades!"
        middleBoldText=""
        endText=""
      />
      <Greatment text={`Programación`} className="mb-2 md:mb-7 md:-mt-3" />
      <SectionSeparator />
      <SecondaryText text="Selecciona el cronograma disponible." />

      {schedules && schedules.length > 0 ? (
        <div className="flex flex-col gap-3">
          {schedules.map((schedule) => (
            <CardProgramSchedule
              key={schedule.id}
              name={schedule.name}
              ImageUrl={"/utopia/img/CourseSchedule_1.jpg"}
              startDate={schedule.startDate}
              endDate={schedule.endDate}
              description={schedule.description}
              modality={" -- "}
              typeUser={" -- "}
              sessions={" -- "}
              assignEmployeesPath={`/worker-management/course/assign-employees/${schedule.id}`}
              onClickAction={() => {createNewProgramInscription(schedule.id)}}
            />
          ))}
        </div>
      ) : (
        <div className="w-full text-2xl font-bold text-center text-principal-350">
          No hay cronogramas disponibles en este momento.
        </div>
      )}
    </div>
  );
};

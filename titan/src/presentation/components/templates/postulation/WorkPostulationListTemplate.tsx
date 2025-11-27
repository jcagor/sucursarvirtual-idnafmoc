"use client";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import {
  Button,
  Greatment,
  NeutralNCText,
  NeutralText,
} from "presentation/components/atoms";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import GetJobPostulationListUseCase from "domain/usecases/userData/jobPostulation/userJobPostulationList.usecase";
import { timeDifference } from "./utilFunctions";
import {
  OpenJob,
  PostulationListServerResponse,
  PostulationServerResponse,
} from "lib";
import { JobStatusCard } from "presentation/components/molecules";
import { toast } from "react-toastify";

export const WorkPostulationListTemplate = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const previousSteep = () => {
    router.push("/postulation");
  };

  // My Postulations
  const [postulationList, setPostulationList] =
    useState<PostulationListServerResponse>();

  const listPostulations = async () => {
    const token = session?.access_token ? session?.access_token : "";
    const postulateToJob = appContainer.get<GetJobPostulationListUseCase>(
      USECASES_TYPES._GetJobPostulationListUseCase
    );

    const response = await postulateToJob.execute({}, token);
    if (!response) {
      console.error("error al leer las variables desde el servidor");
      toast.error("¡Se ha producido un error al contactar el servidor!");
      return [];
    }
    console.log("User postulation list:", response);
    setPostulationList(response);
  };

  const getJobOfferComponent = (
    key: number,
    response: PostulationServerResponse
  ) => {
    try {
      const offerData: OpenJob = JSON.parse(response.information);

      let timeDiff = timeDifference(offerData.startDate);
      let formatTime =
        (timeDiff.years ? `${timeDiff.years} Años ` : "") +
        (timeDiff.months ? `${timeDiff.months} Meses ` : "") +
        (timeDiff.days ? `${timeDiff.days} Dias ` : "") +
        (timeDiff.minutes ? `${timeDiff.minutes} Minutos ` : "") +
        (timeDiff.seconds ? `${timeDiff.seconds} Segundos` : "");

      return (
        <JobStatusCard
          key={`job-card-${key}`}
          title={`${offerData.title}`}
          subtitle={`${offerData.businessName} / ${offerData.state}`}
          status={response.postulation_status}
          publishedTime={`${formatTime}`}
          activeCard={false}
          width={120}
          height={100}
          imageUrl={"/icons/fail.webp"}
          imageClassname={"w-[41px] h-[41px] md:ml-8 mx-auto"}
        />
      );
    } catch (error) {
      console.error("No se puede decodificar la postulación: ", error);
    }
  };

  const goPostulations = () => {
    router.push("/postulation");
  };

  // useEffect
  useEffect(() => {
    listPostulations();
  }, []);

  return (
    <div className="block h-full overflow-y-hidden mt-[-25px] mr-[64px]">
      <NeutralText
        text="Vacantes de Empleo/ Mis Postulaciones"
        className="cf-text-principal-180 font-semibold mb-2"
        fontSize="sm"
      />

      <Greatment
        text={`Mis postulaciones a empleos`}
        className="mb-2 md:mb-2 md:-mt-3"
      />

      <NeutralNCText
        text="Aquí podrás ver todas tus postulaciones a empleos, con detalles del estado de cada aplicación."
        className="cf-text-principal-180"
        fontSize="md"
      />
      <hr className="h-px my-2 bg-gray-700 dark:bg-gray-200" />

      <div className="w-full p-1 "></div>

      <div className="p-2 h-3/4 overflow-y-hidden block">
        <div className="p-2 h-full overflow-y-hidden">
          <div className="h-9/10 max-h-9/10 h-full overflow-y-auto overflow-x-hidden block">
            {" "}
            {/**border-2 border-dotted */}
            {/** Postulation List */}
            {postulationList?.length ? (
              postulationList.map((postulation, idx, arr) => {
                return getJobOfferComponent(idx, postulation);
              })
            ) : (
              <NeutralNCText
                text="No se encuentran registros."
                className="py-10 cf-text-principal-180 text-center block w-full"
                fontSize="md"
              />
            )}
          </div>
          <div className="h-1/9 max-h-1/9 block">
            {" "}
            {/**border-2 border-dotted */}
            <div className="flex w-full justify-end">
              <Button
                label={"Volver al inicio"}
                className="w-56 xl:w-72 self-end"
                primary
                onClick={goPostulations}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto flex items-center">
        <a
          onClick={previousSteep}
          onKeyDown={() => {}}
          className="cursor-pointer"
        >
          <NeutralNCText
            text="Atrás"
            className="cf-text-principal-180 mb-[2rem] md:mb-9"
            fontSize="md"
          />
        </a>
      </div>
    </div>
  );
};

"use client";
import { PsyTestPendingList } from "domain/models/PsyTestResultsType";
import { queryPendingPsyTest } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, CardText, NeutralNCText } from "presentation/components/atoms";
import {
  CardManageSection,
  ListActionCard,
  PsyTestActionCard,
} from "presentation/components/molecules";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const IntroductionPsicometricTest = ({
  setCurrentForm,
}: {
  setCurrentForm: (form: number) => void;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [psyTestCards, setPsyTestCards] = useState<PsyTestPendingList>();

  const handleNextForm = (testAssignationId:string) => {
    setCurrentForm(2);
  };

  const queryPendingPsyTests = async (): Promise<PsyTestPendingList> => {
    const pendingExams = await queryPendingPsyTest(session?.access_token!);

    if (pendingExams && Array.isArray(pendingExams)) {
      if (pendingExams.length) {
        setPsyTestCards(pendingExams);
        return pendingExams;
      }
    } else {
      toast.error("Error al consultar pruebas psicométricas pendientes");
    }
    setPsyTestCards([]);
    return [];
  };

  const previousSteep = () => {
    router.push("/employability");
  };

  useEffect(() => {
    queryPendingPsyTests();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-18rem)] items-center flex flex-col justify-center">
      <form className="flex flex-col w-11/12 xl:w-[874px]">
        <div className="flex flex-col items-center justify-center relative rounded-[1.25rem] bg-principal-150 px-5 lg:px-10 xl:px-16 py-6  mt-16">
          <Image
            src="/icons/employability-route.png"
            alt="Icono de ruta de test psicométrico"
            width={130}
            height={101}
            className="absolute -top-16"
          />
          <h2 className="text-center text-3xl font-bold text-principal-180 w-80 m-4">
            Instrucciones
          </h2>
          <CardText
            text={
              "Recuerde que debe disponer de tiempo para contestar cada una de las 50 preguntas de la evaluación de perfil emprendedor. En cada una de las preguntas, selecciona si para la opción que más se identifique o no en caso contrario."
            }
            className={`text-[1rem] text-justify font-light modalText text-principal-180 mb-3`}
          />
        </div>
        {/* <Button
          label="Siguiente"
          className="w-56 xl:w-72 my-6 self-end"
          primary
          onClick={handleNextForm}
        /> */}
      </form>

      <div className="block my-5 self-start">
          <NeutralNCText
            text="Pruebas asignadas pendientes"
            className="cf-text-principal-180 test-bold mb-[2rem] md:mb-5"
            fontSize="md"
          />
          <CardManageSection>
            {psyTestCards ? (
              psyTestCards.map((card, index, array) => {
                return (
                  <PsyTestActionCard
                    key={"test-card-" + index}
                    name={card.psyTestExamName}
                    action={() => {handleNextForm(card.assignationId)}}
                    width={150}
                    height={130}
                    urlImage={""}
                    imageClassname={"w-[41px] h-[41px] md:ml-8 mx-auto"}
                  />
                );
              })
            ) : (
              <div>
                <span>No se encuentran pruebas programadas pendientes.</span>
              </div>
            )}
          </CardManageSection>
        </div>

      <div className="flex-auto flex my-6 self-start">
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

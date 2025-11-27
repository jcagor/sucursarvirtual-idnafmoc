"use client";
import IsSelfManagementAvailableUseCase from "domain/usecases/Business/IsSelfManagementAvailable.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, CardText, ModalWithChildren } from "presentation";
import { useEffect, useState } from "react";

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const IntroductionSelfManagement: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    isSelfManagementAvailable();
  }, []);

  const isSelfManagementAvailable = async () => {
    const IsSelfManagementAvailable =
      appContainer.get<IsSelfManagementAvailableUseCase>(
        USECASES_TYPES._IsSelfManagementAvailable
      );
    const response = await IsSelfManagementAvailable.execute(
      session?.access_token
    );

    if (response === false) {
      setErrorModal(true);
    }
  };

  const handleNextForm = () => {
    setCurrentForm(2);
  };

  return (
    <div className="w-full h-full items-center flex flex-col">
      <form className="flex flex-col w-11/12 xl:w-[874px]">
        <div className="flex flex-col items-center justify-center relative rounded-[1.25rem] bg-principal-150 px-5 lg:px-10 xl:px-16 py-6  mt-16">
          <Image
            src={"/utopia/icons/empleability-route.png"}
            alt="Image business profile"
            width={130}
            height={101}
            className="absolute -top-16"
          />
          <h2 className="text-center text-3xl font-bold text-principal-180 w-80 m-4">
            Instrucciones
          </h2>
          <CardText
            text={
              "El Análisis Situacional es una herramienta analítica que permite comprender el grado de madurez de las capacidades de su organización relacionadas a la gestión. Esta herramienta le permite identificar a nuestro grupo de expertos cuales son las principales alternativas de implementación de programas de gestión para el mejoramiento de los resultados."
            }
            className={`text-[1rem] text-justify font-light modalText text-principal-180 mb-3`}
          />
          <div className="w-full relative flex flex-row items-center md:justify-center m-2">
            <Image
              src={"/utopia/icons/check.svg"}
              alt="Card ellipse"
              width={35}
              height={35}
              loading="lazy"
              className="pr-4"
            />
            <CardText
              text={
                "Vamos a analizar 6 aspectos fundamentales de la Gestión Empresarial. Recuerde que debe disponer de tiempo suficiente para contestar cada una de las 60 preguntas del analisis situacional. En cada una de las preguntas, selecciona de la lista desplegable la opción que más se identifique con la realidad de tu empresa. Ten en cuenta el parámetro de evaluación propuesto."
              }
              className={`text-[1rem] text-justify font-light modalText text-principal-180`}
            />
          </div>
          <div className="w-full relative flex flex-row items-center md:justify-center m-2">
            <Image
              src={"/utopia/icons/check.svg"}
              alt="Card ellipse"
              width={35}
              height={35}
              loading="lazy"
              className="pr-4"
            />
            <CardText
              text={
                "En cada línea de intervención tendrás la posibilidad de sugerir oportunidades de mejora para implementar en tu empresa. Asegúrate de sugerir hasta 3 oportunidades de mejora por línea de intervención."
              }
              className={`text-[1rem] text-justify font-light modalText text-principal-180`}
            />
          </div>
        </div>
        <Button
          label="Siguiente"
          className="w-56 xl:w-72 my-6 self-end"
          primary
          onClick={handleNextForm}
        />
      </form>
      {errorModal && (
        <ModalWithChildren
          onClose={() => router.push("/")}
          className="w-96 flex flex-col items-center"
        >
          <Image
            src="/utopia/icons/hello_full.png"
            alt="Close icon"
            width={90}
            height={90}
          />
          <p className="text-principal-180 text-center my-4">
            No puede continuar con el proceso de autogestión ya que aun no ha
            pasado el tiempo necesario para realizarlo.
          </p>
          <Button
            label="Continuar"
            onClick={() => {
              router.push("/");
            }}
            className="w-full"
            primary
          />
        </ModalWithChildren>
      )}
    </div>
  );
};

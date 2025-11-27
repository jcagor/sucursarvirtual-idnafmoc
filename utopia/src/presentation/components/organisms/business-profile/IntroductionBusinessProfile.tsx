"use client";
import Image from "next/image";
import { Button, CardText } from "presentation";
interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const IntroductionBusinessProfile: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const handleNextForm = () => {
    setCurrentForm(3);
  };

  return (
    <div className="w-full h-3/4 items-center flex flex-col justify-center">
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
            Diligenciamiento de perfil empresarial
          </h2>
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
                "Debes tener a mano la información de la empresa y, si no eres el representante legal, debes contar con su aval para este diligenciamiento."
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
                "Completa el Perfil Empresarial, es importante que todas las preguntas se encuentren debidamente contestadas, se puede diligenciar con varios colaboradores."
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
    </div>
  );
};

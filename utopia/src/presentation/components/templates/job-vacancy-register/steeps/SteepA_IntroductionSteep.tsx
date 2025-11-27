"use client";
import { FormProps } from "lib/types/form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button, CardText } from "presentation/components/atoms";
import Modal from "presentation/components/atoms/common/modals/Modal";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const IntroductionVacancyRegister: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  previousSteepFn,
  formSelectOptionsFn,
}) => {
  const [errorModal, setErrorModal] = useState(false);

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
            Formulario de Registro de Vacante
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
                "Ten a la mano toda la información de la vacante antes de completar el formulario. " +
                "Si no eres el representante legal de la empresa, asegúrate de contar con la " +
                "autorización para registrar la vacante."
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
                "Completa todos los campos obligatorios para garantizar que tu vacante sea publicada correctamente."
              }
              className={`text-[1rem] text-justify font-light modalText text-principal-180`}
            />
          </div>
        </div>
        <Button
          label="Siguiente"
          className="w-56 xl:w-72 my-6 self-end"
          primary
          onClick={() => {
            nextSteepFn();
          }}
        />
      </form>
      {/* Modal de error */}
      {errorModal && (
        <Modal
          urlImage="/utopia/icons/hello_full.png"
          description="El NIT ingresado no cumple con los requisitos para continuar con el proceso de perfil empresarial. Por favor verifica la información ingresada."
          primaryButtonText="Aceptar"
          onPrimaryClick={() => {
            window.location.href = "https://www.comfandi.com.co/";
          }}
          hideSecondaryButton
        />
      )}
    </div>
  );
};

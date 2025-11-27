"use client";
import { SecondaryTitle } from "@comfanditd/chronux-ui";
import {
  CHECKBOX_VALIDATION_ERROR,
  DIGITAL_IDENTITY_STATUS_MESSAGE,
  USER_AUTHORIZATION,
} from "lib";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Description,
  DigitalIdentityIcon,
  LoadingAnimation,
  useAppSelector,
} from "presentation";
import useTermsAndConditions from "presentation/hooks/useTermsAndConditions";
import { useEffect, useState } from "react";

export default function FaceIdVerificationPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previousValidation, setPreviousValidation] = useState(true);

  const {
    setTermsAndConditionsName,
    initializeTermsAndConditions, // Inicializa términos y valida si ya fueron aceptados
    selectedTerms,
    setSelectedTerms,
    registerUserTerms,
  } = useTermsAndConditions();

  const biometricTermsAccepted = useAppSelector(
    (state) => state.termsAndConditions.bometricTerms
  );

  const identityStatus = useAppSelector(
    (state) => state.digitalIdentity.status
  );

  const validatePageVisibility = () => {
    if (
      biometricTermsAccepted ||
      identityStatus !== DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE
    ) {
      window.location.href = "/";
    }
    setPreviousValidation(false);
  };

  useEffect(() => {
    validatePageVisibility();
  });

  // Inicializamos los términos al cargar la página
  useEffect(() => {
    setTermsAndConditionsName(USER_AUTHORIZATION.biometricTermsAndConditions);
    initializeTermsAndConditions(); // Asegura la carga inicial
  }, [setTermsAndConditionsName, initializeTermsAndConditions]);

  const handleCheckboxChange = (e: any) => {
    setSelectedTerms(e.target.checked);
    setErrorMessage(e.target.checked ? null : CHECKBOX_VALIDATION_ERROR);
  };

  const goToAdo = async () => {
    if (!selectedTerms) {
      setErrorMessage(CHECKBOX_VALIDATION_ERROR); // Si no está marcado, muestra error
      return;
    }

    const success = await registerUserTerms(); // Registra los términos

    if (success) {
      window.location.href = process.env.NEXT_PUBLIC_CALLBACK_ADO || "/"; // Redirige a ADO
    } else {
      setErrorMessage("Error al registrar los términos, intenta nuevamente.");
    }
  };

  if (previousValidation) {
    return <LoadingAnimation className="z-[6000]" />;
  }

  return (
    <div className="w-screen h-screen flex">
      <div className="hidden md:block w-[45%] h-full bg-principal-180 rounded-tr-2xl rounded-br-2xl relative">
        <Link
          href={"/"}
          className="text-[0.75rem] flex items-center space-x-2 ml-12 mt-12 cursor-pointer text-[#fbfbfb]"
        >
          <Image
            src={"/icons/white-left-arrow.svg"}
            alt="Left arrow"
            width={13.33}
            height={11}
            className="mr-2"
            draggable={false}
          />
          Volver
        </Link>
        <Image
          src={"/icons/letter-a-vector.svg"}
          alt="Decoration vector"
          width={150}
          height={150}
          className="absolute left-0 bottom-0 w-[35rem]"
          draggable={false}
        />
        <Image
          src={"/icons/digital-identity-validation.webp"}
          alt="Woman image"
          width={150}
          height={150}
          className="absolute -right-28 bottom-0 w-[30rem] 3xl:-right-36 3xl:w-[55%]"
          quality={100}
          priority
          draggable={false}
          unoptimized
        />
      </div>
      <div className="w-full md:w-[55%] h-full flex flex-col items-center md:justify-center">
        <Link className="cursor-pointer" href={"/"}>
          <Image
            src={"/icons/comfandi-logo-2024.svg"}
            alt="Comfandi logo"
            width={143}
            height={68.18}
            className="absolute right-6 top-6 w-[8.938rem] h-[4.261rem]"
            draggable={false}
          />
        </Link>
        <div className="w-[85%] mt-40 md:w-[55%] md:mt-0">
          <div className="w-full flex justify-center md:hidden">
            <DigitalIdentityIcon className="-mt-10 mb-6 w-32" />
          </div>
          <SecondaryTitle
            text="Verificación Face ID"
            className="text-[1.8rem] md:text-[2.5rem] font-bold ml-0 pl-0"
          />
          <Description
            className="text-principal-180 mt-8 leading-[21.6px]"
            text="Con esta foto verificaremos tu identidad, no te preocupes, será solo una vez para tu proceso de registro. *Asegúrate de tener tu documento a la mano, recuerda que debe ser el original.*"
          />

          <span className="mt-6 mb-4 flex items-center">
            <input
              type="checkbox"
              checked={selectedTerms}
              onChange={handleCheckboxChange}
              className="w-8 h-8 md:w-6 md:h-6 cursor-pointer checked:bg-principal-180"
            />
            <div>
              <Link
                href={
                  "https://www.comfandi.com.co/personas/autorizacion-tratamiento-de-datos-personales-biometricos"
                }
                target="_blank"
              >
                <div className="flex">
                  <label className="text-[0.7rem] md:text-[0.8rem] text-justify ml-4 leading-[1rem] md:ml-2 md:leading-[1.2rem] font-normal text-principal-180 pt-0">
                    Al dar clic, declaro que he leído, acepto y permito el{" "}
                    <span className="font-semibold">
                      tratamiento de mis datos biométricos.
                    </span>
                  </label>
                </div>
              </Link>
            </div>
          </span>

          {errorMessage && (
            <label className="text-[0.7rem] text-justify leading-[1rem] md:text-[0.813rem] md:leading-[1.2rem] font-semibold text-principal-500 pt-0">
              {errorMessage}
            </label>
          )}

          <Button
            label="Iniciar validación"
            className="font-outfit w-full md:w-[18rem] font-medium mt-4"
            onClick={() => {
              if (
                biometricTermsAccepted ||
                identityStatus !== DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE
              ) {
                window.location.href = "/";
              } else {
                goToAdo();
              }
            }} // Llama a la función que valida y registra
            primary
          />
        </div>
      </div>
    </div>
  );
}

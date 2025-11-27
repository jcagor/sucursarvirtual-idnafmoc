"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import Image from "next/image";
import {
  Button,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";
import { useState } from "react";
import { ImageUploader } from "presentation/components/molecules/ImageUploader";
import {
  DataCheckbox,
  TermsCheckbox,
} from "presentation/components/atoms/common/checkboxes";

interface DigitalSignatureProps {
  courseSheeduleId: string;
  setCurrentForm: (page: number) => void;
  createCourseRegistration: () => void;
}

export const DigitalSignature: React.FC<DigitalSignatureProps> = ({
  courseSheeduleId,
  setCurrentForm,
  createCourseRegistration,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataAccepted, setDataAccepted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSign = () => {
    if (!imagePreview) {
      setValidationError("Debes cargar una imagen de firma para continuar");
      return;
    }

    if (!termsAccepted) {
      setValidationError("Debes aceptar los términos y condiciones");
      return;
    }

    setValidationError(null);
    setOpenModal(true);
  };

  const previousForm = () => {
    setCurrentForm(2);
  };

  const confirmModal = () => {
    setOpenModal(false);
    createCourseRegistration();
  };

  const isFormValid = imagePreview && termsAccepted;

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Firma Digital " />
      <SecondaryText text="Revise la información del entrenamiento y confirme la asignación de sus trabajadores mediante firma digital." />
      <SectionSeparator />

      <ImageUploader
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
        isDisabled={!termsAccepted}
        disabledMessage="Debes aceptar los términos y condiciones para cargar una firma"
        enabledMessage="Haz clic o arrastra tu firma aquí"
      />

      <div className="flex flex-col gap-4 w-full py-4">
        <TermsCheckbox checked={termsAccepted} onChange={setTermsAccepted} />
        {/* <DataCheckbox checked={dataAccepted} onChange={setDataAccepted} />
        {validationError && (
          <p className="text-principal-500 text-principal-450 text-sm mt-2">
            {validationError}
          </p>
        )} */}
      </div>

      <div className="w-full items-center justify-between flex py-2">
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
        <div className="gap-2 flex py-2">
          <button
            className={`w-[180px] h-[50px] rounded-full ${
              !imagePreview
                ? "bg-principal-300 text-principal-450 cursor-not-allowed"
                : "bg-principal-500 text-principal-150 hover:bg-principal-500/90"
            }`}
            onClick={() => setImagePreview(null)}
            disabled={!imagePreview}
          >
            Borrar
          </button>
          <Button
            label="Firmar"
            className={`${
              !isFormValid
                ? "opacity-50 cursor-not-allowed bg-principal-300"
                : ""
            }`}
            primary
            onClick={handleSign}
            disabled={!isFormValid}
          />
        </div>
      </div>

      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          className={`md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/utopia/icons/campaign-alert.png"
            alt="Close icon"
            width={80}
            height={80}
            className={`cursor-pointer`}
            priority
          />
          <ModalTitle text="¡Firma registrada con éxito!" className="mt-2" />
          <div className="text-principal-450 text-center">
            Tu firma ha sido registrada correctamente. Se ha enviado una
            notificación al trabajador confirmando su inscripción en el
            entrenamiento.
          </div>
          <div className="flex flex-col w-[70%] space-y-3 py-2">
            <Button
              label="Continuar"
              onClick={confirmModal}
              className="w-full"
              primary
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClose, children, className }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-principal-50 bg-opacity-30 `}
      onClick={onClose}
      onKeyDown={(e) => {}}
    >
      <div
        className={`bg-principal-150 p-6 rounded-lg shadow-lg w-96 ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {}}
      >
        {children}
      </div>
    </div>
  );
};

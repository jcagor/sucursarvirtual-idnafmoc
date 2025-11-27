import { useRouter } from "next/navigation";
import { Button } from "presentation/components/atoms";
import { CustomModal } from "presentation/components/atoms/common/modals";
import { useRnec } from "presentation/hooks";
import { useAppSelector } from "presentation/store";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ModalRnec = ({
  url,
  handleContinue = () => {},
  showErrorMessage = false,
}: {
  url: string;
  handleContinue?: () => void;
  showErrorMessage?: boolean;
}) => {
  const { openModal, openModalErrorMessage } = useRnec();
  const onOpenModal = useAppSelector((state) => state.rnec.onOpenModal);
  const onOpenModalErrorMessage = useAppSelector(
    (state) => state.rnec.onOpenModalErrorMessage
  );
  const dataRnec = useAppSelector((state) => state.rnec.dataRnec);
  const [showValidationError, setShowValidationError] = useState(false);

  const router = useRouter();

  const handleOpenModal = (val: boolean) => {
    openModal(val);
    if (!val) {
      setShowValidationError(false);
      router.push(url);
    }
  };

  const handleOpenModalErrorMessage = (val: boolean) => {
    openModalErrorMessage(val);
    if (!val) {
      router.push(url);
    }
  };

  const handleDataIncorrect = () => {
    setShowValidationError(true);
  };

  const handleContinueModal = () => {
    openModal(false);
    if (handleContinue) {
      handleContinue();
    }
  };

  if (showErrorMessage && onOpenModalErrorMessage) {
    return (
      <CustomModal
        key="modal-employability"
        open={onOpenModalErrorMessage}
        setOpen={handleOpenModalErrorMessage}
        lock={true}
        containerClass="w-full max-w-[700px] p-4 md:p-8"
      >
        <div className="w-full flex justify-end">
          <IoMdClose
            className="text-principal-180 text-2xl cursor-pointer hover:text-principal-100 transition-all duration-300"
            onClick={() => handleOpenModalErrorMessage(false)}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-center text-principal-180 text-2xl font-medium">
              No es posible realizar la solicitud en este momento. Por favor
              intente en unos minutos.
            </h3>
          </div>
          <Button
            label="Salir"
            primary
            primaryClass="bg-principal-700 text-principal-150 w-full md:w-80 px-4 md:px-12"
            onClick={() => handleOpenModalErrorMessage(false)}
            removeWidth
          />
        </div>
      </CustomModal>
    );
  }

  return (
    <CustomModal
      key="modal-employability"
      open={onOpenModal}
      setOpen={handleOpenModal}
      lock={true}
      containerClass="w-full max-w-[700px] p-4 md:p-8"
    >
      <div className="w-full flex justify-end">
        <IoMdClose
          className="text-principal-180 text-2xl cursor-pointer hover:text-principal-100 transition-all duration-300"
          onClick={() => handleOpenModal(false)}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {!showValidationError ? (
          <>
            <h2 className="text-principal-180 text-xl md:text-2xl font-semibold text-center">
              ¿La información es correcta?
            </h2>
            <div className="w-full max-w-[500px] bg-principal-180/10 rounded-lg p-4 my-4">
              <div className="flex flex-col gap-2">
                <p className="text-principal-180 text-base">
                  <span className="font-semibold">Nombre completo:</span>{" "}
                  {[
                    dataRnec?.primerNombre,
                    dataRnec?.segundoNombre,
                    dataRnec?.primerApellido,
                    dataRnec?.segundoApellido,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </p>
                <p className="text-principal-180 text-base">
                  <span className="font-semibold">Fecha de nacimiento:</span>{" "}
                  {dataRnec?.fechaNacimiento
                    ? new Date(dataRnec.fechaNacimiento).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center gap-4 px-4 md:px-0">
              <Button
                label="No"
                primary
                primaryClass="bg-principal-500 text-principal-150 w-full md:w-80 px-4 md:px-12"
                onClick={handleDataIncorrect}
                removeWidth
              />
              <Button
                label="Sí"
                primary
                primaryClass="bg-principal-700 text-principal-150 w-full md:w-80 px-4 md:px-12"
                onClick={handleContinueModal}
                removeWidth
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-principal-180 text-xl md:text-2xl font-semibold text-center">
              Información incorrecta
            </h2>
            <h3 className="text-principal-180 max-w-[500px] text-center font-light my-6 md:my-10 text-sm md:text-base">
              La información registrada presenta inconsistencia debe validarse
              en registraduría
            </h3>
            <div className="w-full flex justify-center">
              <Button
                label="Salir"
                primary
                primaryClass="bg-principal-700 text-principal-150 w-full md:w-80 px-4 md:px-12"
                onClick={() => handleOpenModal(false)}
                removeWidth
              />
            </div>
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default ModalRnec;

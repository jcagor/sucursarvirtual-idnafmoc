import Image from "next/image";
import React, { FC, useState } from "react";
import { Button, CardDescription, Spinner } from "presentation";
import { motion, AnimatePresence } from "framer-motion";
import { ModalTitle } from "./text/ModalTitle";

interface Props {
  urlImage?: string;
  title?: string;
  description: string;
  loading?: boolean;
  containerClass?: string;
  imageClass?: string;
  titleClass?: string;
  imageWidth?: number;
  primaryButtonText?: string;
  SecondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  hideSecondaryButton?: boolean;
  lockModal?: boolean;
}

// Función que convierte el texto con * * en partes estilizadas
const formatDescription = (text: string) => {
  return text.split(/\n+/).map((line, index) => (
    <span key={"nt-gen-"+index} className="mb-2">
      {line.split(/(\*[^*]+\*)/).map((part, subIndex) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={"ft-gen-"+subIndex} className="font-semibold">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        )
      )}
    </span>
  ));
};

const Modal: FC<Props> = ({
  urlImage = "/icons/modal-man.svg",
  title,
  description,
  loading = false,
  containerClass,
  imageClass,
  titleClass,
  imageWidth = 90,
  primaryButtonText = "Reintentar",
  SecondaryButtonText = "Cancelar",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
  hideSecondaryButton = false,
  lockModal = false,
}) => {
  const [visible, setVisible] = useState(true);

  const handlePrimaryClick = () => {
    onPrimaryClick();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick();
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div
          className={`w-screen h-screen absolute top-0 left-0 z-[90000] flex justify-center items-center bg-principal-800`}
          onClick={() => {
            !loading && !lockModal ? handleSecondaryClick() : null;
          }}
        >
          <AnimatePresence>
            <motion.div
              key={"sucursalmodal"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className={`relative md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 ${containerClass} subpixel-antialiased`}
              onClick={(e) => e.stopPropagation()}
            >
              {!loading && !lockModal && (
                <Image
                  src="/icons/close-icon.svg"
                  alt="Close icon"
                  width={25}
                  height={25}
                  className={`absolute top-4 right-4 cursor-pointer ${
                    loading ? "hidden" : ""
                  }`}
                  onClick={handleSecondaryClick}
                  priority
                />
              )}
              {urlImage && (
                <Image
                  src={urlImage}
                  alt="Modal Image"
                  width={imageWidth}
                  height={imageWidth}
                  className={`pt-6 ${imageClass} antialiased crisp-edges`}
                  draggable={false}
                  quality={100}
                  priority
                  unoptimized
                />
              )}
              {title && <ModalTitle text={title} className={`${titleClass}`} />}
              <p
                className={`font-outfit text-[1rem] w-[70%] px-4 text-justify font-light modalText text-principal-180 ${
                  !title && "mt-4"
                }`}
              >
                {formatDescription(description)}
              </p>
              {loading && (
                <div className="pt-8 pb-6">
                  <Spinner />
                </div>
              )}
              {!loading && (
                <div className="flex flex-col w-[70%] space-y-3 mt-6 pb-8">
                  <Button
                    label={primaryButtonText}
                    onClick={handlePrimaryClick}
                    className="w-full"
                    primary
                  />
                  {!hideSecondaryButton && (
                    <Button
                      label={SecondaryButtonText}
                      onClick={handleSecondaryClick}
                      className="w-full"
                    />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default Modal;

import Image from "next/image";
import React, { FC, useState } from "react";
import { Button, Spinner } from "presentation";
import { motion, AnimatePresence } from "framer-motion";
import { ModalTitle } from "./text/ModalTitle";

interface Props {
  urlImage?: string;
  title?: string;
  description: string;
  loading?: boolean;
  loadingMessage?: string;
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
    <span key={"nt-gen-" + index} className="mb-2">
      {line.split(/(\*[^*]+\*)/).map((part, subIndex) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={"ft-gen-" + subIndex} className="font-semibold">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        )
      )}
    </span>
  ));
};

const ModalEmployability: FC<Props> = ({
  urlImage = "/img/hello_full.png",
  title,
  description,
  loading = false,
  loadingMessage = "",
  containerClass,
  imageClass,
  titleClass,
  imageWidth = 147,
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

  const handleMainClick = () => {
    if (!loading && !lockModal) {
      handleSecondaryClick();
    }
  };

  return (
    <>
      {visible && (
        <div
          className={`w-screen h-screen absolute top-0 left-0 z-[90000] flex justify-center items-center bg-principal-800`}
          onClick={handleMainClick}
          onKeyDown={() => {}}
          role="button"
        >
          <AnimatePresence>
            <motion.div
              key={"sucursalmodal"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className={`relative md:w-[763px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 ${containerClass} subpixel-antialiased`}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={() => {}}
              role="button"
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
                  onKeyDown={() => {}}
                  role="button"
                  priority
                />
              )}
              {urlImage && (
                <Image
                  src={urlImage}
                  alt="Modal Image"
                  width={imageWidth}
                  height={200}
                  className={`${imageClass} mt-[-59px] antialiased crisp-edges`}
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
                <div className="w-full flex justify-center items-center">
                  <div className="flex justify-center items-center w-[70%] space-y-3 pt-8 pb-6">
                    <Spinner />
                  </div>
                </div>
              )}
              {!loading && (
                <div className="flex flex-col w-[70%] space-y-3 mt-6 pb-8">
                  <Button
                    label={primaryButtonText}
                    onClick={handlePrimaryClick}
                    onKeyDown={() => {}}
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

export default ModalEmployability;

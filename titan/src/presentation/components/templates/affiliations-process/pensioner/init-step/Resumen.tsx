"use client";
import { jwtDecode } from "jwt-decode";
import { UserDataInterface } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import {
  Button,
  CardText,
  CustomInputGray,
  MainTitle,
  SectionSeparator,
} from "presentation/components/atoms";
import { CustomModal } from "presentation/components/atoms/common/modals";
import { useEffect, useState } from "react";
import { usePensionerAffiliations } from "presentation/hooks";
import { appContainer } from "infrastructure/ioc/inversify.config";
import GetDocumentTypeUseCase from "domain/usecases/documentType/getDocumentType.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

const Resumen = () => {
  const { data: session } = useSession();
  const { startProcess, resetProcess } = usePensionerAffiliations();
  const router = useRouter();
  const decodedToken: UserDataInterface = jwtDecode(session?.access_token!);
  const getDocumentTypeUseCase = appContainer.get<GetDocumentTypeUseCase>(
    USECASES_TYPES._GetDocumentTypeUseCase
  );

  // State modal
  const [openModal, setOpenModal] = useState(false);
  const [documentName, setDocumentName] = useState("");

  // Handlers
  const handleOpenModal = (val: boolean) => {
    setOpenModal(val);
  };

  const getDocumentType = async () => {
    const documentType = await getDocumentTypeUseCase.execute(
      session?.access_token
    );
    const findDocumentType = documentType?.find(
      (document) => document.shorthand == decodedToken.identification_type
    );
    setDocumentName(findDocumentType?.name ?? "");
  };

  const nextStep = () => {
    handleOpenModal(true);
  };

  const handleConfirmData = () => {
    handleOpenModal(false);
    startProcess(
      decodedToken.identification_type,
      decodedToken.identification_number,
      documentName
    );
    router.push("/menu-affiliations/pensioner/validate-data"); // Ajusta esta ruta según tu estructura de navegación
  };

  useEffect(() => {
    resetProcess();
    getDocumentType();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-6 md:gap-12 mb-6 md:mb-12">
          <CardText
            text="Afiliaciones / afiliación pensionado"
            className="text-principal-180 text-xl md:text-2xl"
          />
          <MainTitle text="Afiliación pensionado" />
          <SectionSeparator />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-10 md:gap-20">
          <div className="w-full max-w-[912px] bg-principal-150 flex flex-col gap-6 md:gap-12 px-4 md:px-16 py-6 md:py-12 rounded-3xl shadow-lg">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-principal-180 text-xl md:text-2xl font-semibold text-center">
                Para empezar ¿Cuál es tu tipo y
              </h2>
              <h2 className="text-principal-180 text-xl md:text-2xl font-semibold text-center">
                número de identificación?
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full mb-6 md:mb-10">
              <CustomInputGray
                title="Tipo de identificación"
                disabled={true}
                classNameContainer="w-full md:w-96"
                value={decodedToken.identification_type}
              />
              <CustomInputGray
                title="Número de identificación"
                disabled={true}
                classNameContainer="w-full md:w-96"
                value={decodedToken.identification_number}
              />
            </div>
          </div>
          <div className="w-full max-w-[912px] flex justify-end px-4 md:px-0">
            <Button
              label="Siguiente"
              primary={true}
              className="w-full md:w-96"
              onClick={nextStep}
            />
          </div>
        </div>
      </div>
      <CustomModal
        key="modal-employability"
        open={openModal}
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
          <Image
            src="/icons/comprobacion.png"
            alt="modal-employability"
            width={80}
            height={80}
            className="w-16 h-16 md:w-[100px] md:h-[100px]"
          />
          <h2 className="text-principal-180 text-xl md:text-2xl font-semibold text-center">
            Confirma tu identidad
          </h2>
          <h3 className="text-principal-180 max-w-[450px] text-center font-light my-6 md:my-10 text-sm md:text-base">
            Se realizará la afiliación para el número de documento{" "}
            <span className="font-semibold">
              {decodedToken.identification_number}
            </span>{" "}
            ¿Es correcto?
          </h3>
          <div className="w-full flex flex-col md:flex-row justify-center gap-4 px-4 md:px-0">
            <Button
              label="Los datos son incorrectos"
              primary
              primaryClass="bg-principal-500 text-principal-150 w-full md:w-80 px-4 md:px-12"
              onClick={() => handleOpenModal(false)}
              removeWidth
            />
            <Button
              label="Los datos son correctos"
              primary
              primaryClass="bg-principal-700 text-principal-150 w-full md:w-80 px-4 md:px-12"
              onClick={handleConfirmData}
              removeWidth
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default Resumen;

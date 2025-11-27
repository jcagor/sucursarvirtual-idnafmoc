import { AFFILIATIONS_PENSIONER_FLOW_URL } from "lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Card } from "presentation/components/atoms";
import { CustomModal } from "presentation/components/atoms/common/modals";
import { usePensionerAffiliations } from "presentation/hooks";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Pensioner1643 = () => {
  const router = useRouter();
  const { saveFlowUrl } = usePensionerAffiliations();

  // State modal
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleOpenModal = (val: boolean) => {
    setOpenModal(val);
  };

  const handleSelectEntity = () => {
    if (isLoading) return;
    setIsLoading(true);
    saveFlowUrl(
      AFFILIATIONS_PENSIONER_FLOW_URL("pensioner-1643"),
      "pensioner-1643"
    );
    router.push("/menu-affiliations/pensioner/pensioner-1643/complete-information");
  };

  return (
    <React.Fragment>
      <Card className="flex flex-col justify-between items-center h-[600px] max-w-96 py-6">
        <div className="flex flex-col items-center w-full flex-1">
          <div className="flex items-center justify-center h-[160px] w-full">
            <Image
              src="/icons/ilustracion-3d-hombre-negocios-gafas.svg"
              alt="pensionado-ley-1643"
              width={160}
              height={160}
            />
          </div>
          <div className="w-full mt-6">
            <h3 className="text-principal-180 font-semibold text-center leading-tight min-h-[48px] max-h-[56px] flex items-center justify-center">
              Pensionado ley 1643
            </h3>
          </div>
          <div className="w-full mt-6">
            <p className="px-8 text-center min-h-[60px] max-h-[160px] overflow-hidden flex items-center justify-center">
              Pensionados con mesada pensional inferior a 1.5 salarios (SMLV).
              Aportan 0%. Tienes derecho a servicios de recreación, deporte y
              turismo. Beneficio válido si tu última caja fue Comfandi.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-2 mt-4">
          <Button
            label={isLoading ? "Cargando..." : "Seleccionar"}
            primary
            primaryClass="bg-principal-700 text-principal-150 w-80 px-12 my-4"
            onClick={handleSelectEntity}
            removeWidth
          />
          <button
            className="text-principal-180 text-sm font-semibold underline"
            onClick={() => handleOpenModal(true)}
          >
            Ver documentos para afiliación
          </button>
        </div>
      </Card>
      <CustomModal
        key="modal-employability"
        open={openModal}
        setOpen={handleOpenModal}
        lock={true}
        containerClass="w-full max-w-[700px] px-16 py-8"
      >
        <div className="w-full flex justify-end">
          <IoMdClose
            className="text-principal-180 text-2xl cursor-pointer hover:text-principal-100 transition-all duration-300"
            onClick={() => handleOpenModal(false)}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <h3 className="text-principal-180 text-2xl font-semibold text-center">
            Para completar tu proceso debes tener los siguientes documentos
            soporte en PDF, JPG o en foto, y deben pesar máximo 5 MB:
          </h3>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center gap-2">
              <div className="w-10 h-10 bg-principal-180 rounded-full flex items-center justify-center">
                <Image
                  src="/icons/card_id_icon.svg"
                  alt="card_id_icon"
                  width={25}
                  height={25}
                />
              </div>
              <h3 className="text-principal-180 text-lg font-normal">
                Documento de identidad.
              </h3>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="w-10 h-10 bg-principal-180 rounded-full flex items-center justify-center">
                <Image
                  src="/icons/paper_icon.svg"
                  alt="paper_icon"
                  width={22}
                  height={22}
                />
              </div>
              <h3 className="text-principal-180 text-lg font-normal">
                Resolución de la pensión.
              </h3>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="w-10 h-10 bg-principal-180 rounded-full flex items-center justify-center">
                <Image
                  src="/icons/paper_cash_icon.svg"
                  alt="paper_icon"
                  width={22}
                  height={22}
                />
              </div>
              <h3 className="text-principal-180 text-lg font-normal max-w-[500px]">
                Último recibo de mesada que muestre el valor de pensión sin
                deducciones.
              </h3>
            </div>
          </div>
          <div className="w-full flex justify-center gap-4">
            <Button
              label="Aceptar"
              primary
              primaryClass="bg-principal-700 text-principal-150 w-80 px-12"
              onClick={() => handleOpenModal(false)}
              removeWidth
            />
          </div>
        </div>
      </CustomModal>
    </React.Fragment>
  );
};

export default Pensioner1643;

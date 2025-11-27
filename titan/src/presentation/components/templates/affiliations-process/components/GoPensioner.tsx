import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { appContainer } from "infrastructure/ioc/inversify.config";
import RightsVerifyUseCase from "domain/usecases/rightsChecker/rightsVerify.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { RightsVerifyInterface } from "domain/models";
import {
  AFFILIATIONS_PENSIONER_MESSAGE_TYPE,
  CAMPAIGN_ID_AFFILIATIONS_1643,
  CAMPAIGN_ID_AFFILIATIONS_25_ANIOS,
  CAMPAIGN_ID_AFFILIATIONS_APORTANT,
  CAMPAIGN_ID_INDEPENDENT,
  identificationTypeNomenclature,
  UserDataInterface,
} from "lib";
import { CustomModal } from "presentation/components/atoms/common/modals";
import { IoMdClose } from "react-icons/io";
import FindAllRequestsUseCase from "domain/usecases/request/findAllRequests.use.case";
import { jwtDecode } from "jwt-decode";
import { ActionMenuCard } from "presentation/components/molecules/common/cards/ActionMenuCard";

const GoPensioner = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const decodedToken: UserDataInterface = jwtDecode(session?.access_token!);

  // ---- states
  const [isLoadingPensioner, setIsLoadingPensioner] = useState(false);
  const [messagePensioner, setMessagePensioner] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // ---- use cases
  const findAllRequestsCase = appContainer.get<FindAllRequestsUseCase>(
    USECASES_TYPES._FindAllRequestsTypesUseCase
  );
  const verifyRightsCase = appContainer.get<RightsVerifyUseCase>(
    USECASES_TYPES._RightsVerifyUseCase
  );

  const handleOpenModal = (val: boolean) => {
    setOpenModal(val);
  };

  const handlerPensioner = async () => {
    if (isLoadingPensioner) return;
    setIsLoadingPensioner(true);
    try {
      const requestsOnProcess = await findAllRequestsCase.execute(
        session?.access_token,
        undefined,
        undefined,
        {
          documentType: decodedToken?.identification_type,
          document: decodedToken?.identification_number,
          status: "4",
        }
      );
      const requestsOnRadicate = await findAllRequestsCase.execute(
        session?.access_token,
        undefined,
        undefined,
        {
          documentType: decodedToken?.identification_type,
          document: decodedToken?.identification_number,
          status: "1",
        }
      );
      if (requestsOnProcess && requestsOnProcess?.trecords > 0) {
        const findByCampaign = requestsOnProcess?.requests.filter(
          (request) =>
            request.campaignId === CAMPAIGN_ID_INDEPENDENT ||
            request.campaignId === CAMPAIGN_ID_AFFILIATIONS_APORTANT ||
            request.campaignId === CAMPAIGN_ID_AFFILIATIONS_25_ANIOS ||
            request.campaignId === CAMPAIGN_ID_AFFILIATIONS_1643
        );
        if (findByCampaign.length > 0) {
          setMessagePensioner(
            `Ya tienes la solicitud #${findByCampaign[0]?.radicate} en estado ${findByCampaign[0]?.status?.name}`
          );
          handleOpenModal(true);
          return;
        }
      }
      if (requestsOnRadicate && requestsOnRadicate?.trecords > 0) {
        const findByCampaign = requestsOnRadicate?.requests.filter(
          (request) =>
            request.campaignId === CAMPAIGN_ID_INDEPENDENT ||
            request.campaignId === CAMPAIGN_ID_AFFILIATIONS_APORTANT ||
            request.campaignId === CAMPAIGN_ID_AFFILIATIONS_25_ANIOS ||
            request.campaignId === CAMPAIGN_ID_AFFILIATIONS_1643
        );
        if (findByCampaign.length > 0) {
          setMessagePensioner(
            `Ya tienes la solicitud #${findByCampaign[0]?.radicate} en estado ${findByCampaign[0]?.status?.name}`
          );
          handleOpenModal(true);
          return;
        }
      }
      const documentTitularToken = decodedToken?.identification_number;
      //TESTING
      // const documentTitularToken = "1144052823"; //independent
      // const documentTitularToken = "14991820"; //pensioner
      // const documentTitularToken = "31957744"; //pensioner25
      // const documentTitularToken = "31939553"; //pensioner1643
      // const documentTitularToken = "86076434"; //retirado
      // const documentTitularToken = "1006010887"; //afiliado
      //const documentTitularToken = "1000887"; //no existe
      const typeDocumentTitularToken = identificationTypeNomenclature(
        decodedToken?.identification_type
      );
      const verifyRightsResponse: RightsVerifyInterface | undefined =
        await verifyRightsCase.execute(
          documentTitularToken,
          typeDocumentTitularToken!,
          session?.access_token
        );
      if (!verifyRightsResponse) {
        router.push("/");
        return;
      }
      const documentTitularResponse =
        verifyRightsResponse?.TitularNumeroDocumento;
      if (
        verifyRightsResponse?.TitularPrimerNombre != null &&
        documentTitularResponse !== documentTitularToken
      ) {
        return router.push("/menu-affiliations/pensioner");
      } else if (
        verifyRightsResponse?.TitularPrimerNombre != null &&
        (verifyRightsResponse.TitularFechaFinVigencia === null ||
          verifyRightsResponse.TitularFechaFinVigencia === "" ||
          verifyRightsResponse.TitularFechaFinVigencia === "9999-12-31")
      ) {
        const message =
          AFFILIATIONS_PENSIONER_MESSAGE_TYPE[
            verifyRightsResponse.TitularGrupoAfiliado! as keyof typeof AFFILIATIONS_PENSIONER_MESSAGE_TYPE
          ];
        setMessagePensioner(message);
        handleOpenModal(true);
        return;
      }

      router.push("/menu-affiliations/pensioner");
    } catch (error) {
      console.log(error);
      setMessagePensioner(
        "Error al verificar los datos, por favor intente nuevamente"
      );
    } finally {
      setIsLoadingPensioner(false);
    }
  };

  return (
    <React.Fragment>
      <ActionMenuCard
        height={80}
        width={80}
        action={handlerPensioner}
        urlImage={"/icons/fiscal_icon.svg"}
        name={"Afíliate como pensionado"}
        loading={isLoadingPensioner}
      />

      <CustomModal
        key="modal-employability"
        open={openModal}
        setOpen={handleOpenModal}
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
            {messagePensioner}
          </h3>
        </div>
      </CustomModal>
    </React.Fragment>
  );
};

export default GoPensioner;

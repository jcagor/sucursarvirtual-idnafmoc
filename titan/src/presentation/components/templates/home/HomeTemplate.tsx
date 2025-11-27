"use client";
import {
  AffiliateTemplate,
  Description,
  LinkCard,
  useBetaAccess,
  WelcomeHome,
  ZoneCard,
} from "presentation";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import React, { useEffect, useState } from "react";
import {
  APORTANT_COMPANY_RETIR_STATUS,
  DEATH_PAC,
  DIGITAL_IDENTITY_STATUS_MESSAGE,
  homeMenuItems,
  MPAC_USER_STATUS_MESSAGE,
  SISE_USER_STATUS_MESSAGE,
  MPAC_API_USER_TYPE,
  MPAC_API_USER_REQUIREMENT_STATUS,
  HOME_ERROR_NOT_REGISTERED,
  HOME_ERROR_INVALID_STATUS,
  BETA_ACCESS,
  HOME_ERROR_NOT_MEET_REQUIREMENTS,
  FOSPEC_USER_STATUS_MESSAGE,
  MPAC_API_USER_TYPE_ENUM,
  HOME_ERROR_FOMENTO_NO_MEET,
  MPAC_API_USER_REQUIREMENT_STATUS_CODE_ENUM,
  MPAC_API_USER_REQUIREMENT_STATUS_ENUM,
  MPAC_API_RESULT_CODE_ENUM,
} from "lib/config/constants";
import { ActionMenuCard } from "presentation/components/molecules/common/cards/ActionMenuCard";
import { useAppDispatch, useAppSelector } from "presentation/store"; // Ajusta el path según tu estructura
import { DIGITAL_IDENTITY_FF } from "lib/config/flags";
import { useRouter } from "next/navigation";
import Modal from "presentation/components/atoms/common/modals/Modal";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import {
  Conditional,
  identificationTypeNomenclature,
  queryFomentoMeetValidator,
  queryJupiterValidator,
  queryMpacValidation,
  querySiseValidation,
  saveMpacValidationHistory,
  SiseUnregisteredUser,
  UserDataInterface,
  UserMpacDataInterface,
} from "lib";
import RightsVerifyUseCase from "domain/usecases/rightsChecker/rightsVerify.use.case";
import SaveSiseAbsentUser from "domain/usecases/userData/saveSiseAbsentUser.usecase";
import ModalSise from "presentation/components/atoms/common/modals/ModalSise";
import { setSapRightsState } from "presentation/store/sapRights/sapRightsSlice";
import ModalEmployability from "presentation/components/atoms/common/modals/ModalEmployability";
import {
  setMpacDataSelected,
  setServerResponse,
} from "presentation/store/mpacStatus/mpacStatusSlice";
import { JUPITER_STATUS } from "domain/models/jupiterResultsType";

// Componente HomeTemplate
export const HomeTemplate = () => {
  // Estado local de 'status', inicializado en "LOADING"
  const [status, setStatus] = useState<string>("LOADING");
  const [loadingUserValidation, setLoadingUserValidation] = useState(false);

  const dispatch = useAppDispatch();

  const verifyRightsCase = appContainer.get<RightsVerifyUseCase>(
    USECASES_TYPES._RightsVerifyUseCase
  );

  // Obtenemos el estado desde Redux
  const reduxStatus = useAppSelector((state) => state.digitalIdentity.status);

  // Definimos el valor que indica el estado COMPLETO
  const statusComplete = DIGITAL_IDENTITY_STATUS_MESSAGE.COMPLETE;

  // Estado local para manejar la visibilidad del modal
  const [mpacLoadingModal, setMpacLoadingModal] = useState(false);

  const [modalIdentity, setModalIdentity] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [affiliation, setAffiliation] = useState(false);

  const [siseModal, setSiseModal] = useState(false);
  const [siseModalMessage, setSiseModalMessage] = useState("");

  const [fomentoModal, setFomentoModal] = useState(false);
  const [fomentoModalMessage, setFomentoModalMessage] = useState("");

  const [mpacModalError, setMpacModalError] = useState(false);
  const [mpacModalMessage, setMpacModalMessage] = useState("");

  const [jupiterModal, setJupiterModal] = useState(false);
  const [jupiterModalMessage, setJupiterModalMessage] = useState("");

  //Router para navegacion
  const router = useRouter();
  const { data: session } = useSession();
  const visible = true;
  // const visible = useBetaAccess(BETA_ACCESS);

  const getInfo = async () => {
    dispatch(setSapRightsState(undefined));
    setAffiliation(false);
    let { identification_number, identification_type } = jwtDecode(
      session?.access_token!
    ) as UserDataInterface;
    const identificationType =
      identificationTypeNomenclature(identification_type);
    if (!identificationType) {
      return;
    }
    //TESTING
    // identification_number = "1144052823"; //independent
    // identification_number = "14991820"; //pensioner
    // identification_number = "31957744";//pensioner25
    // identification_number = "31939553"; //pensioner1643
    // identification_number = "86076434";//retirado
    // identification_number = "1006010887"; //afiliado
    // identification_number = "1000887"; //no existe

    const result = await verifyRightsCase.execute(
      identification_number,
      identificationType,
      session?.access_token
    );
    // //test
    // console.log(result);
    if (!result) {
      return;
    }
    dispatch(setSapRightsState(result));

    if (result.Bp == null) {
      setAffiliation(true);
      return;
    }

    if (result.TitularNumeroDocumento != identification_number) {
      return;
    }

    if (result.TitularEstado == APORTANT_COMPANY_RETIR_STATUS) {
      if (result.TitularEstadoMotivo == DEATH_PAC.label) {
        return;
      } else {
        setAffiliation(true);
        return;
      }
    }
  };

  const validationPassRedirect = (
    mpacData: UserMpacDataInterface | undefined
  ) => {
    const accessToken = session?.access_token!;
    // Save MPAC validation history.
    if (mpacData) {
      saveMpacValidationHistory(accessToken, mpacData, true);
    }
    router.push("/employability");
  };

  const validateUser = async () => {
    const accessToken = session?.access_token!;

    let mpac_status;
    let mpacData;

    //setLoadingUserValidation(true);
    // let mpac_resp = await queryMpacValidation(accessToken);
    let mpac_resp = {
      mpacData: {
        OUT_Fecha_Nacimiento_Cliente_Fmt1: "",
        OUT_Fecha_Retiro_Empresa_Fmt2: "",
        OUT_IdState: "001",
        OUT_reason: "Ok",
        OUT_Description: MPAC_API_USER_REQUIREMENT_STATUS_ENUM.OK,
        OUT_Salario_Pila: "",
        OUT_Salida: MPAC_API_RESULT_CODE_ENUM.NOT_FOUND,
        OUT_Numero_Documento_Cliente: "1026259819",
        OUT_Tipo_Documento_Cliente: "CC",
        OUT_Tipo_Actor: MPAC_API_USER_TYPE_ENUM.UNIVERSAL,
      } as UserMpacDataInterface,
      mpac_status: MPAC_USER_STATUS_MESSAGE.COMPLETE,
    };
    let sise_status = await querySiseValidation(accessToken);
    //setLoadingUserValidation(false);

    if (mpac_resp) {
      mpac_status = mpac_resp.mpac_status;
      mpacData = mpac_resp.mpacData;
      dispatch(setServerResponse(mpacData));
      dispatch(setMpacDataSelected(mpac_status));
    }

    console.log("Validate user MPAC, SISE");
    console.log("MPAC | SISE:", mpac_status, sise_status);
    console.log("Mpac response:", mpacData);

    const userValidationsComplete =
      mpac_status === MPAC_USER_STATUS_MESSAGE.COMPLETE &&
      sise_status === SISE_USER_STATUS_MESSAGE.COMPLETE;

    const userMpacRole =
      mpacData?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.CESANT ||
      mpacData?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.ACTIVE_WORKER ||
      mpacData?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.BENEFICIARY ||
      mpacData?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.RETIRED ||
      mpacData?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.UNIVERSAL;

    const userMpacActive =
      mpacData?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.ACTIVE_WORKER;

    const userMeetRequirements =
      mpacData?.OUT_IdState.trim() ===
        MPAC_API_USER_REQUIREMENT_STATUS_CODE_ENUM.OK ||
      mpacData?.OUT_Description.trim() ===
        MPAC_API_USER_REQUIREMENT_STATUS.OK ||
      mpacData?.OUT_Description.trim() ===
        MPAC_API_USER_REQUIREMENT_STATUS.OK_2;

    const userMpacOkAndNoSise =
      mpac_status === MPAC_USER_STATUS_MESSAGE.COMPLETE &&
      sise_status === SISE_USER_STATUS_MESSAGE.INCOMPLETE;

    const userNoMpacAndSiseOk =
      mpac_status === MPAC_USER_STATUS_MESSAGE.OBSERVATIONS &&
      sise_status === SISE_USER_STATUS_MESSAGE.COMPLETE;

    switch (mpacData?.OUT_Tipo_Actor) {
      case MPAC_API_USER_TYPE_ENUM.ACTIVE_WORKER:
        if (userMpacOkAndNoSise || userValidationsComplete) {
          validationPassRedirect(mpacData);
          return;
        } else if (userNoMpacAndSiseOk) {
          if (
            mpacData &&
            mpac_status == MPAC_USER_STATUS_MESSAGE.OBSERVATIONS
          ) {
            saveMpacValidationHistory(accessToken, mpacData, false);
          }
          setMpacModalMessage(HOME_ERROR_NOT_MEET_REQUIREMENTS);
          setMpacModalError(true);
          return;
        } else {
          console.log("active default not access!");
          setMpacModalMessage(HOME_ERROR_INVALID_STATUS);
          setMpacModalError(true);
        }
        break;

      case MPAC_API_USER_TYPE_ENUM.CESANT:
        if (userValidationsComplete && userMeetRequirements) {
          // Disable Jupiter Validate.
          const runJupiterValidation: boolean = false;
          let validateJupiter;

          setMpacLoadingModal(true);
          let fomento_status = "complete"; //await queryFomentoMeetValidator(accessToken);
          if (runJupiterValidation) {
            validateJupiter = await queryJupiterValidator(accessToken);
          }
          setMpacLoadingModal(false);

          // JUPITER
          if (runJupiterValidation) {
            if (validateJupiter) {
              if (
                validateJupiter.postulation_state ==
                  JUPITER_STATUS.BENEFICIARY_ASSIGNED ||
                validateJupiter.postulation_state ==
                  JUPITER_STATUS.BENEFICIARY_ASSIGNED_TRAINING
              ) {
                mpacData = {
                  ...mpacData,
                  jupiterStatus: validateJupiter,
                };
                //validationPassRedirect(jupiterData);
              } else {
                setJupiterModalMessage(
                  "Identificamos que aplicas al subsidio al desempleo, conoce tus beneficios aquí"
                );
                setJupiterModal(true);
                return;
              }
            } else {
              setMpacModalMessage(HOME_ERROR_INVALID_STATUS);
              setMpacModalError(true);
              return;
            }
          }

          // JUPITER

          const userOkFomento =
            fomento_status == FOSPEC_USER_STATUS_MESSAGE.COMPLETE;
          if (userOkFomento) {
            validationPassRedirect(mpacData);
            return;
          } else {
            setFomentoModalMessage(HOME_ERROR_FOMENTO_NO_MEET);
            setFomentoModal(true);
            return;
          }
        } else if (userMpacOkAndNoSise && userMeetRequirements) {
          setSiseModalMessage(HOME_ERROR_NOT_REGISTERED);
          setSiseModal(true);
          handleUnregisteredSiseUser();
          return;
        } else if (userNoMpacAndSiseOk) {
          //console.log("user have invalid MPAC status!");
          if (
            mpacData &&
            mpac_status == MPAC_USER_STATUS_MESSAGE.OBSERVATIONS
          ) {
            // Save MPAC validation history
            saveMpacValidationHistory(accessToken, mpacData, false);
          }
          setMpacModalMessage(HOME_ERROR_NOT_MEET_REQUIREMENTS);
          setMpacModalError(true);
          return;
        } else {
          console.log("unemployed default not access!");
          setMpacModalMessage(HOME_ERROR_INVALID_STATUS);
          setMpacModalError(true);
        }
        break;

      case MPAC_API_USER_TYPE_ENUM.BENEFICIARY:
      case MPAC_API_USER_TYPE_ENUM.UNIVERSAL:
      case MPAC_API_USER_TYPE_ENUM.RETIRED:
        validationPassRedirect(mpacData);
        break;

      default:
        setMpacModalMessage(HOME_ERROR_INVALID_STATUS);
        setMpacModalError(true);
        break;
    }
  };

  const biometricTermsAccepted = useAppSelector(
    (state) => state.termsAndConditions.bometricTerms
  );

  // Registrar información del usuario si no esta en SISE
  const handleUnregisteredSiseUser = async () => {
    let {
      identification_number,
      name,
      identification_type,
      given_name,
      family_name,
      email,
      email_verified,
      edcmfndi,
    } = jwtDecode(session?.access_token!) as UserDataInterface;

    const userData: SiseUnregisteredUser = {
      created_at: undefined,
      updated_at: undefined,

      identification_number: identification_number,
      name: name,
      identification_type: identification_type,
      given_name: given_name,
      family_name: family_name,
      email: email,
      email_verified: email_verified ? true : false,
      edcmfndi: edcmfndi,
    };
    const token = session?.access_token ? session?.access_token : "";

    const saveSiseUnregisteredUser = appContainer.get<SaveSiseAbsentUser>(
      USECASES_TYPES._SaveSiseAbsentUserUseCase
    );
    const response = await saveSiseUnregisteredUser.execute(userData, token);

    if (!response) {
      toast.error("¡Se ha producido un error al contactar el servidor!");
    }
  };

  // Manejar redirección al hacer clic
  const handleClick = () => {
    if (biometricTermsAccepted) {
      window.location.href = process.env.NEXT_PUBLIC_CALLBACK_ADO || "/"; // Redirección externa
    } else {
      router.push("/faceid-verification"); // Redirección interna
    }
  };

  // useEffect para sincronizar 'status' local con el estado de Redux
  useEffect(() => {
    // Cuando cambie el estado de Redux, actualizamos el estado local 'status'
    setStatus(reduxStatus);
    getInfo();
    //console.log("ACCESS_TOKEN: " + session?.access_token);
  }, [reduxStatus]); // El efecto depende del estado en Redux

  return (
    <div>
      {/* Bienvenida */}
      <WelcomeHome />

      {visible && affiliation && (
        <div className="relative w-full">
          {/* <div className="absolute left-0 top-0 md:-top-6 text-xs py-[0.1rem] px-2 font-outfit rounded-md text-principal-150 bg-gradient-to-r from-[#38bdf8] to-[#3b82f6]">
            BETA
          </div> */}
          <Conditional showWhen={affiliation}>
            <AffiliateTemplate
              className="mb-10"
              onClick={() => {
                router.push("/menu-affiliations");
              }}
            />
          </Conditional>
        </div>
      )}

      {/* Descripción */}
      <Description
        text="¿Qué quieres hacer hoy?"
        className="block mb-[2rem] md:mb-9"
      />

      {/* Menú de acciones */}
      <div className="w-full pl-2 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-10 md:gap-x-6 md:px-6 md:mb-12 xl:grid-cols-3 xl:w-fit xl:px-0 mb-20">
        {homeMenuItems.map(
          ({
            href,
            name,
            width,
            height,
            urlImage,
            imageClassname,
            ellipseUrl,
            ellipseClassname,
            externalLink,
            betaAccess,
            prefetch,
            hideInKiosk,
          }) => {
            // Si no es 'Subsidios', renderiza el menú normalmente
            const CardComponent = externalLink ? ZoneCard : LinkCard;

            // Verificamos si 'Subsidios' requiere estado COMPLETO para mostrarse
            if (
              DIGITAL_IDENTITY_FF &&
              name === "Subsidios" &&
              status !== statusComplete
            ) {
              return (
                <ActionMenuCard
                  key={href}
                  name={name}
                  action={() => {
                    if (status === "LOADING") return;

                    if (status === DIGITAL_IDENTITY_STATUS_MESSAGE.INCOMPLETE) {
                      setModalIdentity(true);
                      return;
                    }

                    if (status === DIGITAL_IDENTITY_STATUS_MESSAGE.REVALIDATE) {
                      setErrorModal(true);
                      return;
                    }
                  }} // Abre el modal si no está completo
                  width={width ?? 0}
                  height={height ?? 0}
                  urlImage={urlImage ?? ""}
                  imageClassname={imageClassname ?? ""}
                  ellipseUrl={ellipseUrl ?? ""}
                  ellipseClassname={ellipseClassname}
                  betaAccess={betaAccess}
                  loading={status === "LOADING"}
                  hideInKiosk={hideInKiosk}
                />
              );
            }

            // Validamos el usuario en SISE y MPAC
            if (name === "Programa de fortalecimiento profesional") {
              return (
                <ActionMenuCard
                  key={href}
                  name={name}
                  action={async () => {
                    await validateUser();
                  }}
                  width={width ?? 0}
                  height={height ?? 0}
                  urlImage={urlImage ?? ""}
                  imageClassname={imageClassname ?? ""}
                  ellipseUrl={ellipseUrl ?? ""}
                  ellipseClassname={ellipseClassname}
                  betaAccess={betaAccess}
                  loading={loadingUserValidation}
                  hideInKiosk={hideInKiosk}
                />
              );
            }

            return (
              <CardComponent
                key={href}
                name={name}
                href={href}
                width={width}
                height={height}
                urlImage={urlImage}
                imageClassname={imageClassname}
                ellipseUrl={ellipseUrl}
                ellipseClassname={ellipseClassname}
                betaAccess={betaAccess}
                prefetch={prefetch}
                hideInKiosk={hideInKiosk}
              />
            );
          }
        )}
      </div>

      {/* Modal de Identidad Digital */}
      {modalIdentity && (
        <Modal
          title="Activa tu identidad digital Comfandi"
          description="Para acceder a los servicios de subsidios de la Caja te invitamos a realizar el proceso de identidad digital, para continuar da clic en 'Aceptar'."
          primaryButtonText="Aceptar"
          onPrimaryClick={handleClick}
          onSecondaryClick={() => {
            // Cierra el modal
            setModalIdentity(false);
          }}
        />
      )}

      {/* Modal de error */}
      {errorModal && (
        <Modal
          title="No pudimos validar tu identidad digital"
          description="Lo sentimos, no hemos podido validar tu identidad digital, por favor da click en *Aceptar* y *reintenta nuevamente la validación*."
          primaryButtonText="Aceptar"
          onPrimaryClick={() => {
            setErrorModal(false);
          }}
          onSecondaryClick={() => {
            setErrorModal(false);
          }}
          hideSecondaryButton
        />
      )}

      {/* Modal de error MPAC*/}
      {/* {mpacModalError && (
        <Modal
          title="No pudimos validar tu perfil"
          description={mpacModalMessage}
          primaryButtonText="Aceptar"
          onPrimaryClick={() => {
            setMpacModalError(false);
          }}
          onSecondaryClick={() => {
            setMpacModalError(false);
          }}
          hideSecondaryButton
        />
      )} */}

      {/* Modal de error */}
      {siseModal && (
        <ModalSise
          title="No te encuentras registrado"
          actionHref={
            "https://personas.serviciodeempleo.gov.co/RegistroCuenta.aspx"
          }
          actionLabel="Registrarme ahora en SISE"
          description={siseModalMessage}
          primaryButtonText="Cerrar"
          onPrimaryClick={() => {
            setSiseModal(false);
          }}
          onSecondaryClick={() => {
            setSiseModal(false);
          }}
          hideSecondaryButton
        />
      )}

      {/* Loading modal */}
      {mpacLoadingModal && (
        <ModalEmployability
          title="Fortalecimiento Profesional Comfandi"
          loading={true}
          description={
            "Por favor, espera un momento mientras validamos tu información en el sistema..."
          }
          lockModal={true}
        />
      )}

      {/* Modal de error */}
      {fomentoModal && (
        <ModalSise
          title="No se encuentra agendamiento"
          actionHref={
            "https://forms.office.com/pages/responsepage.aspx?id=7RAcgZj40Ee8zu57F_aw_4SruFt_OF1OkwQEve4dTx9UME9WME9RMFoyWUxQWk9aNFowRDRJQ1pMNy4u&route=shorturl"
          }
          actionLabel="Solicitar agendamiento Ahora"
          description={fomentoModalMessage}
          primaryButtonText="Cerrar"
          onPrimaryClick={() => {
            setFomentoModal(false);
          }}
          onSecondaryClick={() => {
            setFomentoModal(false);
          }}
          hideSecondaryButton
        />
      )}

      {/* Modal de error */}
      {jupiterModal && (
        <ModalSise
          title="Subsidios Comfandi"
          actionHref={"/subsidies"}
          actionTarget={"_self"}
          actionLabel="Solicitar subsidio al desempleo"
          description={jupiterModalMessage}
          primaryButtonText="Cerrar"
          onPrimaryClick={() => {
            setJupiterModal(false);
          }}
          onSecondaryClick={() => {
            setJupiterModal(false);
          }}
          hideSecondaryButton
        />
      )}
    </div>
  );
};

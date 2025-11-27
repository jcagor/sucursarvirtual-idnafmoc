"use client";
import { InfoSection } from "@comfanditd/chronux-ui";
import Home from "app/(pages)/under-construction/page";
import { stat } from "fs";
import { jwtDecode } from "jwt-decode";
import {
  BETA_ACCESS,
  EMPLOYABILITY_ERROR_INVALID_STATUS,
  EMPLOYABILITY_ERROR_NOT_REGISTERED,
  EMPLOYABILITY_ERROR_TOO_FAST,
  EMPLOYABILITY_MSG_VALID_STATUS,
  employabilityMenuItems,
  employabilityMenuItemTites,
  FOSPEC_USER_STATUS_MESSAGE,
  identificationTypeNomenclature,
  MPAC_API_USER_TYPE,
  MPAC_API_USER_TYPE_ENUM,
  queryFomentoMeetValidator,
  queryPendingPsyTest,
  queryUnemployedCourseHistory,
  queryUnemployedResumeStatus,
  TRAINING_MSG_HISTORY_FOUND,
  USER_RESUME_INCOMPLETE_STATUS,
  UserDataInterface,
} from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ActionDescriptionCard,
  FooterNotificationCard,
  Greatment,
  HeaderNotificationCard,
  LinkDescriptionCard,
  NeutralNCText,
  useAppSelector,
  useBetaAccess,
} from "presentation";
import ModalEmployability from "presentation/components/atoms/common/modals/ModalEmployability";
import useUserFospecStatus from "presentation/hooks/useFospecValidationStatus";
import useUserMpacStatus from "presentation/hooks/useUserMpacStatus";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const EmployabilityMenu = () => {
  // const visible = useBetaAccess(BETA_ACCESS);
  const visible = true;
  let menu_item_key = 0;

  //Router para navegacion
  const router = useRouter();

  const { data: session } = useSession();
  // Estado local de 'status', inicializado en "LOADING"
  const [errorModal, setErrorModal] = useState(false);
  const [errorLockModal, setErrorLockModal] = useState(false);

  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [errorModalLockMessage, setErrorModalLockMessage] = useState("");

  const [hidePsyTestCard, setHidePsyTestCard] = useState(true);

  // Estado del usuario MPAC Redux
  const mpacData = useAppSelector((state) => state.mpacData.server_response);
  //console.log(mpacData);

  if (!mpacData || !mpacData.OUT_Tipo_Actor) {
    router.push("/");
  }

  const previousSteep = () => {
    router.push("/");
  };

  // OnLoad page function.
  const getInfo = async () => {
    /*
    let dataFull = jwtDecode(session?.access_token!) as UserDataInterface;

    let { identification_number, identification_type } = jwtDecode(
      session?.access_token!
    ) as UserDataInterface;

    const identificationType =
      identificationTypeNomenclature(identification_type);
    if (!identificationType) {
      return;
    }
    */

    // const resumeStatus = await validateUserResumeStatus();
    const resumeStatus = true;

    // if (resumeStatus == false) {
    if (!resumeStatus) {
      setErrorModalLockMessage(
        "Para acceder a las funcionalidades del modulo " +
          "de fortalecimiento profesional y obtener la mejor experiencia se " +
          "requiere diligenciar tu hoja de vida."
      );
      setErrorLockModal(true);
    }

    const showPsyTest = await validateVisibility(
      employabilityMenuItemTites.PSYCHOMETRIC_TEST,
      mpacData?.OUT_Tipo_Actor
    );
    setHidePsyTestCard(showPsyTest);
  };

  // CARD VALIDATIONS

  /**
   * Current User validations.
   *
   * @param click_button
   * @param href
   * @param user_type
   * @returns
   */
  const validateUser = async (
    click_button: string,
    href: string,
    user_type: string | undefined
  ) => {
    const MAXIMUM_COURSES_LAST_3_YEARS = 3;

    if (!click_button || click_button == "" || !user_type || user_type == "") {
      setErrorModalMessage(EMPLOYABILITY_ERROR_INVALID_STATUS);
      setErrorModal(true);
    }

    // common validations
    const validateResume =
      user_type == MPAC_API_USER_TYPE_ENUM.CESANT ||
      user_type == MPAC_API_USER_TYPE_ENUM.ACTIVE_WORKER ||
      user_type == MPAC_API_USER_TYPE_ENUM.BENEFICIARY ||
      user_type == MPAC_API_USER_TYPE_ENUM.UNIVERSAL;
    // const resumeStatus = validateResume
    //   ? await validateUserResumeStatus()
    //   : true;

    const resumeStatus = false;

    if (!resumeStatus) {
      setErrorModalMessage(USER_RESUME_INCOMPLETE_STATUS);
      setErrorModal(true);
      return;
    }

    // button validations
    if (click_button == employabilityMenuItemTites.TRAINING_REMISSION) {
      /*const canTakeNewCourses = await validateUserCourseHistory(
        MAXIMUM_COURSES_LAST_3_YEARS
      );*/

      //if ( user_type == MPAC_API_USER_TYPE_ENUM.CESANT ){}

      if (resumeStatus) {
        // validated before continue -> (&& validatePsyMeetFomento())
        router.push(href);
      }
    }
    //else if (click_button == ...) {
    //  validate other buttons individually.
    //}
    else if (click_button == employabilityMenuItemTites.JOB_OFFER) {
      router.push(href);
    }
  };

  /**
   * Card Visibility validations.
   *
   * @param click_button
   * @param user_type
   * @returns Boolean
   */
  const validateVisibility = async (
    click_button: string,
    user_type: string | undefined
  ): Promise<boolean> => {
    switch (click_button) {
      case employabilityMenuItemTites.PSYCHOMETRIC_TEST:
        const psyTestPending = await validatePendingPsyTests();
        const hideCard = !psyTestPending;
        return hideCard;

      // not defined cards are showed always.
      default:
        return true;
    }
  };

  // AUX VALIDATION FUNCTIONS

  const validateUserCourseHistory = async (
    maxCourses: number
  ): Promise<boolean> => {
    //validate user course history
    const coursesHistory = await queryUnemployedCourseHistory(
      session?.access_token!
    );

    // check maxCourses taken in last 3 years.
    if (coursesHistory && coursesHistory?.length <= maxCourses) {
      return true;
    } else {
      setErrorModalMessage(TRAINING_MSG_HISTORY_FOUND);
      setErrorModal(true);
    }
    return false;
  };

  const validatePsyMeetFomento = async (): Promise<boolean> => {
    const fospec_status = await queryFomentoMeetValidator(
      session?.access_token!
    );

    console.log("Validate Fomento");
    console.log("Fomento estatus:", fospec_status);

    if (fospec_status === FOSPEC_USER_STATUS_MESSAGE.COMPLETE) {
      return true;
    } else if (fospec_status === FOSPEC_USER_STATUS_MESSAGE.INCOMPLETE) {
      setErrorModalMessage(EMPLOYABILITY_ERROR_NOT_REGISTERED);
      setErrorModal(true);
    } else {
      setErrorModalMessage(EMPLOYABILITY_ERROR_INVALID_STATUS);
      setErrorModal(true);
    }
    return false;
  };

  const validateUserResumeStatus = async (): Promise<boolean> => {
    const resumeStatus = await queryUnemployedResumeStatus(
      session?.access_token!
    );

    if (resumeStatus?.status) {
      //console.log("Resume OK!");
      return true;
    }

    if (resumeStatus?.error) {
      if (resumeStatus.message) {
        toast.error(
          "Error al consultar el estado de la HV del usuario: " +
            resumeStatus.message
        );
      } else {
        toast.error("Error al consultar el estado de la HV del usuario. ");
      }
    }

    return false;
  };

  const validatePendingPsyTests = async (): Promise<boolean> => {
    const pendingExams = await queryPendingPsyTest(session?.access_token!);

    if (pendingExams && Array.isArray(pendingExams)) {
      if (pendingExams.length) {
        console.log("PendingTestResponse: ", pendingExams[0].psyTestExamName);
        if (pendingExams[0].psyTestExamName) {
          return true;
        }
      } else {
        return false;
      }
    } else {
      toast.error("Error al consultar pruebas psicométricas pendientes");
    }
    return false;
  };

  // useEffect para sincronizar 'status'
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      {visible && (
        <div className="block mr-[64px]">
          <HeaderNotificationCard />

          <Greatment text={`Bienvenid@ 👋`} className="mb-2 md:mb-7 md:-mt-3" />
          <hr className="h-px my-8 bg-gray-700 dark:bg-gray-200" />

          <NeutralNCText
            text="Iniciar Programa de Fortalecimiento Profesional"
            className="cf-text-principal-180"
            fontSize="md"
          />

          <div className="w-full p-5 "></div>

          {/* Menú de acciones */}
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {employabilityMenuItems.map(
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
                  description,
                  canAccess,
                }) => {
                  //console.log("data:", mpacData?.OUT_Tipo_Actor, name)
                  return canAccess.includes(
                    mpacData?.OUT_Tipo_Actor ? mpacData?.OUT_Tipo_Actor : ""
                  ) ? (
                    name === employabilityMenuItemTites.TRAINING_REMISSION ||
                    name ===
                      employabilityMenuItemTites.SOCIO_OCCUPATIONAL_WORKSHOP ||
                    name === employabilityMenuItemTites.JOB_OFFER ? (
                      <ActionDescriptionCard
                        key={"mi-" + menu_item_key++}
                        name={name}
                        action={() => {
                          validateUser(name, href, mpacData?.OUT_Tipo_Actor);
                        }}
                        urlImage={urlImage}
                        width={width}
                        height={height}
                        imageClassname={imageClassname}
                        betaAccess={betaAccess}
                        description={description}
                        canAccess={canAccess}
                      />
                    ) : (
                      <LinkDescriptionCard
                        key={"ma-" + menu_item_key++}
                        name={name}
                        href={href}
                        urlImage={urlImage}
                        externalLink={externalLink}
                        width={width}
                        height={height}
                        imageClassname={imageClassname}
                        betaAccess={betaAccess}
                        description={description}
                        canAccess={canAccess}
                        hidden={
                          name == employabilityMenuItemTites.PSYCHOMETRIC_TEST
                            ? hidePsyTestCard
                            : false
                        }
                      />
                    )
                  ) : (
                    ""
                  );
                }
              )}
            </div>
          </div>

          {mpacData?.OUT_Tipo_Actor === MPAC_API_USER_TYPE.CESANT ? (
            <FooterNotificationCard />
          ) : (
            <></>
          )}
          <div className="flex-auto flex items-center">
            <a
              onClick={previousSteep}
              onKeyDown={() => {}}
              className="cursor-pointer"
            >
              <NeutralNCText
                text="Atrás"
                className="cf-text-principal-180 mb-[2rem] md:mb-9"
                fontSize="md"
              />
            </a>
          </div>
        </div>
      )}
      {!visible && <Home />}

      {/* Modal de error */}
      {errorModal && (
        <ModalEmployability
          title="Fortalecimiento Profesional Comfandi"
          description={errorModalMessage}
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

      {/* Lock modal de error */}
      {errorLockModal && (
        <ModalEmployability
          title="Fortalecimiento Profesional Comfandi"
          description={errorModalLockMessage}
          primaryButtonText="Diligenciar ahora"
          SecondaryButtonText="Regresar"
          onPrimaryClick={() => {
            router.push("/resume");
          }}
          onSecondaryClick={() => {
            previousSteep();
          }}
          lockModal={true}
        />
      )}
    </div>
  );
};

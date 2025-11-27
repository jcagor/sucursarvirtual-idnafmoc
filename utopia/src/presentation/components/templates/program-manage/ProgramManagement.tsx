"use client";

import {
  ProgramObjectList,
  ProgramType,
  SchedulesInfo,
} from "domain/models/ProgramType";
import { responseIsValidBusinessType } from "domain/models/responseIsValidBusinesType";
import CreateProgramUseCase from "domain/usecases/Business/createProgram.use.case";
import findAllProgramsUseCase from "domain/usecases/Business/findAllPrograms.use.case";
import IsValidatedBusinessUseCase from "domain/usecases/Business/IsValidatedBusiness.use.case";
import PrevalidationBusinessUseCase from "domain/usecases/Business/prevalidationBusiness.use.case";
import ValidationRuesBusinessUseCase from "domain/usecases/Business/validationRuesBusiness.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  CardText,
  Greatment,
  ModalWithChildren,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";
import { HeaderNotificationCard } from "presentation/components/molecules/common/notification";
import { CardProgram } from "presentation/components/organisms";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const ProgramManagement = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  // Program info
  const [programList, setProgramList] = useState<ProgramObjectList>();

  // Status
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  useEffect(() => {
    if (status === "authenticated" && session?.access_token) {
      findAllPrograms();
    }
  }, [status, session]);

  const findAllPrograms = async () => {
    const token = session?.access_token ?? "";
    const findAllPrograms = appContainer.get<findAllProgramsUseCase>(
      USECASES_TYPES._findAllProgramsUseCase
    );

    const response = await findAllPrograms.execute(token);
    if (response) {
      setProgramList(response);
    }
  };

  const saveProgram = async (programs: ProgramType): Promise<boolean> => {
    const createDataBusiness = appContainer.get<CreateProgramUseCase>(
      USECASES_TYPES._CreateProgram
    );
    const response = await createDataBusiness.execute(
      programs,
      session?.access_token
    );
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al guardar la información, intenta mas tarde",
          type: "error",
        })
      );
      return false;
    }
    return true;
  };

  const IsValidatedBusiness = async () => {
    const IsValidatedBusiness = appContainer.get<IsValidatedBusinessUseCase>(
      USECASES_TYPES._IsValidatedBusiness
    );
    const response = await IsValidatedBusiness.execute(session?.access_token);
    if (response) {
      //router.push("/");
      return response;
    }
    return false;
  };

  const prevalidationBusiness = async (programs: ProgramType) => {
    const prevalidationBusiness =
      appContainer.get<PrevalidationBusinessUseCase>(
        USECASES_TYPES._PrevalidationBusiness
      );
    const response = await prevalidationBusiness.execute(programs);
    if (!response) {
      dispatch(
        addAlert({
          message: "Algo salio mal con las validaciones, intenta mas tarde",
          type: "error",
        })
      );
    }
    return response;
  };

  const validationRuesBusiness = async (programs: ProgramType) => {
    const validationRuesBusiness =
      appContainer.get<ValidationRuesBusinessUseCase>(
        USECASES_TYPES._ValidationRuesBusiness
      );
    const response = await validationRuesBusiness.execute(programs);
    if (!response) {
      dispatch(
        addAlert({
          message: "Algo salio mal con las validaciones, intenta mas tarde",
          type: "error",
        })
      );
    }
    return response;
  };

  const alReadyEnrolledMessage = () => {
    dispatch(
      addAlert({
        message: "Ya te encuentras inscrito en este programa.",
        type: "warning",
      })
    );
  };

  const validateProgram = async (values: ProgramType) => {
    setOpenModal(true);
    setIsLoading(true);

    const errorEndpoint = () => {
      setIsLoading(false);
      setOpenModal(false);
      dispatch(
        addAlert({
          message:
            "Ha ocurrido un error al guardar la información, intenta mas tarde",
          type: "error",
        })
      );
    };

    const correctPrevalidationBusiness:
      | responseIsValidBusinessType
      | undefined = await prevalidationBusiness(values);

    if (!correctPrevalidationBusiness) {
      errorEndpoint();
      return;
    }

    if (correctPrevalidationBusiness?.isValid === false) {
      setIsLoading(false);
      setSuccess(true);
      setValidationMessages(correctPrevalidationBusiness.messages);
      return;
    }

    const correctSaveProgram = await saveProgram(values);

    if (!correctSaveProgram) {
      errorEndpoint();
      return;
    }

    //canContinue = true;

    const correctValidationRuesBusiness = await validationRuesBusiness(values);

    if (!correctValidationRuesBusiness) {
      errorEndpoint();
      return;
    }

    if (!correctValidationRuesBusiness.isValid) {
      setIsLoading(false);
      setSuccess(true);
      setValidationMessages(correctValidationRuesBusiness.messages);

      return;
    }

    router.push(`/program-management/${values.id_program}`);
  };

  const validateProgramMock = async (values: ProgramType) => {
    setOpenModal(true);
    setIsLoading(true);

    //Just redirect no validate.
    setTimeout(function () {
      router.push(`/program-management/program/${values.id_program}`);
    }, 2000);
  };

  const checkInscribed = (programSchedules: SchedulesInfo[]): boolean => {
    for (const schedule of programSchedules) {
      if (schedule && schedule.BusinessList.length) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="w_full md:w-11/12">
      <HeaderNotificationCard
        startText="¡Elige el programa que mas se ajuste a tu empresa!"
        middleBoldText=""
        endText=""
      />
      <Greatment text={`Programas`} className="mb-2 md:mb-7 md:-mt-3" />
      <SectionSeparator />
      <SecondaryText text="Listado de programas disponibles." />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {programList && programList.length > 0 ? (
          programList.map((program) => {
            const programValues = {
              id_program: program.id,
              name: program.name,
            } as ProgramType;

            const inscribed: boolean = program.programSchedules
              ? checkInscribed(program.programSchedules)
              : false;

            return (
              <CardProgram
                key={program.id}
                Title={program.name}
                onClickAction={async () => {
                  inscribed
                    ? alReadyEnrolledMessage()
                    : await validateProgramMock(programValues); //validateProgram(programValues);
                }}
                Text={""}
                Icon={`/utopia${program.iconUrl}`}
                path={`/worker-management/course/${program.id}`}
                disabled={inscribed}
              />
            );
          })
        ) : (
          <div className="text-2xl font-bold text-center text-principal-350">
            No hay programas disponibles por el momento.
          </div>
        )}
      </div>
      {openModal && (
        <ModalWithChildren
          onClose={() => {
            setOpenModal(false);
            setSuccess(false);
            setIsLoading(false);
          }}
          className="md:w-[463px] xl:w-[600px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
              <div className="text-principal-180 mt-2">
                Validando información empresarial
              </div>
            </>
          ) : success ? (
            <>
              <Image
                src="/utopia/icons/hello_full.png"
                alt="Success icon"
                width={80}
                height={80}
                className="cursor-pointer"
                priority
              />
              <ModalTitle text="Errores en la información" className="mt-2" />
              {validationMessages.map((message, index) => (
                <div className="w-full flex flex-row m-2">
                  <Image
                    src={"/utopia/icons/check.svg"}
                    alt="Card ellipse"
                    width={35}
                    height={35}
                    loading="lazy"
                    className="pr-4"
                  />
                  <CardText
                    text={message}
                    className={`text-[1rem] text-justify font-light modalText text-principal-180`}
                  />
                </div>
              ))}
              <div className="flex flex-col w-[70%] space-y-3 pt-5 pb-2">
                <Button
                  label="Continuar"
                  onClick={() => {
                    setOpenModal(false);
                    setIsLoading(false);
                    setSuccess(false);
                  }}
                  className="w-full"
                  primary
                />
              </div>
            </>
          ) : null}
        </ModalWithChildren>
      )}
    </div>
  );
};

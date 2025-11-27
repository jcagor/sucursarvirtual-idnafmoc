"use client";
import Home from "app/(pages)/under-construction/page";
import {
  ResumeInformation,
  ResumeServerResponse,
  UserInformation,
} from "domain/models";
import SaveUserResumeFormUseCase from "domain/usecases/userData/userSaveResumeForm.usecase";
import { useFormik } from "formik";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import {
  BETA_ACCESS,
  identificationTypeNomenclature,
  nameFormat,
  RESUME_FORM_PAGE,
  UserDataInterface,
  UserSiseResumeInformation,
} from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  Greatment,
  HelpFloatedButton,
  HelpFloatedSidebar,
  NeutralNCText,
  StepSection,
  useBetaAccess,
} from "presentation";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import {
  FifthSteepResumeForm,
  FirstSteepResumeForm,
  FourthSteepResumeForm,
  ResultSteepResumeForm,
  SecondSteepResumeForm,
  ThirdSteepResumeForm,
} from "./steeps";
import UserSiseResumeUseCase from "domain/usecases/userData/userSiseResume.usecase";
import GetUserResumeFormUseCase from "domain/usecases/userData/userGetResumeForm.usecase";
import GetSelectOptionsFormUseCase from "domain/usecases/userData/userFormGetSelectOptions.usecase";
import { toast } from "react-toastify";

export const ResumeTemplate = () => {
  const visible = useBetaAccess(BETA_ACCESS);
  //Router para navegacion
  const router = useRouter();

  const { data: session } = useSession();
  const [name, setName] = useState("Usuario");
  const [formSteep, setFormSteep] = useState(1);
  const [siseResume, setSiseResume] = useState<UserSiseResumeInformation>();
  const [resumeData, setResumeData] = useState<ResumeServerResponse>();
  const [sidebarOpen, setSideBarOpen] = useState(true);

  const firstSteepFormRef = useRef<HTMLFormElement>(null);
  const secondSteepFormRef = useRef<HTMLFormElement>(null);
  const thirdSteepFormRef = useRef<HTMLFormElement>(null);
  const fourthSteepFormRef = useRef<HTMLFormElement>(null);
  const fifthSteepFormRef = useRef<HTMLFormElement>(null);

  const FORM_MAX_STEEPS = 6;
  const FORM_MIN_STEEP = 1;

  const getSiseResumeInfo = async () => {
    let dataFull = jwtDecode(session?.access_token!) as UserDataInterface;
    const token = session?.access_token ? session?.access_token : "";
    const getSiseUserResume = appContainer.get<UserSiseResumeUseCase>(
      USECASES_TYPES._UserSiseResumeUseCase
    );
    const userData = {
      identification_type: dataFull.identification_type,
      identification_number: dataFull.identification_number,
    };
    const response = await getSiseUserResume.execute(userData, token);
    //console.log("SISE RESUME INFO:", response);
    if (!response){
      toast.error("¡Se ha producido un error al contactar el servidor SISE!");
    }
    setSiseResume(response);
  };

  const onPageChange = async () => {
    const token = session?.access_token ? session?.access_token : "";
    const getResumeInformation = appContainer.get<GetUserResumeFormUseCase>(
      USECASES_TYPES._UserGetUserResumeForm
    );

    const response = await getResumeInformation.execute({}, token);
    //console.log( "Response Form: ", response );
    if (response && "information" in response) {
      return response;
    }
    toast.warning("¡No se ha encontrado información registrada previamente!");
    return false;
  };

  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const getSelectOptions = async (optionsName: string) => {
    const token = session?.access_token ? session?.access_token : "";

    const query = {
      selectOptionsName: optionsName,
    };

    const saveResumeInformation = appContainer.get<GetSelectOptionsFormUseCase>(
      USECASES_TYPES._GetSelectOptionsFormUseCase
    );

    const response = await saveResumeInformation.execute(query, token);
    if (!response) {
      console.error("no se puede cargar el listado de opciones: ", optionsName);
      toast.error("¡Se ha producido un error al contactar el servidor!");
      return [];
    }
    //console.log("Form SELECT Options for", optionsName," :", response);
    return response;
  };

  const getSelectFilteredOptions = async (
    optionsName: string,
    filterString: string
  ) => {
    const token = session?.access_token ? session?.access_token : "";

    const query = {
      selectOptionsName: optionsName,
      selectFilterString: filterString,
    };

    const saveResumeInformation = appContainer.get<GetSelectOptionsFormUseCase>(
      USECASES_TYPES._GetSelectOptionsFormUseCase
    );

    const response = await saveResumeInformation.execute(query, token);
    if (!response) {
      console.error("no se puede cargar el listado de opciones: ", optionsName);
      toast.error("¡Se ha producido un error al contactar el servidor!");
      return [];
    }
    //console.log("Form SELECT Options for", optionsName," :", response);
    return response;
  };

  const findStoredInformation = async () => {
    const data = await onPageChange();
    if (data) {
      setResumeData(data);
    } else {
      await getSiseResumeInfo();
    }
  };

  const handleFormAction = () => {
    //console.log("Button Click, form steep: ", formSteep);
    try {
      switch (formSteep) {
        case RESUME_FORM_PAGE.GENERAL_INFO:
          firstSteepFormRef.current?.requestSubmit();
          break;

        case RESUME_FORM_PAGE.EDUCATION:
          secondSteepFormRef.current?.requestSubmit();
          break;

        case RESUME_FORM_PAGE.LANGUAGES:
          thirdSteepFormRef.current?.requestSubmit();
          break;

        case RESUME_FORM_PAGE.KNOWLEDGE_AND_SKILL:
          fourthSteepFormRef.current?.requestSubmit();
          break;

        case RESUME_FORM_PAGE.PROFILE_AND_EXPERIENCE:
          fifthSteepFormRef.current?.requestSubmit();
          break;

        case RESUME_FORM_PAGE.RESUME_RESULT:
          router.push("/employability");
          break;

        default:
          console.error("Invalid form Action for steep:", formSteep);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formNextSteep = () => {
    if (formSteep >= FORM_MIN_STEEP && formSteep < FORM_MAX_STEEPS) {
      //console.log("STEEP++ ", formSteep);
      setFormSteep((prevState) => {
        return prevState + 1;
      });
    } else {
      //console.log("STEEP++ NO CHANGE", formSteep);
    }
  };

  const formPreviousSteep = () => {
    if (formSteep > FORM_MIN_STEEP && formSteep <= FORM_MAX_STEEPS) {
      //console.log("STEEP-- ", formSteep);
      findStoredInformation();
      setFormSteep((prevState) => {
        return prevState - 1;
      });
    } else {
      //console.log("STEEP NO CHANGE", formSteep);
      router.push("/employability");
    }
  };

  const getFormSteep = (value: number) => {
    switch (value) {
      case RESUME_FORM_PAGE.GENERAL_INFO:
        return (
          <FirstSteepResumeForm
            formRef={firstSteepFormRef}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            formFilterSelectOptionsFn={getSelectFilteredOptions}
            siseResume={siseResume ?? siseResume}
            resumeData={resumeData ?? resumeData}
          />
        );

      case RESUME_FORM_PAGE.EDUCATION:
        return (
          <SecondSteepResumeForm
            formRef={secondSteepFormRef}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            siseResume={siseResume ?? siseResume}
            resumeData={resumeData ?? resumeData}
          />
        );

      case RESUME_FORM_PAGE.LANGUAGES:
        return (
          <ThirdSteepResumeForm
            formRef={thirdSteepFormRef}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            siseResume={siseResume ?? siseResume}
            resumeData={resumeData ?? resumeData}
          />
        );

      case RESUME_FORM_PAGE.KNOWLEDGE_AND_SKILL:
        return (
          <FourthSteepResumeForm
            formRef={fourthSteepFormRef}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            siseResume={siseResume ?? siseResume}
            resumeData={resumeData ?? resumeData}
          />
        );

      case RESUME_FORM_PAGE.PROFILE_AND_EXPERIENCE:
        return (
          <FifthSteepResumeForm
            formRef={fifthSteepFormRef}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            formFilterSelectOptionsFn={getSelectFilteredOptions}
            siseResume={siseResume ?? siseResume}
            resumeData={resumeData ?? resumeData}
            updateResumeDataFn={findStoredInformation}
          />
        );
      case RESUME_FORM_PAGE.RESUME_RESULT:
        return (
          <ResultSteepResumeForm
            formRef={fifthSteepFormRef}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            siseResume={siseResume ?? siseResume}
            resumeData={resumeData ?? resumeData}
          />
        );

      default:
        return <div> Sección invalida </div>;
    }
  };

  const getActionLabel = (currentSteep: number) => {
    switch (currentSteep) {
      case RESUME_FORM_PAGE.PROFILE_AND_EXPERIENCE:
        return "Finalizar";

      case RESUME_FORM_PAGE.RESUME_RESULT:
        return "Volver al inicio";

      default:
        return "Siguiente";
    }
  };

  // useEffect para sincronizar 'status'
  useEffect(() => {
    findStoredInformation();
  }, []);

  return (
    <div className="mr-[64px]">
      <Greatment
        text={"Actualización de hoja de vida"}
        className="mb-2 md:mb-7 md:-mt-3"
      />
      <NeutralNCText
        text="Necesitamos tu ayuda diligenciando los siguientes campos para actualizar tu hoja de vida"
        className="cf-text-principal-180 mb-[2rem] md:mb-9"
        fontSize="md"
      />
      <hr className="h-px my-8 bg-gray-700 dark:bg-gray-200" />

      {/*<!-- FORM FIELDS -->*/}

      {getFormSteep(formSteep)}

      {/*<!-- FORM FIELDS -->*/}

      <div className="flex h-fit min-h-full">
        <div className="flex-auto flex items-center">
          <a
            onClick={formPreviousSteep}
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

        <div className="flex justify-end">
          <Button
            label={getActionLabel(formSteep)}
            type="submit"
            className="w-56 xl:w-72 my-6 self-end"
            primary
            onClick={handleFormAction}
          />
        </div>
      </div>

      {formSteep == RESUME_FORM_PAGE.PROFILE_AND_EXPERIENCE && (
        <>
          <HelpFloatedButton
            onClick={handleViewSidebar}
            sidebarOpen={sidebarOpen}
          />
          <HelpFloatedSidebar sidebarOpen={sidebarOpen} />
        </>
      )}
    </div>
  );
};

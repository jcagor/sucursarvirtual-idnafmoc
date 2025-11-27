"use client";

import { FORM_JOB_REGISTER_PAGES } from "lib";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Greatment,
  NeutralNCText,
} from "presentation/components/atoms";
import GetSelectOptionsFormUseCase from "domain/usecases/Business/userFormGetSelectOptions.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { Console } from "console";
import {
  FinishVacancyRegister,
  GeneralInformationFormSteep,
  IntroductionVacancyRegister,
  SpecificRequirementsOneFormSteep,
  VacancyInformationFormSteep,
} from "./steeps";
import { VacantRegisterForm } from "domain/models";

export const JobVacancyRegisterTemplate = () => {
  //Router para navegación
  const router = useRouter();

  const { data: session } = useSession();
  const [formSteep, setFormSteep] = useState(1);
  const [formValues, setFormValues] = useState<VacantRegisterForm>();

  const steepA_IntroductionSteep = useRef<HTMLFormElement>(null);
  const steepB_GeneralInfoSteep = useRef<HTMLFormElement>(null);
  const steepC_VacantInfoSteep = useRef<HTMLFormElement>(null);
  const steepD_SpecificInfoSteep = useRef<HTMLFormElement>(null);
  const steepE_SpecificInfoTwoSteep = useRef<HTMLFormElement>(null);

  const FORM_MIN_STEEP = 1;
  const FORM_MAX_STEEPS = 5;

  const onPageChange = async () => {
    const token = session?.access_token ? session?.access_token : "";
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
      return [];
    }
    //console.log("SELECT Options for", optionsName," :", response);
    return response;
  };

  const handleFormAction = () => {
    //console.log("Button Click, form steep: ", formSteep);
    try {
      switch (formSteep) {
        case FORM_JOB_REGISTER_PAGES.GENERAL_INFO:
          steepB_GeneralInfoSteep.current?.requestSubmit();
          break;

        case FORM_JOB_REGISTER_PAGES.VACANCY_INFO:
          steepC_VacantInfoSteep.current?.requestSubmit();
          break;

        case FORM_JOB_REGISTER_PAGES.SPECIFIC_REQUIREMENTS:
          steepD_SpecificInfoSteep.current?.requestSubmit();
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
      console.log("STEEP++ ", formSteep);
      setFormSteep((prevState) => {
        return prevState + 1;
      });
    } else {
      console.log("STEEP++ NO CHANGE", formSteep);
    }
  };

  const formPreviousSteep = () => {
    if (formSteep > FORM_MIN_STEEP && formSteep <= FORM_MAX_STEEPS) {
      //console.log("STEEP-- ", formSteep);
      setFormSteep((prevState) => {
        return prevState - 1;
      });
    } else {
      //console.log("STEEP NO CHANGE", formSteep);
      router.push("/job-vacancies");
    }
  };

  const initFormStorageData = () => {
    console.log("Init form Data");
    const initialData = {
      name: "",
      nit: "",
      comfandiAffiliated: "",
      businessSector: "",
      address: "",
      location: "", // ?,
      //business_sector:"" //duplicate,
      telephone: "",
      businessType: "",
      businessSize: "",

      applicantName: "",
      applicantOccupation: "",
      applicantPhone: "",
      identificationNumber: "",

      vacantName: "",
      vacantOccupation: "",
      vacantConfidentialRequirements: "",
      vacantNumber: "",
      vacantOccupationalDenominationCode: "",
      vacantCUOCCode: "",
      vacantHiringType: "",
      vacantOrigin: "",
      vacantCountry:"",
      vacantWorkMode: "",
      vacantWorkRegion: "",
      vacantLegalRequirements: "",
      vacantSalaryRangeMin: "",
      vacantSalary: "",
      vacantAttentionPoint: "",
      vacantHabilitesDescription: "",
      vacantKnowledgeAndSkillsDescription: "",

      reqStudies: "",
      reqStudyTitle: "",
      reqCertification: "",
      reqMinExperience: "",
      reqSecondLanguage: "",
      reqLanguage: "",
      reqLanguageLevel:"",
      reqTravel: "",
      reqDisabilityOK: "",
      reqSectorExperience: "",
      reqPersonalInCharge: "",
      reqDisabilityType: "",
      reqWorkTime: "",
      reqWorkDays: "",
      reqVehicle: "",
      reqVehicleType: "",
      reqDriveLicense:"",
      reqDriveLicenseType:"",
      reqLikeWorkShop: "",
      reqLaboralGestorAssigned: "",
      reqObservations: "",
      reqDataPolicyOK: "",
    } as VacantRegisterForm;

    setFormValues(initialData);
  };

  const getStoredValues = () => {
    return formValues;
  };

  const setStoredValues = (values: VacantRegisterForm) => {
    setFormValues((prevState) => {
      if (prevState) {
        return { ...prevState, ...values };
      }
    });
  };

  const getFormSteep = (value: number) => {
    switch (value) {
      case FORM_JOB_REGISTER_PAGES.INTRODUCTION:
        return (
          <IntroductionVacancyRegister
            formRef={null}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            dataStorageSetFn={setStoredValues}
            dataStorageGetFn={getStoredValues}
          />
        );

      case FORM_JOB_REGISTER_PAGES.GENERAL_INFO:
        return (
          <GeneralInformationFormSteep
            formRef={steepB_GeneralInfoSteep}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            dataStorageSetFn={setStoredValues}
            dataStorageGetFn={getStoredValues}
          />
        );

      case FORM_JOB_REGISTER_PAGES.VACANCY_INFO:
        return (
          <VacancyInformationFormSteep
            formRef={steepC_VacantInfoSteep}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            dataStorageSetFn={setStoredValues}
            dataStorageGetFn={getStoredValues}
          />
        );

      case FORM_JOB_REGISTER_PAGES.SPECIFIC_REQUIREMENTS:
        return (
          <SpecificRequirementsOneFormSteep
            formRef={steepD_SpecificInfoSteep}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            dataStorageSetFn={setStoredValues}
            dataStorageGetFn={getStoredValues}
          />
        );

      case FORM_JOB_REGISTER_PAGES.REGISTER_RESULT:
        return (
          <FinishVacancyRegister
            formRef={null}
            nextSteepFn={formNextSteep}
            previousSteepFn={formPreviousSteep}
            formSelectOptionsFn={getSelectOptions}
            dataStorageSetFn={setStoredValues}
            dataStorageGetFn={getStoredValues}
          />
        );

      default:
        return <div> Sección invalida {value}</div>;
    }
  };

  const getActionLabel = (currentSteep: number) => {
    switch (currentSteep) {
      case FORM_JOB_REGISTER_PAGES.SPECIFIC_REQUIREMENTS:
        return "Finalizar";

      case FORM_JOB_REGISTER_PAGES.REGISTER_RESULT:
        return "Volver al inicio";

      default:
        return "Siguiente";
    }
  };

  // useEffect para sincronizar 'status'
  useEffect(() => {
    //console.log("C steep:", formSteep);
    initFormStorageData();
  }, []);

  useEffect(() => {
    console.log("C steep:", formValues);    
  }, [formValues]);

  return (
    <>
      {formSteep === FORM_JOB_REGISTER_PAGES.INTRODUCTION ||
      formSteep === FORM_JOB_REGISTER_PAGES.REGISTER_RESULT ? (
        getFormSteep(formSteep)
      ) : (
        <div className="mr-[64px]">
          <Greatment
            text={"Formulario de Registro de Vacante"}
            className="mb-2 md:mb-7 md:-mt-3"
          />
          <NeutralNCText
            text="Necesitamos tu ayuda diligenciando los siguientes campos para crear el nuevo registro"
            className="cf-text-principal-180 mb-[2rem] md:mb-9"
            fontSize="md"
          />

          {/*<!-- FORM FIELDS -->*/}

          {getFormSteep(formSteep)}

          {/*<!-- FORM FIELDS -->*/}

          <div className="flex h-fit min-h-full">
            <div className="flex-auto flex items-center">
              <a
                onClick={() => {
                  formPreviousSteep();
                }}
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
        </div>
      )}
    </>
  );
};

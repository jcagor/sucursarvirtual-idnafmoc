import {  
  LanguageInformation,  
  ResumeInformation,
  ResumeServerResponse,  
} from "domain/models";
import * as Yup from "yup";
import {
  CardManageSection,
  CustomSelectGray,
  ListActionCard,
  NeutralBlackText,
  NeutralNCText,
  StepSection,
} from "presentation";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import SaveUserResumeFormUseCase from "domain/usecases/userData/userSaveResumeForm.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { FormProps } from "./formProps";
import { FORM_DB_SELECT_OPTIONS, RESUME_FORM_PAGE, SelectOption } from "lib";
import { ResumeFormValidations } from "../validations";
import { toast } from "react-toastify";

export const ThirdSteepResumeForm: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  previousSteepFn,
  formSelectOptionsFn,
  siseResume,
  resumeData,
}) => {
  // FORM FUNCTIONS

  const FORM_CURRENT_STEEP = RESUME_FORM_PAGE.LANGUAGES;

  const { data: session } = useSession();
  const [languageList, setLanguageList] = useState<Array<SelectOption>>([]);
  const [languageLevel, setLanguageLevel] = useState<Array<SelectOption>>([]);
  const [affirmativeOption, setAffirmativeOption] = useState<
    Array<SelectOption>
  >([]);

  const initialLanguageForm: LanguageInformation = {
    language: "",
    level: "",
    certificateAvailable: false,
    nativeLanguage: false,
  };

  const validationSchema = new ResumeFormValidations().getThirdSFormValidation();

  const onSubmit = async (languageInformation: LanguageInformation) => {
    //console.log("SUBMIT PAGE Languages!", languageInformation);
    const token = session?.access_token ? session?.access_token : "";

    let languagesList = [languageInformation];
    cardList.map((value, index, arr) => {
      languagesList.push(value);
    });

    const language_info: ResumeInformation = {
      generalInfo: undefined,
      education: undefined,
      languages: languagesList,
      knowledgeAndSkills: undefined,
      profileAndExperience: undefined,
    };

    const query = {
      curriculum: language_info,
      formPage: FORM_CURRENT_STEEP,
      registerId: resumeData?.id,
    };

    const saveResumeInformation = appContainer.get<SaveUserResumeFormUseCase>(
      USECASES_TYPES._UserSaveUserResumeForm
    );

    const response = await saveResumeInformation.execute(query, token);
    if (!response) {
      toast.error("¡Se ha producido un error al contactar el servidor!");
      return;
    }
    nextSteepFn();
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialLanguageForm,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const updateFormInfoDB = (resumeData: ResumeServerResponse) => {
    try {
      const valuesFull: ResumeInformation = resumeData.information;

      if (valuesFull.languages && valuesFull.languages.length >= 1) {
        setValues({
          ...valuesFull.languages[0],
        });
        if (valuesFull.languages.length > 1) {
          let tmpList: Array<LanguageInformation> = [];
          valuesFull.languages.forEach((study, index, arr) => {
            if (index >= 1) {
              tmpList.push(study);
            }
          });
          setCardList(tmpList);
        }
      } else {
        setValues(initialLanguageForm);
      }
    } catch (error) {
      console.log("JSON Parse Error: ", error);
    }
  };

  const loadSelectOptions = async () => {
    setLanguageList(await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.LANGUAGE_LIST_OPTIONS));
    setLanguageLevel(await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.LANGUAGE_LEVEL_OPTIONS));
    setAffirmativeOption(await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.AFFIRMATIVE_LIST_OPTIONS));
  };
  // FORM FUNCTIONS

  // Card Functions
  const [cardList, setCardList] = useState<Array<LanguageInformation>>([]);

  const addCard = () => {
    //TODO: manually validate form.

    const list_item: LanguageInformation = {
      level: values.level,
      language: values.language,
      nativeLanguage: values.nativeLanguage,
      certificateAvailable: values.certificateAvailable,
    };

    setCardList((prevState) => {
      return [...prevState, list_item];
    });
    setValues(initialLanguageForm);
  };

  const removeCard = (listIndex: number) => {
    //TODO: manually validate form.

    const list_item: LanguageInformation = {
      level: values.level,
      language: values.language,
      nativeLanguage: values.nativeLanguage,
      certificateAvailable: values.certificateAvailable,
    };
    let tmpList = [...cardList];
    tmpList.splice(listIndex, 1);
    setCardList(tmpList);
  };
  // Card Functions

  useEffect(() => {    
    if (
      languageList.length === 0 ||
      languageLevel.length === 0 ||
      affirmativeOption.length === 0
    ) {
      loadSelectOptions();
    }
  },[]);

  useEffect(() => {
    if (siseResume) {
      //updateFormInfoSise(siseResume);
    }
    if (resumeData) {
      updateFormInfoDB(resumeData);
    }

    //console.log("resume | sise:", resumeData, siseResume);
  }, [siseResume, resumeData]);

  return (
    <div>
      <StepSection
        number={FORM_CURRENT_STEEP}
        descriptionStep="Idiomas"
        className=""
      />
      <NeutralNCText
        text="¿Qué idiomas hablas? Cuéntanos tus habilidades lingüísticas y potencia tu perfil."
        className="cf-text-principal-180 md:mb-9"
        fontSize="md"
      />
      <div className="w_full md:w-11/12 xl:w-2/3">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomSelectGray
              options={languageList}
              label="Idioma"
              name="language"
              title="Idioma"
              placeholder=""
              value={values.language}
              onChange={handleChange}
              classNameContainer=""
              errors={
                errors.language ? (
                  <NeutralBlackText
                    text={errors.language}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              options={languageLevel}
              label="Nivel de dominio"
              name="level"
              title="Nivel de dominio"
              placeholder=""
              value={values.level}
              onChange={handleChange}
              classNameContainer=""
              errors={
                errors.level ? (
                  <NeutralBlackText
                    text={errors.level}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              options={affirmativeOption}
              label="Tienes certificado por una institución el idioma"
              name="certificateAvailable"
              title="Tienes certificado por una institución el idioma"
              placeholder=""
              value={values.certificateAvailable ? "SI" : "NO"}
              onChange={handleChange}
              classNameContainer=""
              errors={
                errors.certificateAvailable ? (
                  <NeutralBlackText
                    text={errors.certificateAvailable}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              options={affirmativeOption}
              label="Es idioma nativo"
              name="nativeLanguage"
              title="Es idioma nativo"
              placeholder=""
              value={values.nativeLanguage ? "SI" : "NO"}
              onChange={handleChange}
              classNameContainer=""
              errors={
                errors.nativeLanguage ? (
                  <NeutralBlackText
                    text={errors.nativeLanguage}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
        </form>
        <CardManageSection className="mt-10">
          <ListActionCard
            key={"add-card"}
            name={"Quiero agregar otro idioma"}
            action={addCard}
            width={120}
            height={100}
            urlImage={"/icons/new-card-icon.png"}
            imageClassname={"w-[41px] h-[41px] md:ml-8 mx-auto"}
          />
          {cardList.map((card, index, array) => {
            return (
              <ListActionCard
                key={"study-card-" + index}
                name={`${card.language} - ${card.level}`}
                action={() => {
                  removeCard(index);
                }}
                width={120}
                height={100}
                urlImage={"/icons/fail.webp"}
                imageClassname={"w-[41px] h-[41px] md:ml-8 mx-auto"}
              />
            );
          })}
        </CardManageSection>
      </div>
    </div>
  );
};

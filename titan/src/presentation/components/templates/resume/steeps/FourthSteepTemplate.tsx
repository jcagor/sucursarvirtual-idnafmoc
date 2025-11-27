"use client";
import {
  CourseOrCertification,
  KnowledgeAndSkills,
  multiSelectValues,
  ResumeInformation,
  ResumeServerResponse,
} from "domain/models";
import * as Yup from "yup";
import {
  Button,
  CardManageSection,
  CustomInputGray,
  CustomTextarea,
  InputMultiSelectList,
  ListActionCard,
  NeutralBlackText,
  NeutralNCText,
  SecondaryText,
  SectionHeader,
  SkillManageSection,
  StepSection,
  ThridText,
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

export const FourthSteepResumeForm: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  previousSteepFn,
  formSelectOptionsFn,
  siseResume,
  resumeData,
}) => {
  // FORM FUNCTIONS

  const FORM_CURRENT_STEEP = RESUME_FORM_PAGE.KNOWLEDGE_AND_SKILL;

  const { data: session } = useSession();

  const [aptitudesList, setAptitudesList] = useState<Array<SelectOption>>([]);
  const [aptitudesListInitial, setAptitudesListInitial] = useState<
  Array<SelectOption>
  >([]);
  const [clearAptitudesList, setClearAptitudesList] = useState(false);

  const [knowledgeList, setKnowledgeList] = useState<Array<SelectOption>>([]);
  const [knowledgeListInitial, setKnowledgeListInitial] = useState<
  Array<SelectOption>
  >([]);
  const [clearKnowledgeList, setClearKnowledgeList] = useState(false);

  const initialCourseOrCertification = {
    formationName: "",
    institution: "",
    duration: "",
  } as CourseOrCertification;

  const initialSkillsForm: KnowledgeAndSkills = {
    knowledge: new Array<SelectOption>(),
    skills: new Array<SelectOption>(),
    additionalInformation: "",
    formationName: initialCourseOrCertification.formationName,
    institution: initialCourseOrCertification.institution,
    duration: initialCourseOrCertification.duration,
  };

  const validationSchema =
    new ResumeFormValidations().getFourthFormValidation();

  const onSubmit = async (skillsInformation: KnowledgeAndSkills) => {
    //console.log("SUBMIT PAGE KnowledgeAndSkills!", skillsInformation);
    //console.log("data:", skillsInformation);
    const token = session?.access_token ? session?.access_token : "";
    if (skillsInformation.skills) {
      const listCoursesOrCertifications = new Array<CourseOrCertification>();
      const formCourse = {
        formationName: skillsInformation.formationName,
        institution: skillsInformation.institution,
        duration: skillsInformation.duration,
      } as CourseOrCertification;
      listCoursesOrCertifications.push(formCourse);
      cardList.map((value, index, arr) => {
        listCoursesOrCertifications.push(value);
      });

      const knowledgeAndSkillsInfo: ResumeInformation = {
        generalInfo: undefined,
        education: undefined,
        languages: undefined,
        knowledgeAndSkills: {
          knowledge:skillsInformation.knowledge,
          skills: skillsInformation.skills,
          additionalInformation: skillsInformation.additionalInformation,
          coursesOrCertifications: listCoursesOrCertifications,
        },
        profileAndExperience: undefined,
      };

      const query = {
        curriculum: knowledgeAndSkillsInfo,
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
    }
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
    setFieldValue,
    getFieldProps,
  } = useFormik({
    initialValues: initialSkillsForm,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const updateFormInfoDB = (resumeData: ResumeServerResponse) => {
    try {
      const valuesFull: ResumeInformation = resumeData.information;

      if (
        valuesFull.knowledgeAndSkills?.coursesOrCertifications &&
        valuesFull.knowledgeAndSkills.coursesOrCertifications?.length >= 1
      ) {
        setFieldValue(
          "formationName",
          valuesFull.knowledgeAndSkills.coursesOrCertifications[0].formationName
        );
        setFieldValue(
          "institution",
          valuesFull.knowledgeAndSkills.coursesOrCertifications[0].institution
        );
        setFieldValue(
          "duration",
          valuesFull.knowledgeAndSkills.coursesOrCertifications[0].duration
        );

        if (valuesFull.knowledgeAndSkills.coursesOrCertifications.length > 1) {
          let tmpList: Array<CourseOrCertification> = [];
          valuesFull.knowledgeAndSkills.coursesOrCertifications.forEach(
            (study, index, arr) => {
              if (index >= 1) {
                tmpList.push(study);
              }
            }
          );
          setCardList(tmpList);
        }
      }

      if (
        valuesFull.knowledgeAndSkills?.knowledge &&
        valuesFull.knowledgeAndSkills?.knowledge.length >= 1
      ) {
        console.log("knowledge initial:", valuesFull.knowledgeAndSkills?.knowledge);
        setKnowledgeListInitial(valuesFull.knowledgeAndSkills?.knowledge);
      }

      if (
        valuesFull.knowledgeAndSkills?.skills &&
        valuesFull.knowledgeAndSkills?.skills.length >= 1
      ) {
        console.log("skills initial:", valuesFull.knowledgeAndSkills?.skills);
        setAptitudesListInitial(valuesFull.knowledgeAndSkills?.skills);

        if (valuesFull.knowledgeAndSkills?.additionalInformation){
          setFieldValue(
            "additionalInformation",
            valuesFull.knowledgeAndSkills.additionalInformation
          );
        }

      } else if (valuesFull.knowledgeAndSkills?.additionalInformation) {
        setFieldValue(
          "additionalInformation",
          valuesFull.knowledgeAndSkills.additionalInformation
        );
      } else {
        setValues(initialSkillsForm);
      }
    } catch (error) {
      console.log("JSON Parse Error: ", error);
    }
  };

  const loadSelectOptions = async () => {
    setAptitudesList(await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.SKILLS_LIST));
    setKnowledgeList(await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.KNOWLEDGE_LIST));
  };
  // FORM FUNCTIONS

  // Card Functions
  const [cardList, setCardList] = useState<Array<CourseOrCertification>>([]);

  const addCard = () => {
    //TODO: manually validate form.

    const list_item: CourseOrCertification = {
      formationName: values.formationName,
      institution: values.institution,
      duration: values.duration,
    };

    setCardList((prevState) => {
      return [...prevState, list_item];
    });

    setFieldValue("formationName", initialCourseOrCertification.formationName);
    setFieldValue("institution", initialCourseOrCertification.institution);
    setFieldValue("duration", initialCourseOrCertification.duration);
  };

  const removeCard = (listIndex: number) => {
    //TODO: manually validate form.

    const list_item: CourseOrCertification = {
      formationName: values.formationName,
      institution: values.institution,
      duration: values.duration,
    };
    let tmpList = [...cardList];
    tmpList.splice(listIndex, 1);
    setCardList(tmpList);
  };
  // Card Functions

  useEffect(() => {    
    if (aptitudesList.length === 0) {
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
        descriptionStep="Conocimientos y aptitudes"
        className=""
      />
      <NeutralNCText
        text="Cuéntanos sobre los conocimientos y las aptitudes que enriquecen tu perfil profesional."
        className="cf-text-principal-180 md:mb-9"
        fontSize="md"
      />
      <div className="w_full md:w-11/12 xl:w-2/3">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          <div className="w-full">

            <InputMultiSelectList
              name="knowledge"
              label="Conocimientos"
              getFieldPropsFormikFn={getFieldProps}
              setFieldValueFormikFn={setFieldValue}
              placeholder="Seleccione sus formaciones"
              data={knowledgeList}
              inputStyle={true}
              valuePreload={knowledgeListInitial}
              delimiter={5}
              codeLabel={true}
              clear={clearKnowledgeList}
              errors={errors.skills}
            />
            <div className="my-5">
            <InputMultiSelectList            
              name="skills"
              label="Aptitudes"
              getFieldPropsFormikFn={getFieldProps}
              setFieldValueFormikFn={setFieldValue}
              placeholder="Seleccione sus formaciones"
              data={aptitudesList}
              inputStyle={true}
              valuePreload={aptitudesListInitial}
              delimiter={5}
              codeLabel={true}
              clear={clearAptitudesList}
              errors={errors.skills}
            />
            </div>

            <SkillManageSection className="mt-2">
              <div></div>
            </SkillManageSection>
          </div>

          <NeutralNCText
            text="Si quieres compartir detalles adicionales que no encuentras en la lista escríbelos aquí."
            className="cf-text-principal-180 mt-9"
            fontSize="md"
          />
          <CustomTextarea
            name="additionalInformation"
            id="additionalInformation"
            title=""
            placeholder=""
            value={values.additionalInformation}
            onChange={handleChange}
            errors={
              errors.additionalInformation ? (
                <NeutralBlackText
                  text={errors.additionalInformation}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
          <SectionHeader
            descriptionStep="Cursos y certificaciones"
            className="my-5"
          />

          <div className="flex flex-col">
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CustomInputGray
                name="formationName"
                id="formationName"
                title="Nombre del curso o Certificación"
                placeholder="Técnico en Electricidad"
                value={values.formationName}
                onChange={handleChange}
                classNameContainer="normal-case"
                isCustomBorder
                borderColor="border-principal-400 border-2"
                errors={
                  errors.formationName ? (
                    <NeutralBlackText
                      text={errors.formationName}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
              <CustomInputGray
                name="institution"
                id="institution"
                title="Institución"
                placeholder="SENA"
                value={values.institution}
                onChange={handleChange}
                classNameContainer="normal-case"
                isCustomBorder
                borderColor="border-principal-400 border-2"
                errors={
                  errors.institution ? (
                    <NeutralBlackText
                      text={errors.institution}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
              <CustomInputGray
                name="duration"
                id="duration"
                title="Duración (Horas)"
                placeholder="100"
                value={values.duration}
                onChange={handleChange}
                classNameContainer="normal-case"
                isCustomBorder
                borderColor="border-principal-400 border-2"
                errors={
                  errors.duration ? (
                    <NeutralBlackText
                      text={errors.duration}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
            </div>
          </div>
        </form>

        <CardManageSection>
          <ListActionCard
            key={"add-card"}
            name={"Quiero agregar otro curso"}
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
                name={`${card.formationName} - ${card.institution}`}
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

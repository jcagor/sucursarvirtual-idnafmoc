import {
  EducationEntry,
  EducationInformation,
  ExperienceEntry,
  ProfileAndExperience,
  ResumeInformation,
  ResumeServerResponse,
  UserInformation,
} from "domain/models";
import * as Yup from "yup";
import {
  CardManageSection,
  CardText,
  CustomInputGray,
  CustomSelectGray,
  CustomTextarea,
  InputMultiSelectList,
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
import { ActionMenuCard } from "presentation/components/molecules/common/cards/ActionMenuCard";
import { DatePickerGrayInput } from "presentation/components/atoms/common/input/DatePickerGray";
import { FORM_DB_SELECT_OPTIONS, RESUME_FORM_PAGE, SelectOption } from "lib";
import { refreshAccessToken } from "actions";
import ModalEmployability from "presentation/components/atoms/common/modals/ModalEmployability";
import { ResumeFormValidations } from "../validations";
import { InputActionMeta } from "react-select";
import { toast } from "react-toastify";

export const FifthSteepResumeForm: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  previousSteepFn,
  formSelectOptionsFn,
  formFilterSelectOptionsFn,
  siseResume,
  resumeData,
  updateResumeDataFn,
}) => {
  // FORM FUNCTIONS

  const FORM_CURRENT_STEEP = RESUME_FORM_PAGE.PROFILE_AND_EXPERIENCE;

  const { data: session } = useSession();
  const [statusModal, setStatusModal] = useState(false);
  const [workRoleList, setWorkRoleList] = useState<Array<SelectOption>>([]);
  const [professionInitial, setProfessionInitial] = useState<
    Array<SelectOption>
  >([]);
  const [clearProfession, setClearProfession] = useState(false);

  const initialExperienceForm = {
    userProfile: "",
    businessName: "",
    workRole: Array<SelectOption>(),
    workRoleOpen: "",
    startDate: "",
    endDate: "",
    resultsDescription: "",
  };

  const initialExperience: ExperienceEntry = {
    businessName: "",
    workRole: Array<SelectOption>(),
    workRoleOpen: "",
    startDate: "",
    endDate: "",
    resultsDescription: "",
  };

  const initialInformation: ProfileAndExperience = {
    userProfile: "",
    userExperience: [],
  };

  const validationSchema = new ResumeFormValidations().getFifthFormValidation();

  const onSubmit = async (profileAndExperienceInfo: ExperienceEntry) => {
    //console.log("SUBMIT PAGE Experience!", profileAndExperienceInfo);
    const token = session?.access_token ? session?.access_token : "";

    initialInformation.userProfile = values.userProfile;
    initialInformation.userExperience.push(profileAndExperienceInfo);
    cardList.forEach((value, index, arr) => {
      initialInformation.userExperience.push(value);
    });

    const language_info: ResumeInformation = {
      generalInfo: undefined,
      education: undefined,
      languages: undefined,
      knowledgeAndSkills: undefined,
      profileAndExperience: initialInformation,
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
    //console.log("Server final response:", response);
    if (response.complete) {
      setStatusModal(true);
      if (updateResumeDataFn) {
        updateResumeDataFn();
      }
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
    initialValues: initialExperienceForm,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const updateFormInfoDB = (resumeData: ResumeServerResponse) => {
    try {
      const valuesFull: ResumeInformation = resumeData.information;

      if (
        valuesFull.profileAndExperience &&
        valuesFull.profileAndExperience.userExperience.length >= 1
      ) {
        if (
          valuesFull.profileAndExperience.userExperience[0].workRole !=
          undefined
        ) {
          setValues({
            ...valuesFull.profileAndExperience.userExperience[0],
            userProfile: valuesFull.profileAndExperience.userProfile,
          });
          if (valuesFull.profileAndExperience?.userExperience[0].workRole) {
            setProfessionInitial(
              valuesFull.profileAndExperience?.userExperience[0].workRole
            );
          }
        }
        if (valuesFull.profileAndExperience.userExperience.length > 1) {
          let tmpList: Array<ExperienceEntry> = [];
          valuesFull.profileAndExperience.userExperience.forEach(
            (experience, index, arr) => {
              if (index >= 1) {
                tmpList.push(experience);
              }
            }
          );
          setCardList(tmpList);
        }
      } else {
        setValues({
          ...initialExperienceForm,
          userProfile: values.userProfile,
        });
      }
    } catch (error) {
      console.log("JSON Parse Error: ", error);
    }
  };

  const loadSelectOptions = async () => {};

  const professionInputHandler = (input: string, event: InputActionMeta) => {
    const SELECT_FILTER_MIN_LENGTH = 3;

    setTimeout(async () => {
      if (
        formFilterSelectOptionsFn &&
        input.length >= SELECT_FILTER_MIN_LENGTH
      ) {
        const professionList = await formFilterSelectOptionsFn(
          FORM_DB_SELECT_OPTIONS.WORK_ROLE,
          input
        );
        setWorkRoleList(professionList);
      } else {
        setWorkRoleList([]);
      }
    }, 10);
  };
  // FORM FUNCTIONS

  // Card Functions
  const [cardList, setCardList] = useState<Array<ExperienceEntry>>([]);

  const addCard = () => {
    //TODO: manually validate form.

    const list_item: ExperienceEntry = {
      businessName: values.businessName,
      startDate: values.startDate,
      endDate: values.endDate,
      workRole: values.workRole,
      workRoleOpen: values.workRoleOpen,
      resultsDescription: values.resultsDescription,
    };

    setCardList((prevState) => {
      return [...prevState, list_item];
    });
    setValues({ ...initialExperienceForm, userProfile: values.userProfile });
  };

  const removeCard = (listIndex: number) => {
    //TODO: manually validate form.

    const list_item: ExperienceEntry = {
      businessName: values.businessName,
      startDate: values.startDate,
      endDate: values.endDate,
      workRole: values.workRole,
      workRoleOpen: values.workRoleOpen,
      resultsDescription: values.resultsDescription,
    };
    let tmpList = [...cardList];
    tmpList.splice(listIndex, 1);
    setCardList(tmpList);
  };
  // Card Functions

  useEffect(() => {
    if (workRoleList.length === 0) {
      loadSelectOptions();
    }
  }, []);

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
      <div className="w_full md:w-11/12 xl:w-2/3">
        <StepSection
          number={FORM_CURRENT_STEEP}
          descriptionStep="Perfil laboral"
          className=""
        />
        <NeutralNCText
          text="Describe tus habilidades, experiencia y lo que te hace único como profesional."
          className="cf-text-principal-180"
          fontSize="md"
        />
        <NeutralNCText
          text="¡Tu perfil es tu carta de presentación!"
          className="cf-text-principal-180 mb-[1rem] md:mb-2"
          fontSize="md"
        />

        <CustomTextarea
          name="userProfile"
          id="userProfile"
          title=""
          placeholder=""
          value={values.userProfile}
          onChange={handleChange}
          errors={
            errors.userProfile ? (
              <NeutralBlackText
                text={errors.userProfile}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <StepSection
          // Short section in the same page and form
          number={FORM_CURRENT_STEEP + 1}
          descriptionStep="Experiencia Profesional"
          className=""
        />
        <NeutralNCText
          text="Describe los roles que has desempeñado, tus logros y cómo has dejado huella en tu carrera."
          className="cf-text-principal-180 mb-[1rem] md:mb-2 mt-[1rem] md:mt-2"
          fontSize="md"
        />

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomInputGray
              name="businessName"
              id="businessName"
              title="Empresa"
              placeholder="Moodlines Studio"
              value={values.businessName}
              onChange={handleChange}
              classNameContainer=""
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.businessName ? (
                  <NeutralBlackText
                    text={errors.businessName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputGray
              name="workRoleOpen"
              id="workRoleOpen"
              title="Cargo"
              placeholder="Diseñador UI"
              value={values.workRoleOpen}
              onChange={handleChange}
              classNameContainer=""
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.workRoleOpen ? (
                  <NeutralBlackText
                    text={errors.workRoleOpen}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <InputMultiSelectList
              name="workRole"
              getFieldPropsFormikFn={getFieldProps}
              setFieldValueFormikFn={setFieldValue}
              placeholder="Escribe para buscar"
              data={workRoleList}
              label="Cargo equivalente"
              inputStyle={true}
              valuePreload={professionInitial}
              onChangeHandler={professionInputHandler}
              delimiter={1}
              codeLabel={true}
              clear={clearProfession}
              errors={errors.workRole}
            />

            <DatePickerGrayInput
              name="startDate"
              title="Fecha de Inicio"
              placeholder="19 | 05 | 1995"
              value={values.startDate}
              onChange={(value) => {
                setFieldValue("startDate", value);
              }}
              className="full-width-date-picker"
              inputClass="full-width-date-picker-input"
              inError={errors.startDate ? true : false}
            />

            <DatePickerGrayInput
              name="endDate"
              title="Fecha de Terminación"
              placeholder="19 | 05 | 2020"
              value={values.endDate}
              onChange={(value) => {
                setFieldValue("endDate", value);
              }}
              className="full-width-date-picker"
              inputClass="full-width-date-picker-input"
              inError={errors.startDate ? true : false}
            />
          </div>

          <NeutralNCText
            text="En este espacio escribe un breve resumen de las tareas realizadas y los resultados obtenidos."
            className="cf-text-principal-180 mb-[1rem] md:mb-2 mt-[1rem] md:mt-2"
            fontSize="md"
          />

          <NeutralNCText
            text="Ejemplo: “Lideré un equipo de 5 personas para implementar campañas que incrementaron las ventas en un 20%”"
            className="cf-text-principal-180 mb-[1rem] md:mb-2"
            fontSize="md"
          />

          <CustomTextarea
            name="resultsDescription"
            id="resultsDescription"
            title=""
            placeholder=""
            value={values.resultsDescription}
            onChange={handleChange}
            errors={
              errors.resultsDescription ? (
                <NeutralBlackText
                  text={errors.resultsDescription}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </form>

        <CardManageSection className="mt-10">
          <ListActionCard
            key={"add-card"}
            name={"Quiero agregar otra experiencia laboral"}
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
                name={`${card.businessName} - ${
                  card.workRole && card.workRole.length >= 1
                    ? card.workRole[0].label
                    : ""
                }`}
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
      {/* Modal de error */}
      {statusModal && (
        <ModalEmployability
          urlImage="/img/check_mark.png"
          title="¡Tu hoja de vida fue actualizada correctamente!"
          description={
            "Todo listo para destacar tus logros y experiencia. Ahora estás un paso más cerca de tu próxima oportunidad laboral."
          }
          primaryButtonText="Ver mi hoja de vida actualizada"
          onPrimaryClick={() => {
            setStatusModal(false);
            nextSteepFn();
          }}
          onSecondaryClick={() => {
            setStatusModal(false);
          }}
          hideSecondaryButton
        />
      )}
    </div>
  );
};

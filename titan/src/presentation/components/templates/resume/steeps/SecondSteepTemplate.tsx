import {
  EducationEntry,
  EducationInformation,
  ResumeInformation,
  ResumeServerResponse,
} from "domain/models";
import * as Yup from "yup";
import {
  CardManageSection,
  CardText,
  CustomInputGray,
  CustomSelectGray,
  CustomTextarea,
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
import { DatePickerGrayInput } from "presentation/components/atoms/common/input/DatePickerGray";
import { FORM_DB_SELECT_OPTIONS, RESUME_FORM_PAGE, SelectOption } from "lib";
import { ResumeFormValidations } from "../validations";
import { toast } from "react-toastify";

export const SecondSteepResumeForm: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  previousSteepFn,
  formSelectOptionsFn,
  siseResume,
  resumeData,
}) => {
  // FORM FUNCTIONS

  const FORM_CURRENT_STEEP = RESUME_FORM_PAGE.EDUCATION;

  const { data: session } = useSession();
  const [educationTitleList, setEducationTitleList] = useState<Array<SelectOption>>([]);

  const initialStudyForm = {
    institutionName: "",
    titleObtained: "",
    startDate: "",
    endDate: "",
    additionalInformation: "",
    educationTitleName:"",
  };

  const initialStudy: EducationEntry = {
    institutionName: "",
    titleObtained: "",
    educationTitleName:"",
    additionalInformation: "",
    startDate: "",
    endDate: "",
  };

  const initialInformation: EducationInformation = {
    studies: [],    
  };

  const validationSchema = new ResumeFormValidations().getSecondFormValidation();

  const onSubmit = async (educationInformation: EducationEntry) => {
    //console.log("SUBMIT PAGE UserInfo!", educationInformation);
    const token = session?.access_token;

    initialInformation.studies.push(educationInformation);
    cardList.map((value, index, arr)=>{initialInformation.studies.push(value)});    

    const language_info: ResumeInformation = {
      generalInfo: undefined,
      education: initialInformation,
      languages: undefined,
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

    if (token){
      const response = await saveResumeInformation.execute(query, token);
      if (!response) {
        toast.error("¡Se ha producido un error al contactar el servidor!");
        return;
      }
      nextSteepFn();
    }
  };

  const updateFormInfoDB = (resumeData: ResumeServerResponse) => {
    try {
      const valuesFull: ResumeInformation = resumeData.information;

      if (valuesFull.education  && valuesFull.education.studies.length>=1){
        setValues(
          {
            ...
            valuesFull.education.studies[0],            
          })
          if (valuesFull.education.studies.length > 1){
            let tmpList:Array<EducationEntry> = []
            valuesFull.education.studies.forEach((study, index, arr)=>{
              if (index>=1){
                tmpList.push(study);
              }
            })
            setCardList(tmpList);
          }
        }
        else{
          setValues(initialStudyForm);
        }      
    } catch (error) {
      console.log("JSON Parse Error: ", error);
    }
  };
  const loadSelectOptions = async() =>{
    setEducationTitleList( await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.EDUCATION_TITLE_OPTIONS));
  };

  // Card Functions
  const [cardList, setCardList] = useState<Array<EducationEntry>>([]);

  const addCard = () => {
    //TODO: manually validate form.

    const list_item:EducationEntry = {
      startDate:values.startDate,
      endDate:values.endDate,
      additionalInformation: values.additionalInformation,
      educationTitleName: values.educationTitleName,
      titleObtained:values.titleObtained,
      institutionName:values.institutionName,      
    }

    setCardList(prevState => { return [... prevState, list_item]; });
    setValues({...initialStudy});
  }

  const removeCard = (listIndex:number) => {
    //TODO: manually validate form.

    const list_item:EducationEntry = {
      startDate:values.startDate,
      endDate:values.endDate,
      additionalInformation: values.additionalInformation,
      titleObtained:values.titleObtained,
      educationTitleName: values.educationTitleName,
      institutionName:values.institutionName,      
    }
    let tmpList = [...cardList];
    tmpList.splice(listIndex, 1);    
    setCardList(tmpList);    
  }
  // Card Functions

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: initialStudyForm,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });
  // FORM FUNCTIONS

  useEffect(()=>{    
    if (educationTitleList.length === 0 ){
      loadSelectOptions();
    }
  }, []);

  useEffect(() => {
    if (siseResume) {
      //updateFormInfoSise(siseResume);
    }
    if (resumeData) {
      updateFormInfoDB(resumeData)
    }

    //console.log("resume | sise:", resumeData, siseResume);
  }, [siseResume, resumeData]);

  return (
    <div>
      <StepSection
        number={FORM_CURRENT_STEEP}
        descriptionStep="Nivel Educativo"
        className=""
      />
      <NeutralNCText
        text="Indica los estudios que has completado y cualquier formación adicional."
        className="cf-text-principal-180"
        fontSize="md"
      />
      <NeutralNCText
        text="¡Cada aprendizaje cuenta en tu camino profesional!"
        className="cf-text-principal-180 mb-[1rem] md:mb-9"
        fontSize="md"
      />
      <div className="w_full md:w-11/12 xl:w-2/3">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomInputGray
              name="institutionName"
              id="institutionName"
              title="Institución Educativa"
              placeholder="Colegio Campo Real"
              value={values.institutionName}
              onChange={handleChange}
              classNameContainer=""
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.institutionName ? (
                  <NeutralBlackText
                    text={errors.institutionName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectGray
              options={educationTitleList}
              label="Nivel educativo"
              name="titleObtained"
              title="Nivel educativo"
              placeholder="Bachiller Técnico"
              value={values.titleObtained}
              onChange={handleChange}
              classNameContainer=""
              errors={
                errors.titleObtained ? (
                  <NeutralBlackText
                    text={errors.titleObtained}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputGray
              name="educationTitleName"
              id="educationTitleName"
              title="Nombre título obtenido"
              placeholder="Contador Publico"
              value={values.educationTitleName}
              onChange={handleChange}
              classNameContainer=""
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.educationTitleName ? (
                  <NeutralBlackText
                    text={errors.educationTitleName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
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
              inError={
                errors.startDate ? true: false
              }
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
              inError={
                errors.endDate ? true: false
              }
            />
          </div>
          <NeutralNCText
            text="Si quieres compartir detalles adicionales como proyectos destacados, honores recibidos o experiencias relevantes durante la formación escríbelo aquí."
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
        </form>
        <CardManageSection>

        <ListActionCard
            key={"add-card"}
            name={"Quiero agregar otra experiencia educativa"}
            action={addCard}
            width={120}
            height={100}
            urlImage={"/icons/new-card-icon.png"}
            imageClassname={
              "w-[41px] h-[41px] md:ml-8 mx-auto"
            }
          />
          {
            cardList.map((card, index, array) =>{
              return <ListActionCard
                key={"study-card-"+index}
                name={`${card.institutionName} - ${card.titleObtained}`}
                action={()=>{removeCard(index)}}
                width={120}
                height={100}
                urlImage={"/icons/fail.webp"}
                imageClassname={
                  "w-[41px] h-[41px] md:ml-8 mx-auto"
                }
              />
            })
          }          
        </CardManageSection>
      </div>
    </div>
  );
};

import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import {
  CheckboxTerms,
  CustomInputOne,
  CustomSelectGray,
  CustomTextarea,
  InputMultiSelectList,
  NeutralBlackText,
  NeutralNCText,
  SectionSeparator,
} from "presentation/components/atoms";
import { useEffect, useState } from "react";
import { ResumeFormValidations } from "../validations";
import {
  FORM_DB_SELECT_OPTIONS,
  FORM_JOB_REGISTER_PAGES,
  SelectOption,
} from "lib";
import { FormProps } from "lib/types/form";
import { SteepSection } from "presentation/components/molecules";
import {
  SaveVacancyFormInformation,
  VacantRegisterForm,
  VacantSpecificRequirements,
} from "domain/models";
import { appContainer } from "infrastructure/ioc/inversify.config";
import SaveJobVacancyRegisterFormUseCase from "domain/usecases/Fomento/saveVacancyRegister.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

export const SpecificRequirementsOneFormSteep: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  previousSteepFn,
  formSelectOptionsFn,
  dataStorageSetFn,
  dataStorageGetFn,
}) => {
  // FORM FUNCTIONS

  const FORM_CURRENT_STEEP = FORM_JOB_REGISTER_PAGES.GENERAL_INFO;

  const { data: session } = useSession();

  const [affirmativeSelect, setAffirmativeSelect] =
    useState<Array<SelectOption>>();
  const [studyTypeSelect, setStudyTypeSelect] = useState<Array<SelectOption>>();
  const [reqLanguageSelect, setReqLanguageSelect] =
    useState<Array<SelectOption>>();
  const [reqLanguageLevelSelect, setReqLanguageLevelSelect] =
    useState<Array<SelectOption>>();
  const [disabilityTypeSelect, setDisabilityTypeSelect] =
    useState<Array<SelectOption>>();
  const [workDaysSelect, setWorkDaysSelect] = useState<Array<SelectOption>>();
  const [vehicleTypeSelect, setVehicleTypeSelect] =
    useState<Array<SelectOption>>();
  const [laboralGestorSelect, setLaboralGestorSelect] =
    useState<Array<SelectOption>>();
  const [licenseTypeSelect, setLicenseTypeSelect] =
    useState<Array<SelectOption>>();
  const [experienceRangeSelect, setExperienceRangeSelect] =
    useState<Array<SelectOption>>();

  const validationSchema =
    new ResumeFormValidations().getSpecificRequirementsFormValidation();

  const initialValues: VacantSpecificRequirements = {
    reqStudies: "",
    reqStudyTitle: "",
    reqCertification: "",
    reqMinExperience: "",
    reqSecondLanguage: "",
    reqLanguageLevel: "",
    reqLanguage: "",
    reqTravel: "",
    reqDisabilityOK: "",
    reqSectorExperience: "",
    reqPersonalInCharge: "",
    reqDisabilityType: "",
    reqWorkTime: "",
    reqWorkDays: "",
    reqVehicle: "",
    reqDriveLicense: "",
    reqDriveLicenseType:"",
    reqVehicleType: "",
    reqLikeWorkShop: "",
    reqLaboralGestorAssigned: "",
    reqObservations: "",
    reqDataPolicyOK: "",
  };

  const onSubmit = async (specificRequirements: VacantSpecificRequirements) => {
    console.log("SUBMIT PAGE Specific Requirements!", specificRequirements);
    const token = session?.access_token ? session?.access_token : "";

    //dataStorageSetFn(specificRequirements);

    const saveJobVacancyInformation =
      appContainer.get<SaveJobVacancyRegisterFormUseCase>(
        USECASES_TYPES._SaveJobVacancyRegisterFormUseCase
      );
    try {
      const steepData = dataStorageGetFn();
      let query = { ...steepData } as VacantRegisterForm;
      query = { ...query, ...specificRequirements };

      console.log("SUBMIT", query, specificRequirements, steepData);
      const response = await saveJobVacancyInformation.execute(query, token);

      const solicitudeNumber = response?.sequence;
      const solicitudeStatus = "En proceso de validación";

      if (response?.sequence && response.sequence >= 1) {
        const submitInformation = {
          solicitudeNumber: solicitudeNumber + "",
          solicitudeStatus: solicitudeStatus,
        } as SaveVacancyFormInformation;

        dataStorageSetFn(submitInformation);
        nextSteepFn();
      } else {
        console.error("Save form error, sequence not found!");
      }
    } catch (error) {
      console.error("Error al guardar la información:", error);
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
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const updateFormInfoDB = (formData: VacantSpecificRequirements) => {
    console.log("set initial data:", formData);
    try {
      setValues(formData);
    } catch (error) {
      console.log("Internal Error: ", error);
    }
  };

  const loadSelectOptions = async () => {
    setAffirmativeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.AFFIRMATIVE_LIST_OPTIONS)
    );
    setStudyTypeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.EDUCATION_TITLE_OPTIONS)
    );
    setExperienceRangeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.EXPERIENCE_RANGE)
    );
    setReqLanguageSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.VACANCY_REQ_LANGUAGE)
    );
    setDisabilityTypeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.DISABILITY_TYPE)
    );
    setWorkDaysSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.WORK_DAYS)
    );
    setVehicleTypeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.VEHICLE_TYPE)
    );
    setLaboralGestorSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.LABORAL_GESTOR)
    );
    setReqLanguageLevelSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.LANGUAGE_LEVEL_OPTIONS)
    );
    setLicenseTypeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.LICENSE_TYPE)
    );
  };

  // FORM FUNCTIONS

  useEffect(() => {
    //refreshAccessToken;
    loadSelectOptions();
  }, []);

  useEffect(() => {
    console.log("FORMIK errors: ", errors);
  }, [errors]);

  return (
    <div className="w_full md:w-11/12 xl:w-2/3">
      <SteepSection
        number={4}
        descriptionStep="Requisitos Específicos"
        className=""
      />
      <NeutralNCText
        text="Indica los requisitos esenciales que debe cumplir el candidato para el cargo."
        className="cf-text-principal-180 md:mb-5"
        fontSize="md"
      />
      <SectionSeparator />

      <div className="">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomSelectGray
              name="reqStudies"
              label="Nivel académico requerido"
              placeholder=""
              defaultValue={values.reqStudies}
              value={values.reqStudies}
              options={studyTypeSelect ?? []}
              onChange={handleChange}
              errors={
                errors.reqStudies ? (
                  <NeutralBlackText
                    text={errors.reqStudies}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="reqStudyTitle"
              id="reqStudyTitle"
              title="Titulo de formación académica"
              type="text"
              placeholder="Titulo de formación académica"
              value={values.reqStudyTitle}
              onChange={handleChange}
              errors={
                errors.reqStudyTitle ? (
                  <NeutralBlackText
                    text={errors.reqStudyTitle}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="reqCertification"
              id="reqCertification"
              title="Certificaciones específicas para el cargo"
              type="text"
              placeholder="Certificaciones específicas para el cargo"
              value={values.reqCertification}
              onChange={handleChange}
              errors={
                errors.reqCertification ? (
                  <NeutralBlackText
                    text={errors.reqCertification}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqMinExperience"
              label="Experiencia mínima requerida"
              placeholder=""
              defaultValue={values.reqMinExperience}
              value={values.reqMinExperience}
              options={experienceRangeSelect ?? []}
              onChange={handleChange}
              errors={
                errors.reqMinExperience ? (
                  <NeutralBlackText
                    text={errors.reqMinExperience}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqSecondLanguage"
              label="¿Requiere un segundo idioma?"
              placeholder=""
              defaultValue={values.reqSecondLanguage}
              value={values.reqSecondLanguage}
              options={affirmativeSelect ? affirmativeSelect : []}
              onChange={handleChange}
              errors={
                errors.reqSecondLanguage ? (
                  <NeutralBlackText
                    text={errors.reqSecondLanguage}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqLanguage"
              label="Segundo idioma requerido"
              placeholder=""
              defaultValue={values.reqLanguage}
              value={values.reqLanguage}
              options={reqLanguageSelect ? reqLanguageSelect : []}
              onChange={handleChange}
              readOnly={values.reqSecondLanguage.toLowerCase() == "no"}
              errors={
                errors.reqLanguage ? (
                  <NeutralBlackText
                    text={errors.reqLanguage}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqLanguageLevel"
              label="Nivel de proficiencia"
              placeholder=""
              defaultValue={values.reqLanguageLevel}
              value={values.reqLanguageLevel}
              options={reqLanguageLevelSelect ?? []}
              onChange={handleChange}
              readOnly={values.reqSecondLanguage.toLowerCase() == "no"}
              errors={
                errors.reqLanguageLevel ? (
                  <NeutralBlackText
                    text={errors.reqLanguageLevel}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqDisabilityOK"
              label="¿Acepta discapacidad?"
              placeholder=""
              defaultValue={values.reqDisabilityOK}
              value={values.reqDisabilityOK}
              options={affirmativeSelect ?? []}
              onChange={handleChange}
              errors={
                errors.reqDisabilityOK ? (
                  <NeutralBlackText
                    text={errors.reqDisabilityOK}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqDisabilityType"
              label="Tipo de discapacidad"
              placeholder=""
              defaultValue={values.reqDisabilityType}
              value={values.reqDisabilityType}
              options={disabilityTypeSelect ? disabilityTypeSelect : []}
              onChange={handleChange}
              readOnly={
                values.reqDisabilityOK.toLowerCase() === "no" ? true : false
              }
              errors={
                errors.reqDisabilityType ? (
                  <NeutralBlackText
                    text={errors.reqDisabilityType}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqTravel"
              label="¿Requiere viajar?"
              placeholder=""
              defaultValue={values.reqTravel}
              value={values.reqTravel}
              options={affirmativeSelect ? affirmativeSelect : []}
              onChange={handleChange}
              errors={
                errors.reqTravel ? (
                  <NeutralBlackText
                    text={errors.reqTravel}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            {/*
              <CustomSelectGray
              name="reqSectorExperience"
              label="¿Experiencia en sector específico?"
              placeholder=""
              defaultValue={values.reqSectorExperience}
              value={values.reqSectorExperience}
              options={affirmativeSelect ? affirmativeSelect : []}
              onChange={handleChange}
              errors={
                errors.reqSectorExperience ? (
                  <NeutralBlackText
                    text={errors.reqSectorExperience}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
              */}

            <CustomInputOne
              name="reqSectorExperience"
              id="reqSectorExperience"
              title="¿Requiere experiencia específica en algún sector? "
              type="text"
              placeholder="Experiencia"
              value={values.reqSectorExperience}
              onChange={handleChange}
              errors={
                errors.reqSectorExperience ? (
                  <NeutralBlackText
                    text={errors.reqSectorExperience}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqPersonalInCharge"
              label="¿Tiene personal a cargo?"
              placeholder=""
              defaultValue={values.reqPersonalInCharge}
              value={values.reqPersonalInCharge}
              options={affirmativeSelect ? affirmativeSelect : []}
              onChange={handleChange}
              errors={
                errors.reqPersonalInCharge ? (
                  <NeutralBlackText
                    text={errors.reqPersonalInCharge}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="reqWorkTime"
              id="reqWorkTime"
              title="Horario de trabajo"
              type="text"
              placeholder="Horario de trabajo"
              value={values.reqWorkTime}
              onChange={handleChange}
              errors={
                errors.reqWorkTime ? (
                  <NeutralBlackText
                    text={errors.reqWorkTime}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>

          <NeutralNCText
            text="Indica los días de la semana en los que se llevará a cabo la jornada laboral."
            className="cf-text-principal-180 md:my-5 font-bold"
            fontSize="md"
          />

          <div className="w-full">
            <InputMultiSelectList
              name="reqWorkDays"
              getFieldPropsFormikFn={getFieldProps}
              setFieldValueFormikFn={setFieldValue}
              placeholder="Seleccionar días"
              data={workDaysSelect ? workDaysSelect : []}
              valuePreload={[]} //state
              delimiter={7}
              codeLabel={true}
              clear={false} //state
              errors={errors.reqWorkDays}
            />
          </div>

          <div className="w-full mt-5 grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomSelectGray
              name="reqVehicle"
              label="¿Requiere vehículo?"
              placeholder=""
              defaultValue={values.reqVehicle}
              value={values.reqVehicle}
              options={affirmativeSelect ?? []}
              onChange={handleChange}
              errors={
                errors.reqVehicle ? (
                  <NeutralBlackText
                    text={errors.reqVehicle}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqVehicleType"
              label="Tipo de vehículo"
              placeholder=""
              defaultValue={values.reqVehicleType}
              value={values.reqVehicleType}
              options={vehicleTypeSelect ? vehicleTypeSelect : []}
              onChange={handleChange}
              readOnly={values.reqVehicle.toLowerCase() == "no"}
              errors={
                errors.reqVehicleType ? (
                  <NeutralBlackText
                    text={errors.reqVehicleType}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqDriveLicense"
              label="¿Requiere licencia de conducción?"
              placeholder=""
              defaultValue={values.reqDriveLicense}
              value={values.reqDriveLicense}
              options={affirmativeSelect ?? []}
              onChange={handleChange}
              errors={
                errors.reqDriveLicense ? (
                  <NeutralBlackText
                    text={errors.reqDriveLicense}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="reqDriveLicenseType"
              label="Tipo de licencia de conducción"
              placeholder=""
              defaultValue={values.reqDriveLicenseType}
              value={values.reqDriveLicenseType}
              options={licenseTypeSelect ?? []}
              onChange={handleChange}              
              readOnly={values.reqDriveLicense.toLowerCase() == "no"}
              errors={
                errors.reqDriveLicenseType ? (
                  <NeutralBlackText
                    text={errors.reqDriveLicenseType}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            {/* 
              <CustomSelectGray
              name="reqLikeWorkShop"
              label="¿Te interesa participar en talleres?"
              placeholder=""
              defaultValue={values.reqLikeWorkShop}
              value={values.reqLikeWorkShop}
              options={affirmativeSelect ? affirmativeSelect : []}
              onChange={handleChange}
              errors={
                errors.reqLikeWorkShop ? (
                  <NeutralBlackText
                    text={errors.reqLikeWorkShop}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            */}

            <input type="hidden" value={"NO"} name={"reqLikeWorkShop"} />

            {/* <CustomSelectGray
              name="reqLaboralGestorAssigned"
              label="Gestor laboral asignado"
              placeholder=""
              defaultValue={values.reqLaboralGestorAssigned}
              value={values.reqLaboralGestorAssigned}
              options={laboralGestorSelect ? laboralGestorSelect : []}
              onChange={handleChange}
              errors={
                errors.reqLaboralGestorAssigned ? (
                  <NeutralBlackText
                    text={errors.reqLaboralGestorAssigned}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            /> */}
            <input type="hidden" value={"pending"} name={"reqLaboralGestorAssigned"} />
          </div>

          <div className="my-5">
            <CustomTextarea
              name="reqObservations"
              id="reqObservations"
              title="Observaciones"
              placeholder="Descripción de funciones"
              value={values.reqObservations}
              onChange={handleChange}
              errors={
                errors.reqObservations ? (
                  <NeutralBlackText
                    text={errors.reqObservations}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>

          <div className="my-5">
            <CheckboxTerms
              name="reqDataPolicyOK"
              value={values.reqDataPolicyOK}
              onChange={handleChange}
              errors={
                errors.reqDataPolicyOK ? (
                  <NeutralBlackText
                    text={errors.reqDataPolicyOK}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

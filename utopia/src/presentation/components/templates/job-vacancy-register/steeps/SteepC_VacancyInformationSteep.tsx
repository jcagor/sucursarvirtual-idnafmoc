import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import {
  CustomInputIcon,
  CustomInputOne,
  CustomSelectGray,
  CustomTextarea,
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
import { VacantInformation, VacantRegisterForm } from "domain/models";
import { MdAttachMoney } from "react-icons/md";
import InputMultiSelectListNew from "presentation/components/atoms/common/select/InputMultiSelectListNew";
import { InputActionMeta } from "react-select";
import { appContainer } from "infrastructure/ioc/inversify.config";
import GetSelectOptionsFormUseCase from "domain/usecases/Business/userFormGetSelectOptions.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

export const VacancyInformationFormSteep: React.FC<FormProps> = ({
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

  // form select options
  const [attentionPointList, setAttentionPointList] =
    useState<Array<SelectOption>>();
  const [municipalityList, setMunicipalityListList] =
    useState<Array<SelectOption>>();
  const [vacantOriginList, setVacantOriginList] =
    useState<Array<SelectOption>>();  
  const [countryList, setCountryList] =
    useState<Array<SelectOption>>();
  const [hiringTypeSelect, setHiringTypeSelect] =
    useState<Array<SelectOption>>();
  const [workModeSelect, setWorkModeSelect] = useState<Array<SelectOption>>();
  const [salaryRangeSelect, setSalaryRangeSelect] =
    useState<Array<SelectOption>>();
  const [workRoleList, setWorkRoleList] = useState<Array<SelectOption>>([]);
  const [professionInitial, setProfessionInitial] = useState<
    Array<SelectOption>
  >([]);
  const [clearProfession, setClearProfession] = useState(false);
  const [workRoleSelected, setWorkRoleSelected] = useState<any | undefined>(
    undefined
  );

  const validationSchema =
    new ResumeFormValidations().getVacantInformationFormValidation();

  const initialValues: VacantInformation = {
    workRole: [],
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
      return [];
    }
    //console.log("Form SELECT Options for", optionsName," :", response);
    return response;
  };

  const professionInputHandler = (input: string, event: InputActionMeta) => {
    const SELECT_FILTER_MIN_LENGTH = 3;

    setTimeout(async () => {
      if (input.length >= SELECT_FILTER_MIN_LENGTH) {
        const professionList = await getSelectFilteredOptions(
          FORM_DB_SELECT_OPTIONS.WORK_ROLE,
          input
        );
        setWorkRoleList(professionList);
      } else {
        setWorkRoleList([]);
      }
    }, 10);
  };

  const onSubmit = async (jobVacantInfo: VacantInformation) => {
    console.log("SUBMIT PAGE Vacant Info!", jobVacantInfo);
    const token = session?.access_token ? session?.access_token : "";

    dataStorageSetFn(jobVacantInfo);

    nextSteepFn();
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

  const updateFormInfoDB = (formData: VacantRegisterForm) => {
    console.log("set initial data:", formData);
    try {
      setValues(formData);
    } catch (error) {
      console.log("Internal Error: ", error);
    }
  };

  const loadSelectOptions = async () => {
    setVacantOriginList(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.VACANCY_ORIGIN)
    );
    setCountryList(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.COUNTRY_LIST)
    );
    setHiringTypeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.HIRING_TYPE)
    );
    setAttentionPointList(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.ATTENTION_POINT)
    );
    setMunicipalityListList(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.MUNICIPALITY_LIST)
    );
    setWorkModeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.WORK_MODE)
    );
    setSalaryRangeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.SALARY_RANGE)
    );
  };
  // FORM FUNCTIONS

  useEffect(() => {
    const currentValues = dataStorageGetFn();
    updateFormInfoDB(currentValues);
    loadSelectOptions();
  }, []);

  useEffect(() => {
    console.log("FORMIK errors: ", errors);
  }, [errors]);

  useEffect(() => {
    workRoleList.find((item) => {
      if (item.value === values.workRole[0].value) {
        // @ts-expect-error
        setFieldValue("vacantName", item.role);
        // @ts-expect-error
        setFieldValue("vacantCUOCCode", item.cuoc_code);
        // @ts-expect-error
        setFieldValue("vacantOccupation", item.occupations);
        setFieldValue(
          "vacantOccupationalDenominationCode",
          // @ts-expect-error
          item.denomination_code
        );
      }
    });
  }, [values.workRole]);

  useEffect(()=>{

  }, [values.vacantOrigin]);

  return (
    <div className="w_full md:w-11/12 xl:w-2/3">
      <SteepSection
        number={3}
        descriptionStep="Información de la Vacante"
        className=""
      />
      <NeutralNCText
        text="Ingresa los detalles de la vacante para encontrar el talento ideal para tu empresa."
        className="cf-text-principal-180 md:mb-5"
        fontSize="md"
      />
      <SectionSeparator />

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
        {/* <div className="my-3">
          <CustomInputOne
            name="vacantName"
            id="vacantName"
            title="Titulo de la vacante"
            type="text"
            placeholder="Titulo de la vacante "
            value={values.vacantName}
            onChange={handleChange}
            errors={
              errors.vacantName ? (
                <NeutralBlackText
                  text={errors.vacantName}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div> */}

        <div className="my-3">
          <InputMultiSelectListNew
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
        </div>

        <div className="">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomInputOne
              name="vacantName"
              id="vacantName"
              title="Titulo de la vacante"
              type="text"
              placeholder="Titulo de la vacante "
              value={values.vacantName}
              onChange={handleChange}
              disabled={true}
            />

            <CustomInputOne
              name="vacantCUOCCode"
              id="vacantCUOCCode"
              title="Código CUOC"
              type="text"
              placeholder="Código CUOC"
              value={values.vacantCUOCCode}
              onChange={handleChange}
              disabled={true}
              errors={
                errors.vacantCUOCCode ? (
                  <NeutralBlackText
                    text={errors.vacantCUOCCode}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="vacantOccupation"
              id="vacantOccupation"
              title="Ocupación"
              type="text"
              placeholder="Ocupación"
              value={values.vacantOccupation}
              onChange={handleChange}
            />

            <CustomInputOne
              name="vacantOccupationalDenominationCode"
              id="vacantOccupationalDenominationCode"
              title="Código denominación ocupacional"
              type="text"
              placeholder="Código denominación ocupacional"
              value={values.vacantOccupationalDenominationCode}
              onChange={handleChange}
              disabled={true}
              errors={
                errors.vacantOccupationalDenominationCode ? (
                  <NeutralBlackText
                    text={errors.vacantOccupationalDenominationCode}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="vacantConfidentialRequirements"
              id="vacantConfidentialRequirements"
              title="Requisitos Confidenciales"
              type="text"
              placeholder="Requisitos Confidenciales"
              value={values.vacantConfidentialRequirements}
              onChange={handleChange}
              errors={
                errors.vacantConfidentialRequirements ? (
                  <NeutralBlackText
                    text={errors.vacantConfidentialRequirements}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              name="vacantNumber"
              id="vacantNumber"
              title="Número de cupos"
              type="text"
              placeholder="Número de cupos"
              value={values.vacantNumber}
              onChange={handleChange}
              errors={
                errors.vacantNumber ? (
                  <NeutralBlackText
                    text={errors.vacantNumber}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="vacantHiringType"
              label="Tipo de contratación"
              placeholder=""
              defaultValue={values.vacantHiringType}
              value={values.vacantHiringType}
              options={hiringTypeSelect ? hiringTypeSelect : []}
              onChange={handleChange}
              errors={
                errors.vacantHiringType ? (
                  <NeutralBlackText
                    text={errors.vacantHiringType}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            {/* <CustomInputOne
              name="vacantOrigin"
              id="vacantOrigin"
              title="Origen de la vacante"
              type="text"
              placeholder="Origen de la vacante"
              value={values.vacantOrigin}
              onChange={handleChange}
              errors={
                errors.vacantOrigin ? (
                  <NeutralBlackText
                    text={errors.vacantOrigin}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            /> */}

            <CustomSelectGray
              name="vacantOrigin"
              label="Origen de la vacante"
              placeholder=""
              defaultValue={values.vacantOrigin}
              value={values.vacantOrigin}
              options={vacantOriginList??[]}
              onChange={handleChange}
              errors={
                errors.vacantOrigin ? (
                  <NeutralBlackText
                    text={errors.vacantOrigin}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="vacantCountry"
              label="País de procedencia"
              placeholder=""
              defaultValue={values.vacantCountry}
              value={values.vacantCountry}
              options={countryList??[]}
              readOnly={(values.vacantOrigin.toLowerCase() != "internacional")}
              onChange={handleChange}
              errors={
                errors.vacantCountry ? (
                  <NeutralBlackText
                    text={errors.vacantCountry}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="vacantLegalRequirements"
              id="vacantLegalRequirements"
              title="Requisitos legales/migratorios"
              type="text"
              placeholder="Requisitos legales/migratorios"
              value={values.vacantLegalRequirements}
              disabled={(values.vacantOrigin.toLowerCase() != "internacional")}
              onChange={handleChange}
              errors={
                errors.vacantLegalRequirements ? (
                  <NeutralBlackText
                    text={errors.vacantLegalRequirements}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="vacantWorkMode"
              label="Modalidad de trabajo"
              placeholder=""
              defaultValue={values.vacantWorkMode}
              value={values.vacantWorkMode}
              options={workModeSelect ? workModeSelect : []}
              onChange={handleChange}
              errors={
                errors.vacantWorkMode ? (
                  <NeutralBlackText
                    text={errors.vacantWorkMode}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="vacantWorkRegion"
              label="Municipio de trabajo"
              placeholder=""
              defaultValue={values.vacantWorkRegion}
              value={values.vacantWorkRegion}
              options={municipalityList ?? []}
              onChange={handleChange}
              errors={
                errors.vacantWorkRegion ? (
                  <NeutralBlackText
                    text={errors.vacantWorkRegion}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="vacantSalaryRangeMin"
              label="Rango salarial"
              placeholder=""
              defaultValue={values.vacantSalaryRangeMin}
              value={values.vacantSalaryRangeMin}
              options={salaryRangeSelect ? salaryRangeSelect : []}
              onChange={handleChange}
              errors={
                errors.vacantSalaryRangeMin ? (
                  <NeutralBlackText
                    text={errors.vacantSalaryRangeMin}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="vacantSalary"
              id="vacantSalary"
              title="Salario"
              type="text"
              placeholder="Salario"
              value={values.vacantSalary}              
              onChange={handleChange}
              errors={
                errors.vacantSalary ? (
                  <NeutralBlackText
                    text={errors.vacantSalary}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="vacantAttentionPoint"
              label="Punto de atención"
              placeholder=""
              defaultValue={values.vacantAttentionPoint}
              value={values.vacantAttentionPoint}
              options={attentionPointList ? attentionPointList : []}
              onChange={handleChange}
              errors={
                errors.vacantAttentionPoint ? (
                  <NeutralBlackText
                    text={errors.vacantAttentionPoint}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
        </div>

        <div className="my-7">
          <CustomTextarea
            name="vacantHabilitesDescription"
            id="vacantHabilitesDescription"
            title="Descripción de funciones"
            placeholder="Descripción de funciones"
            value={values.vacantHabilitesDescription}
            onChange={handleChange}
            errors={
              errors.vacantHabilitesDescription ? (
                <NeutralBlackText
                  text={errors.vacantHabilitesDescription}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <div className="my-5"></div>

          <CustomTextarea
            name="vacantKnowledgeAndSkillsDescription"
            id="vacantKnowledgeAndSkillsDescription"
            title="Conocimientos y habilidades"
            placeholder="Conocimientos y habilidades"
            value={values.vacantKnowledgeAndSkillsDescription}
            onChange={handleChange}
            errors={
              errors.vacantKnowledgeAndSkillsDescription ? (
                <NeutralBlackText
                  text={errors.vacantKnowledgeAndSkillsDescription}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>
      </form>
    </div>
  );
};

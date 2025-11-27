import {
  ResumeInformation,
  ResumeServerResponse,
  UserInformation,
} from "domain/models";
import * as Yup from "yup";
import {
  CustomInputGray,
  CustomSelectGray,
  InputMultiSelectList,
  LabelInput,
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
import {
  calculateAge,
  FORM_DB_SELECT_OPTIONS,
  RESUME_FORM_PAGE,
  SelectOption,
  UserDataInterface,
  UserDataRetrieved,
  UserSiseResumeInformation,
} from "lib";
import { ResumeFormValidations } from "../validations";
import { DateObject } from "react-multi-date-picker";
import { InputActionMeta } from "react-select";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { KeycloakProfile } from "next-auth/providers/keycloak";
import { decodeUserInfoFromToken } from "lib/helpers/generateUserData";

export const FirstSteepResumeForm: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  formSelectOptionsFn,
  formFilterSelectOptionsFn,
  previousSteepFn,
  siseResume,
  resumeData,
}) => {
  // FORM FUNCTIONS
  const FORM_CURRENT_STEEP = RESUME_FORM_PAGE.GENERAL_INFO;

  const { data: session } = useSession();
  const [userInfoReadOnly, setUserInfoReadOnly] = useState(false);

  const [cityOptionList, setCityOptionList] = useState<Array<SelectOption>>([]);
  const [genderOptionList, setGenderOptionList] = useState<Array<SelectOption>>(
    []
  );

  const [professionOptionList, setProfessionOptionList] = useState<
    Array<SelectOption>
  >([]);
  const [professionInitial, setProfessionInitial] = useState<
    Array<SelectOption>
  >([]);
  const [clearProfession, setClearProfession] = useState(false);

  const initialValues: UserInformation = {
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    documentNumber: 0,
    documentType: "",
    gender: "",
    profession: [],
    age: "",
    birthdate: "",
    address: "",
    emailAddress: "",
    cellphone: "",
    city: "",
  };

  const validationSchema = new ResumeFormValidations().getFirstFormValidation();

  const onSubmit = async (generalValues: UserInformation) => {
    const token = session?.access_token ? session?.access_token : "";

    const curriculum_page: ResumeInformation = {
      generalInfo: generalValues,
      knowledgeAndSkills: undefined,
      languages: undefined,
      education: undefined,
      profileAndExperience: undefined,
    };

    const query = {
      curriculum: curriculum_page,
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
    //console.log("Response Form: ", response);
    nextSteepFn();
  };

  const updateFormInfoDB = (resumeData: ResumeServerResponse) => {
    try {
      const valuesFull: ResumeInformation = resumeData.information;
      console.log("Values", valuesFull);
      if (valuesFull.generalInfo) {
        setValues(valuesFull.generalInfo);

        if (valuesFull.generalInfo?.profession) {
          setProfessionInitial(valuesFull.generalInfo?.profession);
        }
      }
    } catch (error) {
      console.log("JSON Parse Error: ", error);
    }
  };

  const loadSelectOptions = async () => {
    const citiesList = await formSelectOptionsFn(
      FORM_DB_SELECT_OPTIONS.CITY_LIST
    );
    setCityOptionList(citiesList);

    const genderList = await formSelectOptionsFn(
      FORM_DB_SELECT_OPTIONS.GENDER_LIST
    );
    setGenderOptionList(genderList);
  };

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
        setProfessionOptionList(professionList);
      } else {
        setProfessionOptionList([]);
      }
    }, 10);
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

  const updateFormInfoSise = (resumeSise: UserSiseResumeInformation) => {
    const newValues: UserInformation = {
      firstName: resumeSise.firstName,
      secondName: resumeSise.secondName,
      firstLastName: resumeSise.firstLastName,
      secondLastName: resumeSise.secondLastName,
      documentNumber: +resumeSise.identificationNumber,
      documentType: resumeSise.identificationType,
      birthdate: "",
      gender: "",
      profession: [],
      age: "",
      address: "",
      emailAddress: "",
      cellphone: "",
      city: "",
    };
    setValues(newValues);
  };

  const updateFormInfoToken = (token: UserDataInterface) => {
    const userData = decodeUserInfoFromToken(token);

    const newValues: UserInformation = {
      firstName: userData.firstName ?? "",
      secondName: userData.firstLastName ?? "",
      firstLastName: userData.middleName ?? "",
      secondLastName: userData.middleLastName ?? "",
      documentNumber: userData.document_number
        ? parseInt(userData.document_number)
        : 0,
      documentType: userData.document_type ?? "",
      birthdate: "",
      gender: "",
      profession: [],
      age: "",
      address: "",
      emailAddress: userData.email ?? "",
      cellphone: userData.phoneNumber ?? "",
      city: "",
    };
    setValues(newValues);
  };
  // FORM FUNCTIONS

  useEffect(() => {
    loadSelectOptions();
    setUserInfoReadOnly(false);

    if (siseResume) {
      updateFormInfoSise(siseResume);
    } else {
      const token = session?.access_token ? session?.access_token : "";
      const userInfo: UserDataInterface = jwtDecode(token);
      updateFormInfoToken(userInfo);
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
        descriptionStep="Datos Personales"
        className=""
      />
      <NeutralNCText
        text="Completa tu Información personal"
        className="cf-text-principal-180 mb-[2rem] md:mb-9"
        fontSize="md"
      />
      <div className="w_full md:w-11/12 xl:w-2/3">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomInputGray
              name="firstName"
              id="firstName"
              title="Primer nombre"
              placeholder="Juan"
              value={values.firstName}
              readOnly={userInfoReadOnly}
              onChange={handleChange}
              classNameContainer="normal-case"
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.firstName ? (
                  <NeutralBlackText
                    text={errors.firstName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputGray
              name="secondName"
              title="Segundo nombre"
              placeholder="Manuel"
              value={values.secondName}
              readOnly={userInfoReadOnly}
              onChange={handleChange}
              classNameContainer="normal-case"
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.secondName ? (
                  <NeutralBlackText
                    text={errors.secondName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputGray
              name="firstLastName"
              title="Primer apellido"
              placeholder="Perez"
              value={values.firstLastName}
              readOnly={userInfoReadOnly}
              onChange={handleChange}
              classNameContainer="normal-case"
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.firstLastName ? (
                  <NeutralBlackText
                    text={errors.firstLastName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputGray
              name="secondLastName"
              title="Segundo apellido"
              placeholder="Gomez"
              value={values.secondLastName}
              readOnly={userInfoReadOnly}
              onChange={handleChange}
              classNameContainer="normal-case"
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.secondLastName ? (
                  <NeutralBlackText
                    text={errors.secondLastName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <LabelInput
              name="identificationNumber"
              title="Tipo de identificación y número"
              placeholder="12345646789"
              label_id="identificationType"
              label_name="identificationType"
              label_value={values.documentType}
              value={values.documentNumber}
              readOnly={userInfoReadOnly}
              onChange={handleChange}
              classNameContainer=""
              errors={
                errors.documentNumber ? (
                  <NeutralBlackText
                    text={errors.documentNumber}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <DatePickerGrayInput
              name="birthdate"
              title="Fecha de nacimiento"
              placeholder="Seleccionar Fecha"
              value={values.birthdate}
              onChange={(value) => {
                setFieldValue("birthdate", value);
                if (value instanceof DateObject) {
                  const age = calculateAge(
                    `${value.year}-${value.month}-${value.day}`
                  );
                  setFieldValue("age", age);
                }
              }}
              className="full-width-date-picker"
              inputClass="full-width-date-picker-input placeholder-principal-440"
              inError={errors.birthdate ? true : false}
            />

            <CustomSelectGray
              options={genderOptionList}
              label="Genero"
              name="gender"
              title="Genero"
              placeholder=""
              value={values.gender}
              onChange={handleChange}
              classNameContainer=""
              errors={
                errors.gender ? (
                  <NeutralBlackText
                    text={errors.gender}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <InputMultiSelectList
              name="profession"
              getFieldPropsFormikFn={getFieldProps}
              setFieldValueFormikFn={setFieldValue}
              placeholder="Escribe para buscar el cargo"
              data={professionOptionList}
              label="Cargo"
              inputStyle={true}
              valuePreload={professionInitial}
              onChangeHandler={professionInputHandler}
              delimiter={1}
              codeLabel={true}
              clear={clearProfession}
              errors={errors.profession}
            />

            <CustomInputGray
              name="address"
              title="Dirección registrada"
              placeholder="Carrera 23 No 26b - 46"
              value={values.address}
              onChange={handleChange}
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.address ? (
                  <NeutralBlackText
                    text={errors.address}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              options={cityOptionList}
              label="Ciudad"
              name="city"
              title="Ciudad"
              placeholder="Cali"
              value={values.city}
              onChange={handleChange}
              classNameContainer=""
              errors={
                errors.city ? (
                  <NeutralBlackText
                    text={errors.city}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputGray
              name="cellphone"
              title="Celular"
              placeholder="3xx xxx xxxx"
              value={values.cellphone}
              onChange={handleChange}
              classNameContainer=""
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.cellphone ? (
                  <NeutralBlackText
                    text={errors.cellphone}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputGray
              name="emailAddress"
              title="Correo electrónico"
              placeholder="mi_correo@dominio.com"
              value={values.emailAddress}
              onChange={handleChange}
              classNameContainer=""
              isCustomBorder
              borderColor="border-principal-400 border-2"
              errors={
                errors.emailAddress ? (
                  <NeutralBlackText
                    text={errors.emailAddress}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <input
              name="age"
              type="hidden"
              value={values.age}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

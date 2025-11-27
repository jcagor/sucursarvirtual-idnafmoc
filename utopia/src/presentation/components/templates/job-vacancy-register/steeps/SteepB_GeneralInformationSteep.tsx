import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import {
  BigTextBanner,
  CustomInputOne,
  CustomSelectGray,
  NeutralBlackText,
  NeutralNCText,
  SectionSeparator,
} from "presentation/components/atoms";
import { useEffect, useState } from "react";
import { ResumeFormValidations } from "../validations";
import { FORM_DB_SELECT_OPTIONS, FORM_JOB_REGISTER_PAGES, SelectOption } from "lib";
import { FormProps } from "lib/types/form";
import { SteepSection } from "presentation/components/molecules";
import { SteepOneJobForm, VacantRegisterForm } from "domain/models";
import { appContainer } from "infrastructure/ioc/inversify.config";

export const GeneralInformationFormSteep: React.FC<FormProps> = ({
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
  const [sectorSelectList, setSectorSelectList] = useState<Array<SelectOption>>();
  const [affirmativeSelect, setAffirmativeSelect] = useState<Array<SelectOption>>();
  const [businessTypeSelect, setBusinessTypeSelect ] = useState<Array<SelectOption>>();

  const initialValues: SteepOneJobForm = {
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
  };

  const validationSchema =
    new ResumeFormValidations().getGeneralInformationFormValidation();

  const onSubmit = async (generalInformation: SteepOneJobForm) => {
    console.log("SUBMIT PAGE General Info!", generalInformation);
    const token = session?.access_token ? session?.access_token : "";

    //Store info
    dataStorageSetFn(generalInformation);

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
    setAffirmativeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.AFFIRMATIVE_LIST_OPTIONS)
    );
    setBusinessTypeSelect(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.BUSINESS_TYPE)
    );
    setSectorSelectList(
      await formSelectOptionsFn(FORM_DB_SELECT_OPTIONS.CIIU_CODE_LIST)
    );
  };
  // FORM FUNCTIONS

  useEffect(() => {
    //refreshAccessToken;
    loadSelectOptions();
    const currentValues = dataStorageGetFn();
    updateFormInfoDB(currentValues);
  }, []);

  useEffect(() => {
    console.log("FORMIK errors: ", errors);
  }, [errors]);

  return (
    <div>
      <SteepSection
        number={1}
        descriptionStep="Información de la Empresa"
        className=""
      />
      <NeutralNCText
        text="Ingresa la dirección y datos de contacto de tu empresa."
        className="cf-text-principal-180 md:mb-5"
        fontSize="md"
      />
      <SectionSeparator />
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
        <div className="w_full md:w-11/12 xl:w-2/3">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomInputOne
              name="name"
              id="name"
              title="Nombre de la empresa"
              type="text"
              placeholder="Nombre de la empresa"
              value={values.name}
              onChange={handleChange}
              errors={
                errors.name ? (
                  <NeutralBlackText
                    text={errors.name}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="nit"
              id="nit"
              title="NIT"
              type="text"
              placeholder="901 473 055"
              value={values.nit}
              onChange={handleChange}
              errors={
                errors.nit ? (
                  <NeutralBlackText
                    text={errors.nit}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="comfandiAffiliated"
              label="¿Está afiliada a Comfandi?"
              placeholder=""
              defaultValue={values.comfandiAffiliated}
              value={values.comfandiAffiliated}
              options={affirmativeSelect?affirmativeSelect:[]}
              onChange={handleChange}
              errors={
                errors.comfandiAffiliated ? (
                  <NeutralBlackText
                    text={errors.comfandiAffiliated}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="businessSector"
              label="Sector empresarial"
              placeholder=""
              defaultValue={values.businessSector}
              value={values.businessSector}
              options={sectorSelectList?sectorSelectList:[]}
              onChange={handleChange}
              errors={
                errors.businessSector ? (
                  <NeutralBlackText
                    text={errors.businessSector}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="address"
              id="address"
              title="Dirección"
              type="text"
              placeholder="AV 6A# 28 NORTE - 09"
              value={values.address}
              onChange={handleChange}
              errors={
                errors.address ? (
                  <NeutralBlackText
                    text={errors.address}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="location"
              id="location"
              title="Ubicación"
              type="text"
              placeholder="Ubicación"
              value={values.location}
              onChange={handleChange}
              errors={
                errors.location ? (
                  <NeutralBlackText
                    text={errors.location}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="telephone"
              id="telephone"
              title="Teléfono"
              type="text"
              placeholder="Ingrese el télefono de la empresa"
              value={values.telephone}
              onChange={handleChange}
              errors={
                errors.telephone ? (
                  <NeutralBlackText
                    text={errors.telephone}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectGray
              name="businessType"
              label="Tipo de empresa:"
              placeholder=""
              defaultValue={values.businessType}
              value={values.businessType}
              options={businessTypeSelect?businessTypeSelect:[]}
              onChange={handleChange}
              errors={
                errors.businessType ? (
                  <NeutralBlackText
                    text={errors.businessType}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="businessSize"
              id="businessSize"
              title="Tamaño de la empresa"
              type="text"
              placeholder="Tamaño de la empresa"
              value={values.businessSize}
              onChange={handleChange}
              errors={
                errors.businessSize ? (
                  <NeutralBlackText
                    text={errors.businessSize}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
        </div>

        <BigTextBanner text={values.address} />
        <div className="w_full md:w-11/12 xl:w-2/3"></div>

        <SteepSection
          number={2}
          descriptionStep="Información del Solicitante"
          className="mt-5"
        />
        <NeutralNCText
          text="Ingresa tus datos de contacto como solicitante."
          className="cf-text-principal-180 md:mb-5"
          fontSize="md"
        />
        <SectionSeparator />

        <div className="w_full md:w-11/12 xl:w-2/3">
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CustomInputOne
              name="applicantName"
              id="applicantName"
              title="Nombre del solicitante"
              type="text"
              placeholder="Nombre del solicitante"
              value={values.applicantName}
              onChange={handleChange}
              errors={
                errors.applicantName ? (
                  <NeutralBlackText
                    text={errors.applicantName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              name="applicantOccupation"
              id="applicantOccupation"
              title="Cargo del solicitante"
              type="text"
              placeholder="Cargo del solicitante"
              value={values.applicantOccupation}
              onChange={handleChange}
              errors={
                errors.applicantOccupation ? (
                  <NeutralBlackText
                    text={errors.applicantOccupation}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              name="identificationNumber"
              id="identificationNumber"
              title="Documento de identidad"
              type="text"
              placeholder="Documento de identidad"
              value={values.identificationNumber}
              onChange={handleChange}
              errors={
                errors.identificationNumber ? (
                  <NeutralBlackText
                    text={errors.identificationNumber}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              name="applicantPhone"
              id="applicantPhone"
              title="Teléfono"
              type="text"
              placeholder="Teléfono"
              value={values.applicantPhone}
              onChange={handleChange}
              errors={
                errors.applicantPhone ? (
                  <NeutralBlackText
                    text={errors.applicantPhone}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
};

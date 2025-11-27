"use client";
import { City, Department } from "domain/models";
import { FormikProps } from "formik";
import {
  ACADEMIC_LEVEL,
  ETNICHITY,
  GENDER,
  INDIGENOUS_ETNICHITY_CODE,
  KINDSHIP_SPOUCE_VALUE,
  KINDSHIP_STEPSON_VALUE,
  OCUPATION,
  ONE_ANSWER,
  SelectOption,
  SEXUAL_PREFERENCE,
  VULNERABILITY_FACT,
} from "lib";
import {
  CustomInputOne,
  CustomSelectOne,
  NeutralBlackText,
} from "presentation/components/atoms";
import { FC, useEffect, useState } from "react";
import { FormModuleOnePacsValuesType } from "./FormModuleOnePacs";
import { useAppSelector } from "presentation/store";

export type FormSecondModulePacsValuesType = {
  firstName?: string | undefined;
  secondName?: string | undefined;
  firstLastName?: string | undefined;
  secondLastName?: string | undefined;
  gender?: string | undefined;
  educationalLevel?: string | undefined;
  hasBothParents?: string | undefined;
  residenceDepartment?: string | undefined;
  residenceCity?: string | undefined;
  sexualPreference?: string | undefined;
  vulnerabilityFactor?: string | undefined;
  ethnicity?: string | undefined;
  shelter?: string | undefined;
  village?: string | undefined;
};

type FormPropsType = {
  classnameContainer?: string;
  departmentOptions?: Department[];
  cityOptions?: City[];
  reserveOptions: SelectOption[];
  communityOptions: SelectOption[];
  formik: FormikProps<
    FormSecondModulePacsValuesType & FormModuleOnePacsValuesType
  >;
};
export const FormSecondModulePacs: FC<FormPropsType> = ({
  classnameContainer,
  departmentOptions,
  cityOptions,
  reserveOptions,
  communityOptions,
  formik,
}) => {
  const rnecState = useAppSelector((state) => state.rnec.stateRnec);
  // ========== Constants ==========
  const departmentOptionsMapped: SelectOption[] | undefined =
    departmentOptions?.map((departmentItem) => {
      return {
        value: departmentItem.code.toString(),
        label: departmentItem.name,
      };
    });

  // ========== UseStates ==========
  const [cityOptionsMapped, setCityOptionsMapped] = useState<
    SelectOption[] | undefined
  >([]);

  // ========== Set Cities per Department ==========
  const setCitiesOptions = (departmentSapCode: string | undefined) => {
    // Clean previous City Data
    formik.setFieldValue("residenceCity", "", false);
    const getSelectedDepartmentData = departmentOptions?.find(
      (departmentItem) => departmentItem.code.toString() == departmentSapCode
    );
    const cityOptionsMappedAux: SelectOption[] | undefined = cityOptions
      ?.filter(
        (cityOptionItem) =>
          cityOptionItem.departmentId == getSelectedDepartmentData?.id
      )
      .map((cityItem) => {
        return {
          value: cityItem.code.toString(),
          label: cityItem.name,
        };
      });
    setCityOptionsMapped(cityOptionsMappedAux);
  };

  // Triggered each time there's a new selected department
  useEffect(() => {
    setCitiesOptions(formik.values.residenceDepartment);
  }, [formik.values.residenceDepartment]);

  return (
    <div
      className={`${
        classnameContainer ??
        "flex flex-wrap overflow-y-scroll no-scrollbar w-full py-6"
      }`}
    >
      <div className="flex-col">
        <form onSubmit={formik.handleSubmit} className="m-0 p-0">
          <div className="grid grid-cols-1 2lg:grid-cols-2 grid-flow-row gap-3">
            <CustomInputOne
              id="firstName"
              label="Primer nombre"
              value={formik.values.firstName}
              disabled={rnecState === "SUCCESS"}
              onChange={(val) => {
                formik.setFieldValue(
                  "firstName",
                  val.target.value.toUpperCase(),
                  true
                );
              }}
              errors={
                formik.errors.firstName ? (
                  <NeutralBlackText
                    text={formik.errors.firstName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              label="Segundo nombre"
              value={formik.values.secondName}
              disabled={rnecState === "SUCCESS"}
              onChange={(val) => {
                formik.setFieldValue(
                  "secondName",
                  val.target.value.toUpperCase(),
                  false
                );
              }}
              errors={
                formik.errors.secondName ? (
                  <NeutralBlackText
                    text={formik.errors.secondName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              label="Primer apellido"
              value={formik.values.firstLastName}
              disabled={rnecState === "SUCCESS"}
              onChange={(val) => {
                formik.setFieldValue(
                  "firstLastName",
                  val.target.value.toUpperCase(),
                  true
                );
              }}
              errors={
                formik.errors.firstLastName ? (
                  <NeutralBlackText
                    text={formik.errors.firstLastName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              label="Segundo apellido"
              value={formik.values.secondLastName}
              disabled={rnecState === "SUCCESS"}
              onChange={(val) => {
                formik.setFieldValue(
                  "secondLastName",
                  val.target.value.toUpperCase(),
                  false
                );
              }}
              errors={
                formik.errors.secondLastName ? (
                  <NeutralBlackText
                    text={formik.errors.secondLastName}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectOne
              label="Género"
              value={formik.values.gender}
              onChange={(val) => {
                formik.setFieldValue("gender", val.target.value, true);
              }}
              options={GENDER}
              errors={
                formik.errors.gender ? (
                  <NeutralBlackText
                    text={formik.errors.gender}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              label="Nivel académico"
              value={formik.values.educationalLevel}
              onChange={(val) => {
                formik.setFieldValue(
                  "educationalLevel",
                  val.target.value,
                  true
                );
              }}
              options={ACADEMIC_LEVEL}
              errors={
                formik.errors.educationalLevel ? (
                  <NeutralBlackText
                    text={formik.errors.educationalLevel}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            {/* ONLY RENDER WHEN ETNICHITY EQUALD TO INDIGENOUS */}
            {formik.values.kindship == KINDSHIP_STEPSON_VALUE && (
              <>
                <CustomSelectOne
                  label="Cuenta con ambos padres en Registro Civil"
                  value={formik.values.hasBothParents}
                  onChange={(val) => {
                    formik.setFieldValue(
                      "hasBothParents",
                      val.target.value,
                      false
                    );
                  }}
                  options={ONE_ANSWER}
                  errors={
                    formik.errors.hasBothParents ? (
                      <NeutralBlackText
                        text={formik.errors.hasBothParents}
                        className="text-principal-500"
                      ></NeutralBlackText>
                    ) : null
                  }
                />
              </>
            )}
            <CustomSelectOne
              label="Departamento de Residencia"
              value={formik.values.residenceDepartment}
              onChange={(val) => {
                formik.setFieldValue(
                  "residenceDepartment",
                  val.target.value,
                  true
                );
              }}
              options={
                departmentOptionsMapped ??
                ([{ label: "", value: "" }] as SelectOption[])
              }
              errors={
                formik.errors.residenceDepartment ? (
                  <NeutralBlackText
                    text={formik.errors.residenceDepartment}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              label="Municipio de Residencia"
              value={formik.values.residenceCity}
              onChange={(val) => {
                formik.setFieldValue("residenceCity", val.target.value, true);
              }}
              options={
                cityOptionsMapped ??
                ([{ label: "", value: "" }] as SelectOption[])
              }
              errors={
                formik.errors.residenceCity ? (
                  <NeutralBlackText
                    text={formik.errors.residenceCity}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              label="Orientación sexual"
              value={formik.values.sexualPreference}
              onChange={(val) => {
                formik.setFieldValue(
                  "sexualPreference",
                  val.target.value,
                  true
                );
              }}
              options={SEXUAL_PREFERENCE}
              errors={
                formik.errors.sexualPreference ? (
                  <NeutralBlackText
                    text={formik.errors.sexualPreference}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              label="Factor de Vulnerabilidad"
              value={formik.values.vulnerabilityFactor}
              onChange={(val) => {
                formik.setFieldValue(
                  "vulnerabilityFactor",
                  val.target.value,
                  true
                );
              }}
              options={VULNERABILITY_FACT}
              errors={
                formik.errors.vulnerabilityFactor ? (
                  <NeutralBlackText
                    text={formik.errors.vulnerabilityFactor}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              label="Pertenencia Étnica"
              value={formik.values.ethnicity}
              onChange={(val) => {
                formik.setFieldValue("ethnicity", val.target.value, true);
              }}
              options={ETNICHITY}
              errors={
                formik.errors.ethnicity ? (
                  <NeutralBlackText
                    text={formik.errors.ethnicity}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            {/* ONLY RENDER WHEN ETNICHITY EQUALD TO INDIGENOUS */}
            {formik.values.ethnicity == INDIGENOUS_ETNICHITY_CODE && (
              <>
                <CustomSelectOne
                  label="Resguardo"
                  value={formik.values.shelter}
                  onChange={(val) => {
                    formik.setFieldValue("shelter", val.target.value, true);
                  }}
                  options={reserveOptions}
                  errors={
                    formik.errors.shelter ? (
                      <NeutralBlackText
                        text={formik.errors.shelter}
                        className="text-principal-500"
                      ></NeutralBlackText>
                    ) : null
                  }
                />
                <CustomSelectOne
                  label="Pueblo indígena"
                  value={formik.values.village}
                  onChange={(val) => {
                    formik.setFieldValue("village", val.target.value, true);
                  }}
                  options={communityOptions}
                  errors={
                    formik.errors.village ? (
                      <NeutralBlackText
                        text={formik.errors.village}
                        className="text-principal-500"
                      ></NeutralBlackText>
                    ) : null
                  }
                />
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

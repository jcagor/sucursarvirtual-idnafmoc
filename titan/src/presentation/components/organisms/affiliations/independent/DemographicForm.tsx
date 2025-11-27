"use client";
import { City, Department } from "domain/models";
import { FormikProps } from "formik";
import {
  ACADEMIC_LEVEL,
  CIVIL_STATUS,
  ETNICHITY,
  GENDER,
  INDIGENOUS_ETNICHITY_CODE,
  SelectOption,
  SEXUAL_PREFERENCE,
  VULNERABILITY_FACT,
} from "lib";
import {
  CustomSelectOne,
  NeutralBlackText,
  YesNoSelect,
} from "presentation/components/atoms";
import { FC, useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";

export type DemographicFormValuesType = {
  civilStatus?: string | undefined;
  gender?: string | undefined;
  educationalLevel?: string | undefined;
  sexualPreference?: string | undefined;
  vulnerabilityFactor?: string | undefined;
  nationality?: string | undefined;
  ethnicity?: string | undefined;
  shelter?: string | undefined;
  village?: string | undefined;
  residenceCity?: string | undefined;
  residenceDepartment?: string | undefined;
  taxi?: string | undefined;
  foreignNationality?: string | undefined;
};
type FormPropsType = {
  nationsOptions: SelectOption[];
  reserveOptions: SelectOption[];
  communityOptions: SelectOption[];
  classnameContainer: string;
  isTaxi: boolean;
  isForeign?: boolean;
  formik: FormikProps<DemographicFormValuesType>;
};

export const DemographicForm: FC<FormPropsType> = ({
  classnameContainer,
  nationsOptions,
  reserveOptions,
  communityOptions,
  isTaxi,
  isForeign = false,
  formik,
}) => {
  return (
    <div
      className={`flex flex-wrap overflow-y-scroll no-scrollbar ${classnameContainer}`}
    >
      <div className="flex-col">
        <form onSubmit={formik.handleSubmit} className="m-0 p-0">
          <div className="grid grid-cols-2 grid-flow-row gap-x-16 gap-y-6">
            <CustomSelectOne
              label="Estado Civil*"
              value={formik.values.civilStatus}
              onChange={(val) => {
                formik.setFieldValue("civilStatus", val.target.value, false);
              }}
              options={CIVIL_STATUS}
              errors={
                formik.errors.civilStatus ? (
                  <NeutralBlackText
                    text={formik.errors.civilStatus}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              label="Género*"
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
              label="Nivel académico*"
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
            <CustomSelectOne
              label="Orientación sexual*"
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
              label="Factor de Vulnerabilidad*"
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
              label="Nacionalidad*"
              value={formik.values.nationality}
              onChange={(val) => {
                formik.setFieldValue("nationality", val.target.value, true);
              }}
              options={nationsOptions}
              errors={
                formik.errors.nationality ? (
                  <NeutralBlackText
                    text={formik.errors.nationality}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomSelectOne
              label="Pertenencia Étnica*"
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
                  label="Resguardo*"
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
                  label="Pueblo indígena*"
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

            {isForeign && (
              <CustomSelectOne
                label="Pais de residencia*"
                value={formik.values.foreignNationality}
                onChange={(val) => {
                  formik.setFieldValue(
                    "foreignNationality",
                    val.target.value,
                    true
                  );
                }}
                options={nationsOptions}
                errors={
                  formik.errors.foreignNationality ? (
                    <NeutralBlackText
                      text={formik.errors.foreignNationality}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
            )}

            {isTaxi && (
              <YesNoSelect
                label="Taxista Independiente*"
                isSelected={true}
                onClickButton={(val: any) => {
                  formik.setFieldValue("taxi", val, true);
                }}
                errors={
                  formik.errors.residenceCity ? (
                    <NeutralBlackText
                      text={formik.errors.residenceCity}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

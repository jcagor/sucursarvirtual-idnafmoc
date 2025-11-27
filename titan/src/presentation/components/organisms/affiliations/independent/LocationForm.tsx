"use client";
import { City, Department } from "domain/models";
import { FormikProps } from "formik";
import { SelectOption } from "lib";
import {
  CustomInputOne,
  CustomSelectOne,
  NeutralBlackText,
} from "presentation/components/atoms";
import { FC, useEffect, useState } from "react";

export type LocationFormValuesType = {
  residenceDepartment?: string | undefined;
  residenceCity?: string | undefined;
  cellphone?: string | undefined;
};
type FormPropsType = {
  classnameContainer?: string;
  departmentOptions?: Department[];
  cityOptions?: City[];
  isCellphone?: boolean;
  formik: FormikProps<LocationFormValuesType>;
};

export const LocationForm: FC<FormPropsType> = ({
  classnameContainer,
  departmentOptions,
  cityOptions,
  isCellphone = false,
  formik,
}) => {
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
      className={`flex flex-wrap overflow-y-scroll no-scrollbar ${classnameContainer}`}
    >
      <div className="flex-col">
        <form onSubmit={formik.handleSubmit} className="m-0 p-0">
          <div className="grid grid-cols-2 grid-flow-row gap-x-16 gap-y-6">
            <CustomSelectOne
              label="Departamento"
              value={formik.values.residenceDepartment}
              onChange={(val) => {
                formik.setFieldValue(
                  "residenceDepartment",
                  val.target.value,
                  false
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
              label="Ciudad"
              value={formik.values.residenceCity}
              onChange={(val) => {
                formik.setFieldValue("residenceCity", val.target.value, false);
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
            {isCellphone && (
              <CustomInputOne
                id="income"
                title="Celular*"
                label=""
                value={formik.values.cellphone}
                onChange={(val) => {
                  formik.setFieldValue(
                    "cellphone",
                    val.target.value.toUpperCase(),
                    true
                  );
                }}
                errors={
                  formik.errors.cellphone ? (
                    <NeutralBlackText
                      text={formik.errors.cellphone}
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

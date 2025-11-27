"use client";
import { FormikProps } from "formik";
import {
  CIVIL_STATUS,
  CIVIL_STATUS_SPOUCE,
  OCUPATION,
  SALARY_TYPE,
  SelectOption,
} from "lib";
import {
  CustomInputOne,
  CustomSelectOne,
  Divider,
  NeutralBlackText,
  SearchSelectorAndTextInput,
  SecondaryText,
} from "presentation/components/atoms";
import { useState, type FC } from "react";

export type SpouceEmployeeFormValuesType = {
  salaryType?: string | undefined;
  salary?: string | undefined;
  documentType?: string | undefined;
  document?: string | undefined;
  civilStatus?: string | undefined;
  ocupation?: string | undefined;
};

type FormPropsType = {
  documentTypes: SelectOption[];
  classnameContainer?: string;
  formTitle?: string;
  formik: FormikProps<SpouceEmployeeFormValuesType>;
  smm: number;
};
export const SpouceEmployeeForm: FC<FormPropsType> = ({
  documentTypes,
  classnameContainer,
  formTitle,
  formik,
  smm,
}) => {
  const [formattedValue, setFormattedValue] = useState("");

  const formatCurrency = (value: any) => {
    // Solo permite números y punto decimal
    const numberValue = value.replace(/[^0-9.]/g, "");

    // Formatea el valor con comas como separadores de miles
    const formatted = new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(numberValue);

    return formatted;
  };

  const validateSalary = (val: any, type: string) => {
    let inputText;
    let inputType;
    if (type == "type") {
      inputType = val.target.value;
      inputText = "0";
    } else {
      inputText = val.target.value.replace(/[^0-9]/g, "");
      inputType = formik.values.salaryType;
    }

    if (Number(inputText) < smm) {
      formik.setFieldError(
        "salary",
        "El salario no puede ser menor al salario mínimo mensual"
      );
    } else {
      formik.setFieldError("salary", "");
    }

    if (inputType == "01") {
      if (Number(inputText) < 13 * smm) {
        formik.setFieldError(
          "salary",
          "El salario integral no puede ser inferior a trece veces el salario mínimo mensual."
        );
      } else {
        formik.setFieldError("salary", "");
      }
    }

    let formatted = formatCurrency(inputText.replace(/\./g, ","));

    setFormattedValue(`$ ${formatted.replace(/,/g, ".")}`);

    formik.setFieldValue("salary", inputText, false);
  };

  return (
    <div
      className={`${
        classnameContainer ??
        "flex flex-wrap flex-row overflow-y-scroll no-scrollbar w-full py-6"
      }`}
    >
      <div className="flex w-full">
        {formTitle && (
          <div className="flex-row my-6 w-full">
            <Divider className="flex mb-6" />
            <SecondaryText
              className="text-[calc(16px)] font-bold text-principal-180 font-outfit"
              text={formTitle}
            />
          </div>
        )}
      </div>
      <div className="flex-col">
        <form>
          <div className="grid grid-cols-2 grid-flow-row gap-3 overflow-hidden">
            <CustomSelectOne
              label="Estado Civil"
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
              label="Ocupación Cónyuge"
              value={formik.values.ocupation}
              onChange={(val) => {
                formik.setFieldValue("ocupation", val.target.value, false);
              }}
              options={OCUPATION}
              errors={
                formik.errors.ocupation ? (
                  <NeutralBlackText
                    text={formik.errors.ocupation}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            {formik.values.ocupation == "02" && (
              <>
                <CustomSelectOne
                  label="Tipo de Salario"
                  value={formik.values.salaryType}
                  onChange={(val) => {
                    formik.setFieldValue("salaryType", val.target.value, true);
                    validateSalary(val, "type");
                  }}
                  options={SALARY_TYPE}
                  errors={
                    formik.errors.salaryType ? (
                      <NeutralBlackText
                        text={formik.errors.salaryType}
                        className="text-principal-500"
                      ></NeutralBlackText>
                    ) : null
                  }
                />
                <CustomInputOne
                  label="Salario declarado"
                  value={formattedValue}
                  onChange={(val) => {
                    validateSalary(val, "salary");
                  }}
                  errors={
                    formik.errors.salary ? (
                      <NeutralBlackText
                        text={formik.errors.salary}
                        className="text-principal-500"
                      ></NeutralBlackText>
                    ) : null
                  }
                />
                <CustomSelectOne
                  label="Tipo de documento empleador"
                  value={formik.values.documentType}
                  onChange={(val) => {
                    formik.setFieldValue(
                      "documentType",
                      val.target.value,
                      true
                    );
                  }}
                  options={documentTypes}
                  errors={
                    formik.errors.documentType ? (
                      <NeutralBlackText
                        text={formik.errors.documentType}
                        className="text-principal-500"
                      ></NeutralBlackText>
                    ) : null
                  }
                />
                <CustomInputOne
                  label="Numero de documento empleador"
                  value={formik.values.document}
                  onChange={(val) => {
                    formik.setFieldValue("document", val.target.value, true);
                  }}
                  errors={
                    formik.errors.document ? (
                      <NeutralBlackText
                        text={formik.errors.document}
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

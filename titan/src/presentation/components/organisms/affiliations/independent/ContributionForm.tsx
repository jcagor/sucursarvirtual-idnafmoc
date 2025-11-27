"use client";
import { FormikProps } from "formik";
import { EPS_LIST, SelectOption } from "lib";
import {
  CustomInputOne,
  CustomSelectForm,
  CustomSelectOne,
  NeutralBlackText,
} from "presentation/components/atoms";
import { useAppSelector } from "presentation/store";
import { FC, useEffect } from "react";

export type ConstributionFormValuesType = {
  income?: string | undefined;
  economic?: string | undefined;
  ocupation?: string | undefined;
  eps?: string | undefined;
  affiliation?: string | undefined;
  modality?: string | undefined;
};
type FormPropsType = {
  classnameContainer?: string;
  isModality?: boolean;
  occupationOptions: SelectOption[];
  activityOptions: SelectOption[];
  formik: FormikProps<ConstributionFormValuesType>;
};

export const ContributionForm: FC<FormPropsType> = ({
  classnameContainer,
  isModality = false,
  occupationOptions,
  activityOptions,
  formik,
}) => {
  const optionsModality = [
    { label: "Afiliados independientes 2%", value: "0" },
    { label: "Afiliados independientes 0.6%", value: "1" },
  ];

  const optionsOther = [
    { label: "SI", value: "0" },
    { label: "NO", value: "1" },
  ];

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

  const formatSalary = (event: any) => {
    let formatted = formatCurrency(event.replace(/\./g, ","));
    formik.setFieldValue("income", `$ ${formatted.replace(/,/g, ".")}`, true);
  };

  return (
    <div className={`flex flex-wrap ${classnameContainer}`}>
      <div className="flex-col">
        <form onSubmit={formik.handleSubmit} className="m-0 p-0">
          <div className="grid grid-cols-2 grid-flow-row gap-x-16 gap-y-6">
            <CustomInputOne
              id="income"
              title="Escribe el valor de tu ingreso económico*"
              placeholder="Escribe tu ingreso $"
              value={formik.values.income}
              onChange={(val) => {
                formatSalary(val.target.value);
              }}
              errors={
                formik.errors.income ? (
                  <NeutralBlackText
                    text={formik.errors.income}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            {isModality && (
              <CustomSelectOne
                label="Modalidad de aporte*"
                value={formik.values.modality}
                onChange={(val) => {
                  formik.setFieldValue("modality", val.target.value, true);
                }}
                options={optionsModality}
                errors={
                  formik.errors.modality ? (
                    <NeutralBlackText
                      text={formik.errors.modality}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
            )}
            <CustomSelectForm
              title="Actividad Económica (Código CIUU)*"
              placeholder="Seleccione"
              onChange={(val) => {
                formik.setFieldValue("economic", val.value, true);
              }}
              setValue={(val) => {}}
              value={formik.values.economic}
              errors={
                formik.errors.economic ? (
                  <NeutralBlackText
                    text={formik.errors.economic}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
              options={activityOptions}
            />
            <CustomSelectForm
              title="Ocupación*"
              placeholder="Seleccione"
              onChange={(val) => {
                formik.setFieldValue("ocupation", val.value, true);
              }}
              setValue={(val) => {}}
              value={formik.values.ocupation}
              errors={
                formik.errors.ocupation ? (
                  <NeutralBlackText
                    text={formik.errors.ocupation}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
              options={occupationOptions}
            />
            <CustomSelectForm
              title="EPS*"
              placeholder="Seleccione"
              onChange={(val) => {
                formik.setFieldValue("eps", val.value, true);
              }}
              setValue={(val) => {}}
              value={formik.values.eps}
              errors={
                formik.errors.eps ? (
                  <NeutralBlackText
                    text={formik.errors.eps}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
              options={EPS_LIST}
            />

            <CustomSelectOne
              label="¿Has estado afiliado a otra caja del Valle en calidad de independendiente? *"
              value={formik.values.affiliation}
              onChange={(val) => {
                formik.setFieldValue("affiliation", val.target.value, true);
              }}
              options={optionsOther}
              errors={
                formik.errors.affiliation ? (
                  <NeutralBlackText
                    text={formik.errors.affiliation}
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

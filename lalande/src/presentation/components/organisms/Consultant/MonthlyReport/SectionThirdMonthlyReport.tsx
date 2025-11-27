"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { FormikErrors } from "formik";
import {
  CustomInputOne,
  CustomTextarea,
  NeutralBlackText,
  NumberCircle,
} from "presentation";

interface SectionThirdMonthlyReportProps {
  values: {
    interventionCompanyName: string;
    prioritisedLineOfIntervention: string;
    indicatorsProgress: number;
    actionPlanDuringTheExecutionPeriod: string;
    description: string;
    complianceWithResults: string;
  };
  errors: FormikErrors<{
    interventionCompanyName: string;
    prioritisedLineOfIntervention: string;
    indicatorsProgress: string;
    actionPlanDuringTheExecutionPeriod: string;
    description: string;
    complianceWithResults: string;
  }>;
  touched: {
    interventionCompanyName?: boolean;
    prioritisedLineOfIntervention?: boolean;
    indicatorsProgress?: boolean;
    actionPlanDuringTheExecutionPeriod?: boolean;
    description?: boolean;
    complianceWithResults?: boolean;
  };
  submitCount: number;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const SectionThirdMonthlyReport: React.FC<
  SectionThirdMonthlyReportProps
> = ({ values, errors, touched, submitCount, handleChange, handleBlur }) => {
  return (
    <>
      <div className="flex flex-row items-center">
        <NumberCircle number={3} />
        <TertiaryTitle text="Detalle de la intervención" className="ml-3" />
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CustomInputOne
          name="interventionCompanyName"
          id="interventionCompanyName"
          title="Nombre de la empresa:"
          placeholder="Carnesanchez S.A."
          value={values.interventionCompanyName ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.interventionCompanyName || submitCount > 0) &&
            errors.interventionCompanyName ? (
              <NeutralBlackText
                text={errors.interventionCompanyName}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="prioritisedLineOfIntervention"
          id="prioritisedLineOfIntervention"
          title="Línea de intervención priorizada:"
          placeholder="Logística de distribución"
          value={values.prioritisedLineOfIntervention}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.prioritisedLineOfIntervention || submitCount > 0) &&
            errors.prioritisedLineOfIntervention ? (
              <NeutralBlackText
                text={errors.prioritisedLineOfIntervention}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="indicatorsProgress"
          id="indicatorsProgress"
          title="Avance de indicadores (%):"
          placeholder="90"
          type="number"
          value={values.indicatorsProgress ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.indicatorsProgress || submitCount > 0) &&
            errors.indicatorsProgress ? (
              <NeutralBlackText
                text={errors.indicatorsProgress}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="actionPlanDuringTheExecutionPeriod"
          id="actionPlanDuringTheExecutionPeriod"
          title="Plan de acción durante el periodo de ejecución:"
          placeholder="Mejoras tecnológicas en el software."
          value={values.actionPlanDuringTheExecutionPeriod}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.actionPlanDuringTheExecutionPeriod || submitCount > 0) &&
            errors.actionPlanDuringTheExecutionPeriod ? (
              <NeutralBlackText
                text={errors.actionPlanDuringTheExecutionPeriod}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />
      </div>

      <CustomTextarea
        name="description"
        id="description"
        title="Descripción de las acciones realizadas:"
        placeholder="Optimización de rutas y actualización de inventarios."
        onChange={handleChange}
        value={values.description}
        onBlur={handleBlur}
        errors={
          (touched.description || submitCount > 0) && errors.description ? (
            <NeutralBlackText
              text={errors.description}
              className="text-principal-500"
            ></NeutralBlackText>
          ) : null
        }
      />

      <CustomTextarea
        name="complianceWithResults"
        id="complianceWithResults"
        title="Cumplimiento de resultados:"
        placeholder="15% de mejora en tiempos de entrega."
        value={values.complianceWithResults}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          (touched.complianceWithResults || submitCount > 0) &&
          errors.complianceWithResults ? (
            <NeutralBlackText
              text={errors.complianceWithResults}
              className="text-principal-500"
            ></NeutralBlackText>
          ) : null
        }
      />
    </>
  );
};

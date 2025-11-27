"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { FORM_DB_SELECT_OPTIONS, SelectOption } from "lib";
import { getSelectValues } from "lib/helpers/uiUtils";
import { useSession } from "next-auth/react";
import {
  CustomInputOne,
  CustomSelectOne,
  CustomTextarea,
  NeutralBlackText,
  NumberCircle,
} from "presentation";
import { useEffect, useState } from "react";

interface SectionSecondMonthlyReportProps {
  values: {
    companyName?: string;
    businessId: string;
    budgetedHoursPerMonth?: number;
    hoursExecutedPerMonth?: number;
    expectedProgressPercentage?: number;
    totalProgress?: number;
    lineOfIntervention?: string;
    associatedIndicators?: string;
    conclusions?: string;
  };
  errors: {
    companyName?: string;
    budgetedHoursPerMonth?: string;
    hoursExecutedPerMonth?: string;
    expectedProgressPercentage?: string;
    totalProgress?: string;
    lineOfIntervention?: string;
    associatedIndicators?: string;
    conclusions?: string;
  };
  touched: {
    companyName?: boolean;
    budgetedHoursPerMonth?: boolean;
    hoursExecutedPerMonth?: boolean;
    expectedProgressPercentage?: boolean;
    totalProgress?: boolean;
    lineOfIntervention?: boolean;
    associatedIndicators?: boolean;
    conclusions?: boolean;
  };
  submitCount: number;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFieldValue: Function;
}

export const SectionSecondMonthlyReport: React.FC<
  SectionSecondMonthlyReportProps
> = ({
  values,
  errors,
  touched,
  submitCount,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const { data: session } = useSession();

  const [businessList, setBusinessList] = useState<Array<SelectOption>>();

  const loadSelectOptions = async () => {
    const token = session?.access_token ?? "";
    setBusinessList(
      await getSelectValues(FORM_DB_SELECT_OPTIONS.BUSINESS_LIST_BY_ROL, token)
    );
    console.log("businessList", businessList);
  };

  const decodeSelectedBusiness = (value: string) => {
    let found = businessList?.filter((option) => option.value == value);

    if (found && found.length >= 1) {
      console.log("found", found);
      setFieldValue("businessId", found[0].shorthand);
    }
  };

  useEffect(() => {
    loadSelectOptions();
  }, []);

  return (
    <>
      <div className="flex flex-row items-center">
        <NumberCircle number={2} />
        <TertiaryTitle
          text="Consolidado ejecutivo de empresas mensual"
          className="ml-3"
        />
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
        <input
          name="businessId"
          type="hidden"
          value={values.businessId}
          onChange={handleChange}
        />

        <CustomSelectOne
          name="companyName"
          label="Nombre de la empresa:"
          placeholder="Carnesanchez S.A."
          defaultValue={values.companyName}
          value={values.companyName}
          options={businessList ?? []}
          onChange={(e) => {
            decodeSelectedBusiness(e.target.value);
            handleChange(e);
          }}
          errors={
            errors.companyName ? (
              <NeutralBlackText
                text={errors.companyName}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="budgetedHoursPerMonth"
          id="budgetedHoursPerMonth"
          title="Horas presupuestadas por mes:"
          placeholder="320"
          type="number"
          value={values.budgetedHoursPerMonth}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.budgetedHoursPerMonth || submitCount > 0) &&
            errors.budgetedHoursPerMonth ? (
              <NeutralBlackText
                text={errors.budgetedHoursPerMonth}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="hoursExecutedPerMonth"
          id="hoursExecutedPerMonth"
          title="Horas ejecutadas por mes:"
          placeholder="300"
          type="number"
          value={values.hoursExecutedPerMonth ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.hoursExecutedPerMonth || submitCount > 0) &&
            errors.hoursExecutedPerMonth ? (
              <NeutralBlackText
                text={errors.hoursExecutedPerMonth}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="expectedProgressPercentage"
          id="expectedProgressPercentage"
          title="Porcentaje de avance esperado (%): "
          placeholder="94"
          type="number"
          value={values.expectedProgressPercentage}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.expectedProgressPercentage || submitCount > 0) &&
            errors.expectedProgressPercentage ? (
              <NeutralBlackText
                text={errors.expectedProgressPercentage}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="totalProgress"
          id="totalProgress"
          title="Avance total (%):"
          placeholder="91"
          type="number"
          value={values.totalProgress ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.totalProgress || submitCount > 0) &&
            errors.totalProgress ? (
              <NeutralBlackText
                text={errors.totalProgress}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="lineOfIntervention"
          id="lineOfIntervention"
          title="Línea de intervención: "
          placeholder="Producción y distribución de carne al por mayor."
          value={values.lineOfIntervention}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.lineOfIntervention || submitCount > 0) &&
            errors.lineOfIntervention ? (
              <NeutralBlackText
                text={errors.lineOfIntervention}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />
      </div>

      <CustomTextarea
        name="associatedIndicators"
        id="associatedIndicators"
        title="Indicadores asociados:"
        placeholder="Cumplimiento de entregas, calidad, eficiencia."
        value={values.associatedIndicators}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          (touched.associatedIndicators || submitCount > 0) &&
          errors.associatedIndicators ? (
            <NeutralBlackText
              text={errors.associatedIndicators}
              className="text-principal-500"
            ></NeutralBlackText>
          ) : null
        }
      />

      <CustomTextarea
        name="conclusions"
        id="conclusions"
        title="Conclusiones:"
        placeholder="Mejoró la eficiencia en distribución, reduciendo horas sin afectar la calidad."
        value={values.conclusions}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          (touched.conclusions || submitCount > 0) && errors.conclusions ? (
            <NeutralBlackText
              text={errors.conclusions}
              className="text-principal-500"
            ></NeutralBlackText>
          ) : null
        }
      />
    </>
  );
};

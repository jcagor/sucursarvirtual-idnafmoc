"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { FormikErrors } from "formik";
import {
  CustomInputOne,
  CustomPriceInput,
  NeutralBlackText,
  NumberCircle,
} from "presentation";
import { useState } from "react";

type RowsType = {
  number: number;
  AnnexType: string;
};

const rowsProp: RowsType[] = [
  {
    number: 1,
    AnnexType: "Cronogramas por empresa",
  },
  {
    number: 2,
    AnnexType: "Planes de trabajo por empresa",
  },
  {
    number: 3,
    AnnexType: "Informes",
  },
  {
    number: 4,
    AnnexType: "Tableros de seguimiento actualizados",
  },
  {
    number: 5,
    AnnexType: "Actas de asistencia",
  },
];

interface SectionSevenMonthlyReportProps {
  values: {
    hoursRecorded?: number;
    valueBeforeIVA?: number;
    valueIVA?: number;
    valueIncludedIVA?: number;
  };
  errors: FormikErrors<{
    hoursRecorded?: string;
    valueBeforeIVA?: string;
    valueIVA?: string;
    valueIncludedIVA?: string;
  }>;
  touched: {
    hoursRecorded?: boolean;
    valueBeforeIVA?: boolean;
    valueIVA?: boolean;
    valueIncludedIVA?: boolean;
  };
  submitCount: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const SectionSevenMonthlyReport: React.FC<
  SectionSevenMonthlyReportProps
> = ({ values, errors, touched, submitCount, handleChange, handleBlur }) => {
  const [rows, setRows] = useState<RowsType[]>(rowsProp);

  return (
    <>
      <div className="flex flex-row items-center">
        <NumberCircle number={7} />
        <TertiaryTitle text="Información de facturación" className="ml-3" />
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CustomInputOne
          name="hoursRecorded"
          id="hoursRecorded"
          title="Horas registradas:"
          type="number"
          placeholder="5"
          value={values.hoursRecorded ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.hoursRecorded || submitCount > 0) &&
            errors.hoursRecorded ? (
              <NeutralBlackText
                text={errors.hoursRecorded}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomPriceInput
          name="valueBeforeIVA"
          id="valueBeforeIVA"
          title="Valor Antes de IVA:"
          type="number"
          placeholder=""
          value={values.valueBeforeIVA}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.valueBeforeIVA || submitCount > 0) &&
            errors.valueBeforeIVA ? (
              <NeutralBlackText
                text={errors.valueBeforeIVA}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomPriceInput
          name="valueIVA"
          id="valueIVA"
          title="Valor IVA:"
          placeholder=""
          type="number"
          value={values.valueIVA ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.valueIVA || submitCount > 0) && errors.valueIVA ? (
              <NeutralBlackText
                text={errors.valueIVA}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomPriceInput
          name="valueIncludedIVA"
          id="valueIncludedIVA"
          title="Valor IVA Incluido:"
          placeholder=""
          type="number"
          value={values.valueIncludedIVA}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={
            (touched.valueIncludedIVA || submitCount > 0) &&
            errors.valueIncludedIVA ? (
              <NeutralBlackText
                text={errors.valueIncludedIVA}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />
      </div>
    </>
  );
};

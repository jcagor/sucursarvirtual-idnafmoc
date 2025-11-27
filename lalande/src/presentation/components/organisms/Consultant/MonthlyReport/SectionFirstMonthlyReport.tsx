"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { FormikErrors } from "formik";
import {
  CustomTextarea,
  NeutralBlackText,
  NumberCircle,
  SecondaryText,
} from "presentation/components/atoms";

interface SectionFirstMonthlyReportProps {
  values: { introduction: string };
  errors: FormikErrors<{ introduction: string }>;
  touched: { introduction?: boolean };
  submitCount: number;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const SectionFirstMonthlyReport: React.FC<
  SectionFirstMonthlyReportProps
> = ({ values, errors, touched, submitCount, handleChange, handleBlur }) => {
  return (
    <>
      <div className="flex flex-row items-center">
        <NumberCircle number={1} />
        <TertiaryTitle
          text="Introducción / contexto general"
          className="ml-3"
        />
      </div>
      <SecondaryText text="Completa la Información" />

      <CustomTextarea
        name="introduction"
        id="introduction"
        title="Realice una breve introducción sobre la presentación de los procesos y actividades que se presentaran en el informe."
        placeholder='En este informe se presentarán los principales procesos y actividades que sustentan el negocio "Carnesanchez". Se detallarán aspectos clave como la selección de proveedores, la producción de productos cárnicos, el manejo de inventarios y las estrategias de distribución y marketing implementadas por la familia Sánchez.'
        value={values.introduction}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          (touched.introduction || submitCount > 0) && errors.introduction ? (
            <NeutralBlackText
              text={errors.introduction}
              className="text-principal-500"
            ></NeutralBlackText>
          ) : null
        }
      />
    </>
  );
};

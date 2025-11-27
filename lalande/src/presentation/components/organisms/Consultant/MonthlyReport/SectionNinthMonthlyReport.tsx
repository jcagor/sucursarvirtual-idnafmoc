"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { FormikErrors } from "formik";
import {
  CustomInputOne,
  CustomTextarea,
  NeutralBlackText,
  NumberCircle,
  SecondaryText,
} from "presentation/components/atoms";

interface SectionNinthMonthlyReportProps {
  values: { urlPowerBi: string };
  errors: FormikErrors<{ urlPowerBi: string }>;
  touched: { urlPowerBi?: boolean };
  submitCount: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const SectionNinthMonthlyReport: React.FC<
  SectionNinthMonthlyReportProps
> = ({ values, errors, touched, submitCount, handleChange, handleBlur }) => {
  return (
    <>
      <div className="flex flex-row items-center">
        <NumberCircle number={9} />
        <TertiaryTitle text="Power BI" className="ml-3" />
      </div>

      <CustomInputOne
        name="urlPowerBi"
        id="urlPowerBi"
        title="Enlace de Power BI:"
        placeholder="https://app.powerbi.com/..."
        value={values.urlPowerBi}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={
          (touched.urlPowerBi || submitCount > 0) && errors.urlPowerBi ? (
            <NeutralBlackText
              text={errors.urlPowerBi}
              className="text-principal-500"
            ></NeutralBlackText>
          ) : null
        }
      />
    </>
  );
};

"use client";

import { TertiaryTitle } from "@comfanditd/chronux-ui";
import { FormikErrors, FormikTouched } from "formik";
import {
  CustomInputOne,
  NumberCircle,
  SecondaryText,
} from "presentation/components/atoms";

interface milestoneInterventionsType {
  capital: string;
  newMarkets: string;
  newSuppliers: string;
  others: string;
  observations: string;
}

interface SectionFiveMonthlyReportProps {
  values: { milestoneInterventions: milestoneInterventionsType[] };
  errors: FormikErrors<{
    milestoneInterventions: milestoneInterventionsType[];
  }>;
  touched: FormikTouched<{
    milestoneInterventions: milestoneInterventionsType[];
  }>;
  submitCount: number;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any) => void;
}

export const SectionFiveMonthlyReport: React.FC<
  SectionFiveMonthlyReportProps
> = ({
  values,
  errors,
  touched,
  submitCount,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center">
        <NumberCircle number={5} />
        <TertiaryTitle
          text="Hitos importantes alcanzados en la intervención"
          className="ml-3"
        />
      </div>
      <SecondaryText text="Relacionar las empresas que cuenten con perfiles especiales para acceder a capital, mercados extranjeros y acceso a nuevos proveedores." />

      <div className="flex flex-col w-full items-center rounded-lg my-3">
        <div className="w-full grid grid-cols-5 gap-8 px-5 items-center justify-center text-center text-principal-100 bg-principal-150 rounded-t-lg py-3">
          <div>Capital</div>
          <div>Nuevos mercados</div>
          <div>Nuevos proveedores</div>
          <div>Otros</div>
          <div>Observaciones</div>
        </div>
        <div className="flex flex-col w-full rounded-b-lg">
          {values.milestoneInterventions.map((row, index) => (
            <div
              key={index}
              className="grid px-5 grid-cols-5 gap-8 items-center justify-center text-center text-principal-450 bg-principal-330 odd:bg-opacity-20 even:bg-opacity-10"
            >
              {/* Capital */}
              <div className="flex justify-center space-x-4">
                <RadioButton
                  name={`milestoneInterventions.${index}.capital`}
                  value="sí"
                  selected={row.capital}
                  onChange={(val) =>
                    setFieldValue(
                      `milestoneInterventions.${index}.capital`,
                      val
                    )
                  }
                />
                <RadioButton
                  name={`milestoneInterventions.${index}.capital`}
                  value="no"
                  selected={row.capital}
                  onChange={(val) =>
                    setFieldValue(
                      `milestoneInterventions.${index}.capital`,
                      val
                    )
                  }
                />
              </div>

              {/* Nuevos mercados */}
              <div className="flex justify-center space-x-4">
                <RadioButton
                  name={`milestoneInterventions.${index}.newMarkets`}
                  value="sí"
                  selected={row.newMarkets}
                  onChange={(val) =>
                    setFieldValue(
                      `milestoneInterventions.${index}.newMarkets`,
                      val
                    )
                  }
                />
                <RadioButton
                  name={`milestoneInterventions.${index}.newMarkets`}
                  value="no"
                  selected={row.newMarkets}
                  onChange={(val) =>
                    setFieldValue(
                      `milestoneInterventions.${index}.newMarkets`,
                      val
                    )
                  }
                />
              </div>

              {/* Nuevos proveedores */}
              <div className="flex justify-center space-x-4">
                <RadioButton
                  name={`milestoneInterventions.${index}.newSuppliers`}
                  value="sí"
                  selected={row.newSuppliers}
                  onChange={(val) =>
                    setFieldValue(
                      `milestoneInterventions.${index}.newSuppliers`,
                      val
                    )
                  }
                />
                <RadioButton
                  name={`milestoneInterventions.${index}.newSuppliers`}
                  value="no"
                  selected={row.newSuppliers}
                  onChange={(val) =>
                    setFieldValue(
                      `milestoneInterventions.${index}.newSuppliers`,
                      val
                    )
                  }
                />
              </div>

              {/* Otros */}
              <CustomInputOne
                id={`milestoneInterventions.${index}.others`}
                name={`milestoneInterventions.${index}.others`}
                value={row.others}
                onChange={handleChange}
                onBlur={handleBlur}
                ClassNameContainer="py-0 border-b border-principal-400"
                ClassNameInput="border-none bg-opacity-0 text-center py-0"
                simpleInput
              />

              {/* Observaciones */}
              <CustomInputOne
                id={`milestoneInterventions.${index}.observations`}
                name={`milestoneInterventions.${index}.observations`}
                value={row.observations}
                onChange={handleChange}
                onBlur={handleBlur}
                ClassNameContainer="py-0 border-b border-principal-400"
                ClassNameInput="border-none bg-opacity-0 text-center py-0"
                simpleInput
              />
            </div>
          ))}
        </div>
        <div
          className="w-10 h-10 mt-4 rounded-full bg-principal-100 flex items-center justify-center text-principal-150 text-2xl font-extrabold border border-principal-400 cursor-pointer"
          onClick={() =>
            setFieldValue("milestoneInterventions", [
              ...values.milestoneInterventions,
              {
                capital: "",
                newMarkets: "",
                newSuppliers: "",
                others: "",
                observations: "",
              },
            ])
          }
          onKeyDown={() => {}}
        >
          +
        </div>
      </div>
    </div>
  );
};

interface RadioButtonProps {
  name: string;
  value: string;
  selected: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  value,
  selected,
  onChange,
}) => {
  return (
    <label className="flex flex-col items-center cursor-pointer">
      <span className="mb-1 capitalize">{value}</span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={() => onChange(value)}
        className="peer hidden"
      />
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          selected === value ? "border-principal-100" : "border-principal-450"
        }`}
      >
        <div
          className={`w-3 h-3 rounded-full ${
            selected === value ? "bg-principal-100" : "bg-principal-450"
          }`}
        ></div>
      </div>
    </label>
  );
};

"use client";
import { FormikProps } from "formik";
import {
  ADDRESS_TYPE_OPTIONS,
  LETTER_OPTIONS,
  OTHER_CHARACTERISTICS_OPTIONS,
  RURAL_NOMENCLATURE_OPTIONS,
  SelectOption,
  URBAN_NOMENCLATURE_OPTIONS,
  ZONE_OPTIONS,
} from "lib";
import {
  CustomInputOne,
  CustomSelectOne,
  NeutralBlackText,
} from "presentation/components/atoms";
import { FC, useEffect, useState } from "react";

export type SimplyAddressFormValuesType = {
  direccion?: string | undefined;
  detalle?: string | undefined;
  compuesta?: string | undefined;
};
type FormPropsType = {
  ClassNameContainer?: string;
  formik: FormikProps<SimplyAddressFormValuesType>;
};

export const SimplyAddressForm: FC<FormPropsType> = ({
  ClassNameContainer,
  formik,
}) => {
  const getDynamicFontSize = (text: string) => {
    if (text.length > 50) return "35px";
    if (text.length > 40) return "40px";
    return "45px";
  };
  const [address, setAddress] = useState<string>("AV 6A #28 NORTE-09");

  return (
    <div
      className={`flex flex-wrap overflow-y-scroll no-scrollbar ${ClassNameContainer}`}
    >
      <div className="flex-col w-3/5">
        <form onSubmit={formik.handleSubmit} className="m-0 p-0">
          <CustomSelectOne
            classNameContainer={"col-span-2 w-full mb-2"}
            label="Tipo de Dirección"
            options={ADDRESS_TYPE_OPTIONS}
            value={formik.values.direccion}
            onChange={(val) => {
              formik.setFieldValue("direccion", val.target.value);
            }}
            errors={
              formik.errors.direccion ? (
                <NeutralBlackText
                  text={formik.errors.direccion}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            title="Ingresa tu dirección tal cual aparece escrita en el recibo de acueducto*"
            label="AV 6A #28 NORTE-09"
            value={formik.values.compuesta}
            classNameContainer={"col-span-2 w-full mb-6"}
            onChange={(val) => {
              formik.setFieldValue(
                "compuesta",
                val.target.value.toUpperCase(),
                true
              );

              setAddress(val.target.value.toUpperCase());
            }}
            errors={
              formik.errors.compuesta ? (
                <NeutralBlackText
                  text={formik.errors.compuesta}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <div className="w-full h-[93px] bg-principal-100 rounded-[8px] col-span-3 mb-6">
            <p className="w-full text-center text-[18px] font-outfit font-light leading-[40px] text-principal-150">
              La dirección ingresada es:
            </p>
            <p
              className="w-full text-center font-outfit font-bold leading-[40px] text-principal-150"
              style={{
                fontSize: getDynamicFontSize(address),
              }}
            >
              {address}
            </p>
          </div>

          <CustomInputOne
            label="Detalle"
            value={formik.values.detalle}
            classNameContainer="col-span-2 w-full"
            onChange={(val) => {
              formik.setFieldValue("detalle", val.target.value, true);
            }}
            errors={
              formik.errors.detalle ? (
                <NeutralBlackText
                  text={formik.errors.detalle}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </form>
      </div>
    </div>
  );
};

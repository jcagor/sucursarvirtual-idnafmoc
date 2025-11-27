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

export type AddressFormValuesType = {
  direccion?: string | undefined;
  nomenclatura?: string | undefined;
  numero?: string | undefined;
  letra?: string | undefined;
  zona?: string | undefined;
  numero2?: string | undefined;
  letra2?: string | undefined;
  numero3?: string | undefined;
  otras?: string | undefined;
  detalle?: string | undefined;
  compuesta?: string | undefined;
};
type FormPropsType = {
  classnameContainer?: string;

  formik: FormikProps<AddressFormValuesType>;
};

export const AddressForm: FC<FormPropsType> = ({
  classnameContainer,
  formik,
}) => {
  const getDynamicFontSize = (text: string) => {
    if (text.length > 50) return "35px";
    if (text.length > 40) return "40px";
    return "45px";
  };
  const [address, setAddress] = useState<string>("");
  const [sectorOptions, setSectorOptions] = useState<SelectOption[]>(
    URBAN_NOMENCLATURE_OPTIONS
  );

  useEffect(() => {
    if (formik.values.direccion == "SECTOR_URBANO") {
      formik.setFieldValue(
        "compuesta",
        `${formik.values.nomenclatura} ${formik.values.numero} ${formik.values.letra} ${formik.values.zona} # ${formik.values.numero2} ${formik.values.letra2} - ${formik.values.numero3}`,
        true
      );
      setAddress(
        `${formik.values.nomenclatura} ${formik.values.numero} ${formik.values.letra} ${formik.values.zona} # ${formik.values.numero2} ${formik.values.letra2} - ${formik.values.numero3}`
      );
    } else {
      const init = `${formik.values.nomenclatura} ${formik.values.numero} ${formik.values.letra} ${formik.values.zona} # ${formik.values.numero2} ${formik.values.letra2} - ${formik.values.numero3}`;
      formik.setFieldValue(
        "compuesta",
        `${
          init
            .trim()
            .replaceAll("  ", "")
            .replaceAll("#", "")
            .replaceAll("-", "")
            .replaceAll(" ", "") != ""
            ? init
            : ""
        } ${formik.values.detalle}`,
        true
      );
      setAddress(
        `${
          init
            .trim()
            .replaceAll("  ", "")
            .replaceAll("#", "")
            .replaceAll("-", "")
            .replaceAll(" ", "") != ""
            ? init
            : ""
        } ${formik.values.detalle}`
      );
    }
  }, [formik.values]);

  return (
    <div
      className={`flex flex-wrap overflow-y-scroll no-scrollbar ${classnameContainer}`}
    >
      <div className="flex-col">
        <form onSubmit={formik.handleSubmit} className="m-0 p-0">
          <div className="grid grid-cols-3 grid-flow-row gap-x-16 gap-y-6">
            <CustomSelectOne
              classNameContainer={"col-span-3 w-full"}
              label="Tipo de Dirección"
              options={ADDRESS_TYPE_OPTIONS}
              value={formik.values.direccion}
              onChange={(val) => {
                formik.setFieldValue("direccion", val.target.value);

                if (val.target.value == "SECTOR_URBANO") {
                  setSectorOptions(URBAN_NOMENCLATURE_OPTIONS);
                } else {
                  setSectorOptions(RURAL_NOMENCLATURE_OPTIONS);
                }
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

            <CustomSelectOne
              label="Nomenclatura"
              options={sectorOptions}
              value={formik.values.nomenclatura}
              onChange={(val) => {
                formik.setFieldValue("nomenclatura", val.target.value);
              }}
              errors={
                formik.errors.nomenclatura ? (
                  <NeutralBlackText
                    text={formik.errors.nomenclatura}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              title="Número*"
              value={formik.values.numero}
              onChange={(val) => {
                formik.setFieldValue(
                  "numero",
                  val.target.value.toUpperCase(),
                  true
                );
              }}
              errors={
                formik.errors.numero ? (
                  <NeutralBlackText
                    text={formik.errors.numero}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectOne
              label="Letra"
              options={LETTER_OPTIONS}
              value={formik.values.letra}
              onChange={(val) => {
                formik.setFieldValue("letra", val.target.value); // Actualiza en Formik
              }}
              errors={
                formik.errors.letra ? (
                  <NeutralBlackText
                    text={formik.errors.letra}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectOne
              label="Zona"
              options={ZONE_OPTIONS}
              value={formik.values.zona}
              onChange={(val) => {
                formik.setFieldValue("zona", val.target.value);
              }}
              errors={
                formik.errors.zona ? (
                  <NeutralBlackText
                    text={formik.errors.zona}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              title="Número*"
              value={formik.values.numero2}
              onChange={(val) => {
                formik.setFieldValue("numero2", val.target.value, true);
              }}
              errors={
                formik.errors.numero2 ? (
                  <NeutralBlackText
                    text={formik.errors.numero2}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectOne
              label="Letra"
              value={formik.values.letra2}
              options={LETTER_OPTIONS}
              onChange={(val) => {
                formik.setFieldValue("letra2", val.target.value); // Actualiza en Formik
              }}
              errors={
                formik.errors.letra2 ? (
                  <NeutralBlackText
                    text={formik.errors.letra2}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              title="Número*"
              value={formik.values.numero3}
              classNameContainer="col-span-3"
              onChange={(val) => {
                formik.setFieldValue("numero3", val.target.value, true);
              }}
              errors={
                formik.errors.numero3 ? (
                  <NeutralBlackText
                    text={formik.errors.numero3}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomSelectOne
              classNameContainer={"col-span-3 w-full"}
              label="Otras características"
              options={OTHER_CHARACTERISTICS_OPTIONS}
              value={formik.values.otras}
              onChange={(val) => {
                formik.setFieldValue("otras", val.target.value);
              }}
              errors={
                formik.errors.otras ? (
                  <NeutralBlackText
                    text={formik.errors.otras}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              title="Detalle"
              value={formik.values.detalle}
              classNameContainer="col-span-3 w-full"
              onChange={(val) => {
                formik.setFieldValue(
                  "detalle",
                  val.target.value.toUpperCase(),
                  true
                );
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

            <div className="w-full h-[93px] bg-principal-100 rounded-[8px] col-span-3 mb-6">
              <p className="w-full text-center text-[18px] font-outfit font-light leading-[40px] text-principal-150">
                La Dirección Ingresada es:
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
          </div>
        </form>
      </div>
    </div>
  );
};

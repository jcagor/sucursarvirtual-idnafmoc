"use client";
import { ChangeEvent, useState, type FC } from "react";
import DatePicker, { DateObject, toDateObject } from "react-multi-date-picker";
import { Button } from "presentation";
import {
  CustomInputOne,
  CustomSelectOne,
  DatePickerInput,
  NeutralBlackText,
  SecondaryText,
  TextSearchInput,
} from "presentation/components/atoms";
import { FormikProps } from "formik";

type Option = {
  value: string;
  label: string;
};
interface FiltersRequestListProps {
  formik: FormikProps<FormFiledValues>;
  className?: string;
  AvailableRequestStatus: Option[];
  AvailableRequestsTypes: Option[];
}

export type FormFiledValues = {
  affiliateDocumentNumber?: string | undefined;
  benefitDocumentNumber?: string | undefined;
  filed?: string | undefined;
  requestType?: String;
  requestStatus?:
    | {
        label: string | undefined;
        value: string | undefined;
      }
    | undefined;
  rangeDate?: DateObject[];
};

const FiledFilters: FC<FiltersRequestListProps> = ({
  formik,
  className,
  AvailableRequestStatus,
  AvailableRequestsTypes,
}) => {
  return (
    <form
      className={`flex flex-col w-full bg-principal-250 rounded-xl p-4 sm:p-5 md:p-6 overflow-y-visible`}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col w-full min-w-0">
        <div className="mb-4 sm:mb-5">
          <SecondaryText
            className="text-base sm:text-lg font-bold text-principal-180 font-outfit"
            text="Filtrar mi búsqueda"
          />
        </div>
        <div className="flex flex-col md:flex-row flex-wrap gap-3 sm:gap-4 w-full">
          {/* Numero Radicado */}
          <div className="w-full md:flex-1 md:min-w-[200px] min-w-0">
            <CustomInputOne
              title="Numero Radicado"
              value={formik.values.filed}
              onChange={(val) => {
                formik.setFieldValue("filed", val.target.value, false);
              }}
              classNameContainer="w-full"
            />
          </div>

          {/* Tipo de solicitud */}
          {/* <CustomSelectOne
            label="Tipo de solicitud"
            onChange={(val: ChangeEvent<HTMLSelectElement>) => {
              formik.setFieldValue("requestType", val.target.value, false);
            }}
            value={formik.values.requestType!.toString()}
            options={AvailableRequestsTypes}
          /> */}

          {/* Estado de la solicitud */}
          <div className="w-full md:flex-1 md:min-w-[200px] min-w-0">
            <CustomSelectOne
              label="Estado de la solicitud"
              onChange={(val: ChangeEvent<HTMLSelectElement>) => {
                formik.setFieldValue("requestStatus", val.target.value, false);
              }}
              value={formik.values.requestStatus?.value}
              options={AvailableRequestStatus!}
              classNameContainer="w-full"
            />
          </div>

          {/* Documento del beneficiario */}
          {/* <CustomInputOne
            title="No. documento del Beneficiario"
            value={formik.values.benefitDocumentNumber}
            onChange={(val) => {
              formik.setFieldValue(
                "benefitDocumentNumber",
                val.target.value,
                false
              );
            }}
          /> */}

          {/* Fecha desde-hasta */}
          <div className="flex flex-col w-full md:flex-1 md:min-w-[250px] min-w-0">
            <NeutralBlackText
              className="text-principal-450 mb-2"
              text="Fecha del radicado"
            />
            <div className="w-full min-w-0">
              <DatePicker
                placeholder="Desde - Hasta"
                range
                value={formik.values.rangeDate}
                format={"DD | MM | YYYY"}
                maxDate={toDateObject(new Date())}
                onChange={(date: DateObject[]) => {
                  formik.setFieldValue("rangeDate", date, false);
                }}
                containerClassName="w-full"
                inputClass="w-full"
                style={{
                  margin: 0,
                  paddingLeft: "15px",
                  color: "#777777",
                  width: "100%",
                  maxWidth: "100%",
                  height: "48px",
                  backgroundColor: "#FFFFFF",
                  borderWidth: "1px",
                  borderColor: "#777777",
                  fontFamily: "Outfit",
                  fontSize: "15px",
                  fontWeight: "400",
                  lineHeight: "19px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:flex-shrink-0 md:items-end">
            <div className="h-[48px] w-full sm:w-[120px] md:w-[120px] flex-shrink-0">
              <Button
                label="Buscar"
                onClick={formik.handleSubmit}
                removeWidth={true}
                className="w-full h-full rounded-2xl font-outfit text-base flex items-center justify-center text-center"
                primary={true}
              />
            </div>
            <div className="h-[48px] w-full sm:w-[140px] md:w-[160px] flex-shrink-0">
              <Button
                removeWidth={true}
                className="w-full h-full rounded-2xl font-outfit text-base bg-[rgba(255,255,255,0)] flex items-center justify-center text-center"
                onClick={formik.resetForm}
                label="Limpiar filtros"
                primary={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`rounded-2xl shadow-xl grid text-principal-350 bg-principal-150 relative overflow-hidden ${className}`}
        aria-description={"FiledFilters"}
      ></div>
    </form>
  );
};

export { FiledFilters };

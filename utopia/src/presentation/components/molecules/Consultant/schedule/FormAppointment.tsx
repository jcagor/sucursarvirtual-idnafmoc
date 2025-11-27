"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { AppointmentType } from "domain/models";
import createAppointmentUseCase from "domain/usecases/Appointment/createAppointment.use.case";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { useFormik } from "formik";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { dateUTCtoLocal, SelectOption } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Button,
  CustomSelectOne,
  DatePickerGrayInput,
  NeutralBlackText,
  SectionSeparator,
  TimePikerCustom,
} from "presentation/components/atoms";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface FormAppointmentProps {
  selectDate: Date;
  onClose: () => void;
  onCancel?: Function;
}

const options = {
  hour: "numeric" as const,
  minute: "2-digit" as const,
  hour12: true,
  timeZone: "UTC",
};

export const FormAppointment: React.FC<FormAppointmentProps> = ({
  selectDate,
  onClose,
  onCancel,
}) => {
  const { data: session } = useSession();
  const [selectOptionBusiness, setSelectOptionBusiness] = useState<
    SelectOption[]
  >([]);

  const initialValues = {
    BusinessId: "",
    Hour: selectDate.toLocaleTimeString("en-US", options),
    Date: dateUTCtoLocal(selectDate),
  };

  useEffect(() => {
    getDataBusiness();
  }, []);

  const getDataBusiness = async () => {
    const getOptionsBusiness = appContainer.get<GetOptionsUseCase>(
      USECASES_TYPES._GetOptionsUseCase
    );
    const SelectOptionName = "BUSINESS_LIST";
    const response = await getOptionsBusiness.execute(
      SelectOptionName,
      session?.access_token
    );
    if (response) {
      setSelectOptionBusiness(response);
    }
  };

  const onSubmit = async (values: {
    BusinessId: string;
    Date: Date;
    Hour: string;
  }) => {
    const { hour, minute } = parseTime12h(values.Hour);
    const appointment: AppointmentType = {
      id: "",
      businessProfile_id: values.BusinessId,
      date: new Date(
        Date.UTC(
          values.Date.getFullYear(),
          values.Date.getMonth(),
          values.Date.getDate(),
          hour,
          minute
        )
      ),
      document_number: 0,
      attendance: "Assigned",
    };
    const createAppointment = appContainer.get<createAppointmentUseCase>(
      USECASES_TYPES._CreateAppointmentUseCase
    );
    const response = await createAppointment.execute(
      appointment,
      session?.access_token
    );

    if (response) {
      onClose();
    } else {
      console.error("Error al crear la cita");
    }

    function parseTime12h(timeStr: string) {
      const match = timeStr.match(/(\d+):(\d+)\s?(AM|PM)/i);
      if (!match) {
        throw new Error("Invalid time format");
      }
      const [_, hourStr, minuteStr, period] = match;
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      if (period.toUpperCase() === "PM" && hour !== 12) {
        hour += 12;
      }
      if (period.toUpperCase() === "AM" && hour === 12) {
        hour = 0;
      }

      return { hour, minute };
    }
  };

  const validationSchema = Yup.object().shape({
    BusinessId: Yup.string().required("Este campo es obligatorio"),
    Hour: Yup.string().required("Este campo es obligatorio"),
    Date: Yup.string().required("Este campo es obligatorio"),
  });

  const { errors, handleSubmit, handleChange, values, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      onSubmit: onSubmit,
      validationSchema: validationSchema,
    });

  return (
    <div className="p-7">
      <div className="flex items-center justify-center">
        <div className="">
          <div className="flex items-center justify-center my-5">
            <Image
              src={"/utopia/icons/calendar-icon.svg"}
              alt="Cita"
              width={50}
              height={50}
            />
          </div>

          <MainTitle text="Crear cita" className="text-sm" />
        </div>
      </div>
      <SectionSeparator className="mt-8" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <CustomSelectOne
          name="BusinessId"
          label="Empresa"
          placeholder="Seleccione una empresa"
          value={values.BusinessId}
          options={selectOptionBusiness}
          onChange={handleChange}
          errors={
            errors.BusinessId ? (
              <NeutralBlackText
                text={errors.BusinessId}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />
        <TimePikerCustom
          name="Hour"
          id="Hour"
          title="Hora"
          placeholder=""
          formValue={values.Hour}
          onValueUpdate={handleChange}
          errors={
            errors.Hour ? (
              <NeutralBlackText
                text={errors.Hour}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />
        <DatePickerGrayInput
          name="Date"
          title="Fecha"
          className="full-width-date-picker"
          inputClass="full-width-date-picker-input"
          placeholder="16 | 11 | 75"
          value={values.Date}
          onChange={(value) => {
            setFieldValue("Date", value);
          }}
          inError={errors.Date ? true : false}
        />

        <div className="flex flex-row justify-center items-center">
          <Button
            label="Guardar"
            type="submit"
            className="w-20 xl:w-32 self-end"
            primary
          />
          <Button
            label="Cancelar"
            type="button"
            primary={false}
            secondaryClass="border-[1px] border-principal-500 bg-principal-500 text-principal-150 w-20 xl:w-32 ml-10"
            onClick={() => {
              onCancel ? onCancel() : () => {};
            }}
          />
        </div>
      </form>
    </div>
  );
};

"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { AppointmentType } from "domain/models/Appointment/AppointmentType";
import createAppointmentUseCase from "domain/usecases/Appointment/createAppointment.use.case";
import RescheduleAppointmentUseCase from "domain/usecases/Appointment/RescheduleAppointment.use.case";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { useFormik } from "formik";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { dateUTCtoLocal, FORM_DB_SELECT_OPTIONS, SelectOption } from "lib";
import { getSelectValues } from "lib/helpers/uiUtils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Button,
  CustomInputOne,
  CustomSelectOne,
  DatePickerInput,
  NeutralBlackText,
  SectionSeparator,
} from "presentation/components/atoms";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface FormAppointmentProps {
  appointment: AppointmentType;
  onClose: () => void;
  onCancel?: Function;
}

export const FormAppointmentReschedule: React.FC<FormAppointmentProps> = ({
  appointment,
  onClose,
  onCancel,
}) => {
  const { data: session } = useSession();
  const [appointmentTypesList, setAppointmentTypesList] =
    useState<Array<SelectOption>>();
  const [selectOptionBusiness, setSelectOptionBusiness] = useState<
    SelectOption[]
  >([]);

  const initialValues = {
    BusinessId: appointment.businessProfile_id,
    Hour: new Date(appointment.date).toISOString().substring(11, 16),
    Date: new Date(appointment.date),
    AppointmentType: appointment.type,
  };

  const loadSelectOptions = async () => {
    console.log("values", values);
    console.log("appointment", appointment);
    const token = session?.access_token ?? "";
    setAppointmentTypesList(
      await getSelectValues(FORM_DB_SELECT_OPTIONS.APPOINTMENT_TYPE, token)
    );

    let options = await getSelectValues(
      FORM_DB_SELECT_OPTIONS.BUSINESS_LIST_BY_ROL,
      token
    );

    let arrSel: Array<SelectOption> = options.map((op) => {
      return {
        label: op.label,
        value: op.shorthand,
      } as SelectOption;
    });
    await setSelectOptionBusiness(arrSel);
    setFieldValue("BusinessId", appointment.businessProfile_id);
    setFieldValue("AppointmentType", appointment.type);
    console.log("values", values);
    console.log("appointment", appointment);
  };

  useEffect(() => {
    loadSelectOptions();
  }, []);

  const onSubmit = async (values: {
    BusinessId: string;
    Date: Date;
    Hour: string;
    AppointmentType: string;
  }) => {
    const [hourStr, minuteStr] = values.Hour.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const appointmentReschedule: AppointmentType = {
      id: appointment.id,
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
      type: values.AppointmentType,
    };
    const reschedule = appContainer.get<RescheduleAppointmentUseCase>(
      USECASES_TYPES._RescheduleAppointment
    );
    const response = await reschedule.execute(appointmentReschedule);

    if (response) {
      onClose();
      toast.success("Cita reagendada exitosamente");
    } else {
      console.error("Error al reagendar la cita");
    }
  };

  const validationSchema = Yup.object().shape({
    BusinessId: Yup.string().required("Este campo es obligatorio"),
    Hour: Yup.string().required("Este campo es obligatorio"),
    Date: Yup.string().required("Este campo es obligatorio"),
    AppointmentType: Yup.string().required("Este campo es obligatorio"),
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
              src={"/lalande/icons/calendar-icon.svg"}
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
          disabled={true}
          errors={
            errors.BusinessId ? (
              <NeutralBlackText
                text={errors.BusinessId}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomSelectOne
          name="AppointmentType"
          label="Tipo cita"
          placeholder="Selecciona el tipo"
          value={values.AppointmentType}
          options={appointmentTypesList ?? []}
          onChange={handleChange}
          disabled={true}
          errors={
            errors.AppointmentType ? (
              <NeutralBlackText
                text={errors.AppointmentType}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomInputOne
          name="Hour"
          id="Hour"
          title="Hora"
          placeholder=""
          type="time"
          value={values.Hour}
          onChange={handleChange}
          errors={
            errors.Hour ? (
              <NeutralBlackText
                text={errors.Hour}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />
        <DatePickerInput
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

        <div className="flex flex-row justify-center items-center gap-4">
          <Button
            label="Cancelar"
            type="button"
            primary={false}
            secondaryClass="border-[1px] border-principal-500 bg-principal-500 text-principal-150 w-20 xl:w-32 ml-10"
            onClick={() => {
              onCancel ? onCancel() : () => {};
            }}
          />
          <Button
            label="Guardar"
            type="submit"
            className="w-20 xl:w-32 self-end"
            primary
          />
        </div>
      </form>
    </div>
  );
};

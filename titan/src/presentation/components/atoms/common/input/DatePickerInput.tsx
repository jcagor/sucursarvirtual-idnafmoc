"use-client";
import React, { CSSProperties, HTMLAttributes } from "react";
import DatePicker, { DateObject, Value } from "react-multi-date-picker";
import { NeutralBlackText } from "presentation/components/atoms";
import { FaCalendarAlt } from "react-icons/fa";
import { ForwardRefComponent } from "framer-motion";
import { DATE_PICKER_MONTHS, DATE_PICKER_WEEK_DAYS } from "lib";

interface DatePickerComponentProps {
  id?: string;
  name?: string;
  label?: boolean;
  value?: Value;
  width?: string;
  onChange?: (newValue: DateObject | DateObject[] | null) => void;
  trailingIcon?: React.ReactNode;
  placeholder?: string;
  range?: boolean;
  time?: boolean;
  format?: string;
  minDate?: string;
  disabled?: boolean;
  className?: string;
  placeHolderClassName?: string;
  classNameSelect?: string;
  classNameLabel?: string;
  stringDate?: string;
  inputClass?: string;
  inError?: boolean;
}
export const DatePickerInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  DatePickerComponentProps & HTMLAttributes<CSSProperties>
> = ({
  id,
  name,
  value,
  format,
  width,
  range,
  placeholder = "",
  label = false,
  disabled,
  className,
  classNameLabel,
  stringDate,
  onChange,
  inputClass,
  inError,
}) => {
  const weekDays = DATE_PICKER_WEEK_DAYS;
  const months = DATE_PICKER_MONTHS;
  return (
    <div className="w-full flex flex-wrap items-start flex-col">
      {label && (
        <NeutralBlackText className={classNameLabel} text={placeholder} />
      )}
      <div className="flex flex-row">
        <DatePicker
          className={className}
          weekDays={weekDays}
          months={months}
          range={range}
          placeholder={placeholder}
          format={format ?? "DD | MM | YYYY"}
          value={
            value
              ? value
              : range
              ? value
              : stringDate
              ? new Date(stringDate)
              : new Date()
          }
          style={{
            margin: 0,
            paddingLeft: "15px",
            color: "#777777",
            width: width ?? "324px",
            height: "48px",
            backgroundColor: disabled ? "#E8E8E8" : "#FFFFFF",
            borderWidth: "1px",
            borderColor: inError ? "#FF0000" : "#777777",
            fontFamily: "Outfit",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "19px",
          }}
          inputClass={inputClass}
          disabled={disabled}
          onChange={onChange}
        />
        <div className="flex flex-wrap w-full self-center justify-items-center ml-[calc(-25px)]">
          <FaCalendarAlt className="text-principal-330 " />
        </div>
      </div>
    </div>
  );
};

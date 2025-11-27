"use client";
import React, { CSSProperties, HTMLAttributes } from "react";
import DatePicker, { DateObject, Value } from "react-multi-date-picker";
import { NeutralBlackText } from "presentation/components/atoms";
import { FaCalendarAlt } from "react-icons/fa";
import { DATE_PICKER_MONTHS, DATE_PICKER_WEEK_DAYS } from "lib";

interface DatePickerComponentProps {
  id?: string;
  name?: string;
  label?: boolean;
  value?: Value;
  width?: string;
  onChange?: (newValue: Date | null) => void;
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
  title?: string;
}

export const DatePickerInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  DatePickerComponentProps & HTMLAttributes<CSSProperties>
> = ({
  id,
  title,
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
    <div
      className={`w-full ${inError ? " h-[calc(108px)]" : " h-[calc(68px)]"}`}
    >
      <div className="w-full flex flex-wrap items-start flex-col">
        {title && (
          <NeutralBlackText
            className={"text-principal-450 h-[calc(20px)] mb-2"}
            text={title}
          />
        )}
        <div className="w-full flex flex-row">
          <DatePicker
            containerClassName={`w-full ${className}`}
            weekDays={weekDays}
            months={months}
            range={range}
            placeholder={placeholder}
            format={format ?? "DD | MM | YYYY"}
            value={
              value ? value : stringDate ? new Date(stringDate) : new Date()
            }
            style={{
              margin: 0,
              paddingLeft: "15px",
              color: "#777777",
              height: "48px",
              borderWidth: "1px",
              fontFamily: "Outfit",
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "19px",
            }}
            inputClass={`w-full ${inputClass}`}
            disabled={disabled}
            onChange={(val) => {
              if (!onChange) return;
              if (val == null) return onChange(null);
              if (Array.isArray(val)) {
                return onChange(val[0]?.toDate?.() ?? null);
              }
              return onChange(val.toDate?.() ?? null);
            }}
          />
          <div className="flex self-center justify-items-center ml-[calc(-25px)]">
            <FaCalendarAlt className="text-principal-330" />
          </div>
        </div>
      </div>
      <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
        <p className="font-outfit text-sm font-normal text-principal-500">
          {inError ? "Verifica la fecha" : ""}
        </p>
      </div>
    </div>
  );
};

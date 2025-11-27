import React, { FC, SelectHTMLAttributes } from "react";
import { NeutralBlackText } from "../text";
import { SelectOption } from "@/lib";

interface CustomSelectOneProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectStyle?: React.CSSProperties;
  selectClassName?: string;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  errors?: React.ReactNode;
  ClassNameContainer?: string;
}

export const CustomSelectOne: FC<CustomSelectOneProps> = (
  props: CustomSelectOneProps
) => {
  const {
    options,
    selectStyle,
    selectClassName,
    onChange,
    label,
    errors,
    placeholder,
    ClassNameContainer: ClassName,
  } = props;
  return (
    <div
      className={`w-full ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassName}`}
    >
      <div className={`w-full h-full`}>
        <div className="w-full h-auto flex flex-wrap flex-row justify-between">
          <NeutralBlackText
            className={"text-principal-450 text-wrap"}
            text={label}
          />
        </div>
        <select
          className={
            selectClassName ??
            `w-full h-[calc(48px)] outline-principal-180 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-450 border-[calc(1px)] rounded-[calc(5px)] font-outfit text-[calc(15px)]`
          }
          style={selectStyle}
          onChange={onChange}
          title={placeholder}
          {...props}
        >
          <option
            className={`text-principal-450 placeholder-principal-450`}
            disabled
            selected
            value={""}
          >
            Selecciona {label}
          </option>
          {options.map((option) => {
            return (
              <option
                className={"text-principal-450 placeholder-principal-450"}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            );
          })}
        </select>
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar text-red-500 text-sm">
          {errors}
        </div>
      </div>
    </div>
  );
};


interface CustomSelectGrayProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectStyle?: React.CSSProperties;
  selectClassName?: string;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  errors?: React.ReactNode;
  classNameContainer?: string;
}
export const CustomSelectGray: FC<CustomSelectGrayProps> = (
  props: CustomSelectGrayProps
) => {
  const {
    options,
    selectStyle,
    selectClassName,
    onChange,
    label,
    errors,
    placeholder,
    classNameContainer: classContainer,
  } = props;
  return (
    <div
      className={`${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${classContainer}`}
    >
      <div className={`w-full h-full`}>
        <div className="w-full h-auto flex flex-wrap flex-row justify-between">
          <NeutralBlackText
            className={"text-principal-450 text-wrap"}
            text={label}
          />
        </div>
        <select
          className={
            selectClassName ??
            `w-full h-[calc(48px)] border-principal-400 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-450 border-[calc(2px)] rounded-[calc(5px)] font-outfit text-[calc(15px)]`
          }
          style={selectStyle}
          onChange={onChange}
          title={placeholder}
          {...props}
        >
          <option
            className={`text-principal-450 placeholder-principal-450`}
            disabled
            value={""}
          >
            Selecciona {label}
          </option>
          {options.map((option, index) => {
            return (
              <option
                className={"text-principal-450 placeholder-principal-450"}
                key={index}
                value={option.value}
              >
                {option.label}
              </option>
            );
          })}
        </select>
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      </div>
    </div>
  );
};
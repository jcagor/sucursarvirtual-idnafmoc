import { SelectOption } from "lib";
import React, { FC, SelectHTMLAttributes } from "react";
import { NeutralBlackText } from "../text";
import { TextSearchInput } from "../input";

interface CustomSelectOneProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectStyle?: React.CSSProperties;
  selectClassName?: string;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  errors?: React.ReactNode;
  ClassNameContainer?: string;
  readOnly?: boolean;
}

export const CustomSelectOne: FC<CustomSelectOneProps> = (
  props: CustomSelectOneProps
) => {
  const {
    options,
    selectStyle,
    selectClassName,
    onChange,
    onBlur,
    label,
    errors,
    placeholder,
    ClassNameContainer: ClassName,
    readOnly,
  } = props;
  return (
    <div
      className={`w-full ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassName}`}
    >
      <div className={`w-full h-full justify-center flex flex-col`}>
        <div className="h-[calc(20px)] w-full flex flex-wrap flex-row justify-between mb-2">
          <NeutralBlackText
            className={"text-principal-450 text-wrap mb-2"}
            text={label}
          />
        </div>
        <select
          className={
            selectClassName ??
            `w-full h-[calc(48px)] outline-principal-180 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-450 border-[calc(1px)] border-principal-400 rounded-[calc(5px)] font-outfit text-[calc(15px)]`
          }
          disabled={readOnly}
          style={selectStyle}
          onChange={onChange}
          onBlur={onBlur}
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
        <div className="w-full">{errors}</div>
      </div>
    </div>
  );
};

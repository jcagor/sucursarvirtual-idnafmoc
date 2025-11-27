import { SelectOption } from "lib";
import React, { FC, SelectHTMLAttributes } from "react";
import { NeutralBlackText } from "../text";
import { TextSearchInput } from "../input";

interface CustomSelectOneProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectStyle?: React.CSSProperties | undefined;
  selectClassName?: string | undefined;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  errors?: React.ReactNode;
  classNameContainer?: string;
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
    classNameContainer: ClassName,
  } = props;
  return (
    <div
      className={`w-[calc(324px)] ${
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
            `w-full h-[calc(48px)] outline-principal-180 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-440 has-[option.placeholder:checked]:text-principal-440 border-[calc(1px)] rounded-[calc(5px)] font-outfit text-[calc(15px)]`
          }
          style={selectStyle}
          onChange={onChange}
          title={placeholder}
          {...props}
        >
          <option
            className={`text-principal-450 placeholder-principal-440 placeholder`}
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

export const CustomSelectGray: FC<CustomSelectOneProps> = (
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
            className={"text-principal-450 truncate"}
            text={label}
          />
        </div>
        <select
          className={
            selectClassName ??
            `w-full h-[calc(48px)] border-principal-400 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-440 has-[option.placeholder:checked]:text-principal-440 border-[calc(2px)] rounded-[calc(5px)] font-outfit text-[calc(15px)]`
          }
          style={selectStyle}
          onChange={onChange}
          title={placeholder}
          {...props}
        >
          <option
            className={`text-principal-450 placeholder-principal-440 placeholder`}
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

type TextSearchInputProps = {
  id?: string;
  dataType?: string;
  decimal?: number;
  defaultText?: string;
  step?: string | number;
  onlyNumbers?: boolean;
  type?: string;
  name?: string;
  disabled?: boolean;
  disabledButFocusable?: boolean;
  value?: string;
  placeholder?: string;
  label?: boolean;
  hasIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
  classNameText?: string;
  classNameLabel?: string;
  classNameSelect?: string;
  basePath?: boolean;
  onChange?: (data: any) => void;
  defaultOption?: string;
  options?: SelectOption[];
  inError?: boolean;
  errorMsg?: string;
};
export const SearchSelectorAndTextInput: FC<TextSearchInputProps> = ({
  id,
  name,
  placeholder = "",
  basePath,
  className,
  onChange,
  options,
  disabled,
  defaultOption,
  classNameLabel,
  value,
  label,
  classNameSelect,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <NeutralBlackText className={classNameLabel} text={placeholder} />
      )}
      <div className="flex w-full flex-wrap flex-row h-[calc(48px)]">
        <select
          id={`select${id}`}
          name={`select${name}`}
          disabled={disabled}
          value={defaultOption ?? ""}
          onChange={(value) => {
            onChange ? onChange({ type: "select", value: value }) : undefined;
          }}
          className={`flex flex-wrap pl-[calc(15px)] w-1/4 text-principal-450 placeholder-principal-450 border-[calc(1px)] rounded-l-[calc(5px)] ${disabled ? "bg-principal-460" : "bg-principal-150"}  font-outfit`}
>          {options?.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.shorthand}
              </option>
            );
          })}
          {/* <DropdownArrowIcon basePath={basePath} /> */}
        </select>
        <div className="flex flex-wrap w-3/4">
          <TextSearchInput
            id={`input${id}`}
            name={`input${name}`}
            label={false}
            onChange={(event) => {
              onChange
                ? onChange({ type: "input", value: event.target.value })
                : undefined;
            }}
            placeholder={placeholder}
            classNameText="w-full text-principal-450 placeholder-principal-450 border-[calc(1px)] rounded-r-[calc(5px)] bg-principal-460"
            disabled={disabled}
            value={value ?? ""}
          />
        </div>
      </div>
    </div>
  );
};

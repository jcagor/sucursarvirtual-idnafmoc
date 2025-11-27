"use client";
import React, { forwardRef } from "react";
import Select from "react-select";
import { NeutralBlackText } from "../text";

type Option = {
  value: string;
  label: string;
};

interface CustomSelectFormProps {
  title: string;
  placeholder: string;
  options: Option[];
  name?: string;
  onChange: (option: Option) => void;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<Option>>;
  disabled?: boolean;
  className?: string;
  classNameSelect?: string;
  errors?: React.ReactNode;
}

const CustomSelectForm = forwardRef<HTMLDivElement, CustomSelectFormProps>(
  (
    {
      title,
      placeholder,
      options,
      name,
      onChange,
      setValue,
      value,
      disabled,
      className,
      classNameSelect,
      errors,
    },
    ref
  ) => {
    const customStyles = {
      control: (base: any, state: any) => ({
        ...base,
        minHeight: "50px",
        height: "50px",
        borderColor: "#777777",
        "&:hover": {
          borderColor: state.isFocused ? "#777777" : "#777777",
        },
        boxSizing: "border-box", // Include padding and border in element's height
      }),
      menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
      menu: (base: any) => ({ ...base, zIndex: 999 }),
      valueContainer: (base: any) => ({
        ...base,
        height: "50px",
        padding: "0 12px",
        color: "#777777",
      }),
      input: (base: any) => ({
        ...base,
        margin: "0px",
        padding: "0px",
        color: "#777777",
        fontFamily: "Outfit",
        fontSize: "16px",
        lineHeight: "24px",
      }),
      singleValue: (base: any, state: any) => ({
        ...base,
        color: value.value == 0 ? "#77777780 " : "#777777",
        fontFamily: "Outfit",
        fontSize: "16px",
        lineHeight: "24px",
      }),
      placeholder: (base: any) => ({
        ...base,
        margin: "0px",
        padding: "0px",
        paddingBottom: "3.8px",
        whiteSpace: "nowrap",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#777777 ",
        fontFamily: "Outfit",
        fontSize: "16px",
        lineHeight: "24px",
      }),
      option: (base: any, state: any) => ({
        ...base,
        color: state.isSelected ? "white" : "#777777", // Cambia el color del texto aquí
        zIndex: 9999,
        fontFamily: "Outfit",
        fontSize: "16px",
        lineHeight: "24px",
      }),
    };

    return (
      <div className={`${className}`}>
        <NeutralBlackText
          className={"text-principal-450 h-[calc(20px)]"}
          text={title}
        />
        <Select
          menuPosition="fixed"
          instanceId={"1m2o1m2"}
          classNamePrefix="custom-select"
          className={`w-full ${classNameSelect}`}
          value={value.value}
          onChange={(option: any) => {
            onChange(option);
            setValue(option);
          }}
          options={options}
          styles={customStyles}
          placeholder={placeholder}
          isDisabled={disabled}
          name={name}
        />
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      </div>
    );
  }
);
CustomSelectForm.displayName = "CustomSelect";
export { CustomSelectForm };

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

const CustomSelectFormFixed = forwardRef<HTMLDivElement, CustomSelectFormProps>(
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
        borderColor: "#979797",
        "&:hover": {
          borderColor: state.isFocused ? "#979797" : "#979797",
        },
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
        width: "100%",
      }),
      menuPortal: (base: any) => ({
        ...base,
        zIndex: 99999,
        position: "fixed",
      }),
      menu: (base: any) => ({
        ...base,
        zIndex: 99999,
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginTop: "4px",
      }),
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
      container: (base: any) => ({
        ...base,
        width: "100%",
      }),
    };

    return (
      <div className={`${className}`}>
        {title && (
          <NeutralBlackText
            className={"text-principal-450 h-[calc(20px)]"}
            text={title}
          />
        )}
        <Select
          menuPosition="fixed"
          menuPlacement="auto"
          menuPortalTarget={document.body}
          instanceId={"1m2o1m2"}
          classNamePrefix="custom-select"
          className={`w-full ${classNameSelect}`}
          value={value}
          onChange={(option: any) => {
            onChange(option);
            setValue(option);
          }}
          options={options}
          styles={customStyles}
          placeholder={placeholder}
          isDisabled={disabled}
          name={name}
          menuShouldScrollIntoView={true}
          isSearchable
        />
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      </div>
    );
  }
);
CustomSelectFormFixed.displayName = "CustomSelect";
export { CustomSelectFormFixed };

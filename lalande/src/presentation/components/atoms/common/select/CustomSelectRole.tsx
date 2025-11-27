"use client";

import { SelectOption } from "lib";
import React, { FC, SelectHTMLAttributes } from "react";
import { NeutralBlackText, NeutralNCText } from "../text";
import { TextSearchInput } from "../input";
import Select, { ActionMeta, SingleValue } from "react-select";

interface CustomSelectRoleProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  selectStyle?: React.CSSProperties;
  selectClassName?: string;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  simple?:boolean;
  errors?: React.ReactNode;
  ClassNameContainer?: string;
  onChangeValue?:Function;
  selectedValue?:SelectOption|undefined;
}

export const CustomSelectRole: FC<CustomSelectRoleProps> = (
  props: CustomSelectRoleProps
) => {
  const formatOptionLabel = ({ value, label }: SelectOption) => (
    <div style={{ display: "" }}>
      <div><span className="text-principal-180 font-bold">{label}</span></div>
      <div style={{ marginLeft: "10px", color: "#ccc" }}>
        <p><span className="text-principal-180 font-normal">{`Nit. ${value}`}</span></p>
      </div>
    </div>
  );

  const {
    options,
    selectStyle,
    selectClassName,
    onChange,
    onChangeValue,
    label,
    errors,
    placeholder,
    ClassNameContainer: ClassName,
    selectedValue,
  } = props;

  const onChangeint = (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
    if (newValue && onChangeValue){
      onChangeValue(newValue);
    }
  }

  return (
    <div
      className={`w-full ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassName}`}
    >
      <div className={`w-full h-full`}>
        <div className="w-full h-auto flex flex-wrap flex-row justify-between">
          <NeutralNCText
            className={"text-principal-180 text-wrap mb-2"}
            text={label}
          />
        </div>

        <Select
          placeholder="Seleccionar Empresa"
          formatOptionLabel={formatOptionLabel}
          options={options}
          styles={{ menuPortal: base => ({ ...base, zIndex: 15 }) }}
          onChange={onChangeint}
          value={selectedValue?selectedValue:undefined}
        />
        {}
        <div className="w-full">{errors}</div>
      </div>
    </div>
  );
};

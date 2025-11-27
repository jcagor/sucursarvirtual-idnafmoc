"use client";
import React, { useEffect, useState } from "react";
import Select, {
  CSSObjectWithLabel,
  InputActionMeta,
  MultiValue,
} from "react-select";
import { SelectOption } from "lib";
import { FormikErrors } from "formik";
import { NeutralBlackText } from "../text";

interface Props {
  name: string;
  getFieldPropsFormikFn: Function;
  setFieldValueFormikFn: Function;
  disable?: boolean;
  placeholder?: string;
  valuePreload?: Array<SelectOption>;
  onChangeHandler?: (e: string, action: InputActionMeta) => void;
  data: Array<SelectOption>;
  label?: string;
  inputStyle?: boolean;
  delimiter: number;
  codeLabel?: boolean;
  clear?: boolean;
  errors?: string | string[] | FormikErrors<SelectOption>[];
}

export const InputMultiSelectListNew: React.FC<Props> = ({
  name,
  getFieldPropsFormikFn,
  setFieldValueFormikFn,
  disable = false,
  placeholder,
  valuePreload,
  onChangeHandler = (e: string, action: InputActionMeta) => {},
  data,
  label,
  inputStyle,
  delimiter,
  codeLabel,
  clear,
  errors,
}) => {
  const { value } = getFieldPropsFormikFn(name);

  const parseFormError = (error: string | string[] | undefined) => {
    if (!error) {
      return "";
    } else if (typeof error === "string") {
      return error;
    } else if (Array.isArray(error)) {
      return "";
    } else if (typeof error === "object") {
      return "";
    }
  };

  const filter = () => {
    let options: Array<Object> = [];
    for (const item of data) {
      options.push({
        value: item.value,
        label: item.label,
        //shorthand: item.shorthand?item.shorthand:undefined,
      });
    }

    return options;
  };

  const [selectedOptions, setSelectedOptions] = useState(value);

  const handleChange = (e: MultiValue<any>) => {
    if (e && e.length > delimiter) {
      return;
    }
    setFieldValueFormikFn(name, e);
    setSelectedOptions(e);
  };

  useEffect(() => {
    if (valuePreload && valuePreload?.length >= 1) {
      const initialState = [...(valuePreload?.length ? valuePreload : [])];
      setFieldValueFormikFn(name, initialState);
      setSelectedOptions(initialState);
    }
  }, [valuePreload]);

  useEffect(() => {
    if (value == "") setSelectedOptions(null);
  }, [clear]);

  const customStyles = {
    control: (prev: CSSObjectWithLabel) => ({
      ...prev,
      minHeight: "48px",
      borderColor: "#C7D2E6",
      borderWidth: "2px",
    }),
  };

  return (
    <div className="w-full h-full">
      {label ? (
        <NeutralBlackText
          className={"text-principal-450 h-[calc(20px)]"}
          text={label}
        />
      ) : (
        ""
      )}
      <Select
        isMulti
        isSearchable
        placeholder={placeholder}
        options={filter()}
        value={selectedOptions}
        onChange={handleChange}
        onInputChange={onChangeHandler}
        closeMenuOnSelect={false}
        isDisabled={disable}
        className="placeholder-principal-460"
        styles={inputStyle ? customStyles : undefined}
      />
      <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
        <p className="font-outfit text-sm font-normal text-principal-500">
          {parseFormError(errors?.toString())}
        </p>
      </div>
    </div>
  );
};

export default InputMultiSelectListNew;

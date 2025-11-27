"use client";

import React, { type FC, useState } from "react";
import { DropdownArrowIcon } from "../images";
import { generateUniqueKey, type DropdownInterface } from "lib";

export const SimpleDropdown: FC<DropdownInterface> = ({
  label = "Seleccionar",
  content = [],
  classname = "text-principal-180",
  onChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggling: () => void = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value: string) => () => {
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div className={`relative overflow-visible w-full ${classname}`}>
      <div className="flex flex-wrap flex-row justify-start w-full items-center overflow-visible">
        <button
          className="flex flex-row w-auto text-center justify-center items-center bg-principal-150 px-5 py-1 rounded-xl"
          onClick={toggling}
          type="button"
        >
          {label ?? ""}
          <DropdownArrowIcon className="flex mx-1 w-[calc(15px)] h-[calc(9px)] cursor-pointer" />
        </button>
      </div>
      {isOpen && !disabled && (
        <ul className="absolute text-center z-50 justify-center rounded-xl bg-principal-150 left-1/2 transform -translate-x-1/2 mt-2">
          {content.map((option) => (
            <button
              type="button"
              className={`w-96 cursor-pointer py-2 px-4 hover:bg-principal-200 ${classname}`}
              onClick={onOptionClicked(option)}
              key={generateUniqueKey()}
            >
              {option}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

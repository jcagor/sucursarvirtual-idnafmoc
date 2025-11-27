"use client";

import { TextRowsMolecule, TextRowsMoleculeList } from "lib";
import Image from "next/image";
import { CustomInputOne } from "presentation/components/atoms";
import { ChangeEvent, useEffect, useState } from "react";

type customProps = {
  name: string;
  numRows?: number;
  containerClass?: string;
  onChange?: (json: string | object) => void;
  serialize?: boolean;
  readOnly?: boolean;
  initialValue?: TextRowsMoleculeList;
};

export const TextRowsInput = (props: customProps) => {
  const {
    name: name,
    numRows = 3,
    containerClass = "",
    onChange: onChange,
    serialize = false,
    readOnly,
    initialValue,
  } = props;

  const DESCRIPTION_FIELD_NAME = name + "_rows_text_one_";
  const MAX_ENTRIES = 10;

  const [rows, setRows] = useState<TextRowsMoleculeList>();

  const getEmptyEntry = (): TextRowsMolecule => {
    return {
      textDescription: "",
    } as TextRowsMolecule;
  };

  const addRow = () => {
    //console.log("Agregar fila");
    if (rows && rows?.length <= MAX_ENTRIES) {
      setRows((prevState) => {
        return [...(prevState ? prevState : []), getEmptyEntry()];
      });
    }
  };

  const remRow = () => {};

  const initComponent = () => {
    if (initialValue && initialValue.length >=1) {
      setRows(initialValue);
    } else {
      let initialData: TextRowsMoleculeList = [];
      for (let i = 1; i <= numRows; i++) {
        initialData.push(getEmptyEntry());
      }
      setRows(initialData);
    }
  };

  const internalOnchangeValue = (
    index: number,
    value: ChangeEvent<HTMLInputElement>
  ) => {
    console.log("Update Values:", value.target.value);
    if (rows && rows?.length >= index) {
      setRows((prevState) => {
        let newState;
        if (prevState) {
          newState = prevState.map((entry, idx) =>
            idx === index
              ? { ...entry, textDescription: value.target.value }
              : entry
          );
        }
        return newState;
      });
    }
  };

  useEffect(() => {
    initComponent();
  }, []);

  useEffect(() => {
    initComponent();
  }, [initialValue]);

  useEffect(() => {
    if (onChange) {
      if (rows && rows.length) {
        const usedRows = rows.filter((row) => {
          if (row.textDescription !== "") {
            return row;
          }
        });
        serialize ? onChange(JSON.stringify(usedRows)) : onChange(usedRows);
      }
    }
  }, [rows]);

  return (
    <div className={containerClass + ""}>
      {rows?.length &&
        rows.map((row, idx) => {
          return (
            <div key={"text-rows-" + idx} className="w-full mt-[-15px]">
              <CustomInputOne
                readOnly={readOnly}
                simpleInput={true}
                name={DESCRIPTION_FIELD_NAME + idx}
                id={DESCRIPTION_FIELD_NAME + idx}
                type="text"
                value={row.textDescription}
                onChange={(e) => {
                  internalOnchangeValue(idx, e);
                }}
              />
            </div>
          );
        })}
      <a
        onClick={() => {
          addRow();
        }}
        onKeyUp={() => {}}
        className="cursor-pointer"
      >
        {!readOnly ? (
          <div className="flex justify-end">
            <div>
              <Image
                src={"/utopia/icons/plus_icon.png"}
                alt="+"
                width={20}
                height={20}
                draggable={false}
                className="flex"
              />
            </div>
            <span className="flex text-principal-180">Nueva Fila</span>
          </div>
        ) : (
          <></>
        )}
      </a>
    </div>
  );
};

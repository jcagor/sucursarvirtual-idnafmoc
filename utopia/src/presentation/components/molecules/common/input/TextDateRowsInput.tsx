"use client";

import { TextDateMolecule, TextDateMoleculeList } from "lib";
import Image from "next/image";
import {
  CustomInputOne,
  DatePickerGrayInput,
} from "presentation/components/atoms";
import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { DateObject } from "react-multi-date-picker";

type customProps = {
  numRows?: number;
  containerClass?: string;
  onChange?: (json: string | object) => void;
  serialize?: boolean;
  name: string;
  readOnly?: boolean;
  initialValue?: TextDateMoleculeList;
};

export const TextDateRowsInput = (props: customProps) => {
  const {
    numRows = 3,
    containerClass = "",
    onChange: onChange,
    serialize = false,
    name: name,
    readOnly,
    initialValue,
  } = props;

  const DESCRIPTION_FIELD_NAME = name + "_rows_description_";
  const DATE_FIELD_NAME = name + "_rows_date_";
  const MAX_ENTRIES = 10;

  const [rows, setRows] = useState<TextDateMoleculeList>();

  const getEmptyEntry = (): TextDateMolecule => {
    const currentTime = new Date();
    return {
      textDescription: "",
      isoDateString: currentTime.toISOString(),
      timestamp: +currentTime,
    } as TextDateMolecule;
  };
  const addRow = () => {
    console.log("Agregar fila");
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
      let initialData: TextDateMoleculeList = [];
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

  const internalOnchangeDate = (
    index: number,
    value: FormEvent<CSSProperties> | DateObject | DateObject[] | null
  ) => {
    if (value instanceof DateObject) {
      console.log("Update Values:", +value);
      let selectTime = new Date(+value);
      if (rows && rows?.length >= index) {
        setRows((prevState) => {
          let newState;
          if (prevState) {
            newState = prevState.map((entry, idx) =>
              idx === index
                ? {
                    ...entry,
                    isoDateString: selectTime.toISOString(),
                    timestamp: +selectTime,
                  }
                : entry
            );
          }
          return newState;
        });
      }
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
            <div
              key={"text-date-row-" + idx}
              className="w-full grid grid-cols-1 xl:grid-cols-2 mt-[-15px] gap-2"
            >
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
              <DatePickerGrayInput
                disabled={readOnly}
                name={DATE_FIELD_NAME + idx}
                className="full-width-date-picker"
                inputClass="full-width-date-picker-input"
                placeholder="01 | 10 | 75"
                value={row.timestamp}
                onChange={(e) => {
                  internalOnchangeDate(idx, e);
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

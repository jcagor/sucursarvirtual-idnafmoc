"use client";
import { FC, useState } from "react";
import { NeutralBlackText } from "../text";

type FormPropsType = {
  label: string;
  isSelected: boolean;
  className?: string;
  errors?: React.ReactNode;
  onClickButton: (value: any) => void;
};
export const YesNoSelect: FC<FormPropsType> = ({
  label,
  isSelected,
  className,
  errors,
  onClickButton,
}) => {
  const [first, setFirst] = useState<boolean>(true);
  const [second, setSecond] = useState<boolean>(false);

  const onClick = (val: number) => {
    if (val == 0) {
      setFirst(true);
      setSecond(false);
      onClickButton(0);
    } else {
      setFirst(false);
      setSecond(true);
      onClickButton(1);
    }
  };
  return (
    <div
      className={`w-[calc(324px)] ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      }`}
    >
      <div className={`w-full h-full flex flex-col`}>
        <div className="w-full h-5 flex flex-wrap flex-row justify-between">
          <NeutralBlackText className={"text-principal-450"} text={label} />
        </div>
        <div className="flex flex-row w-full h-2/3 items-center justify-between">
          <div
            onClick={() => {
              onClick(0);
            }}
            className={`flex justify-center cursor-pointer items-center w-6 h-6 ml-10 rounded-full border-2 ${
              first ? "border-principal-120" : "bg-principal-110 border-hidden"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                first ? "bg-principal-120" : "bg-none"
              }`}
            ></div>
          </div>
          <NeutralBlackText className={"text-principal-450"} text={"SI"} />
          <div
            onClick={() => {
              onClick(1);
            }}
            className={`flex justify-center cursor-pointer items-center w-6 h-6 ml-10 rounded-full border-2 ${
              second ? "border-principal-120" : "bg-principal-110 border-hidden"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                second ? "bg-principal-120" : "bg-none"
              }`}
            ></div>
          </div>
          <NeutralBlackText className={"text-principal-450"} text={"NO"} />
        </div>
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      </div>
    </div>
  );
};

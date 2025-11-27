"use client";
import React, { FC } from "react";
import { ArrowIcon, Description, MenuCard, useBetaAccess } from "presentation";
import { Radio, RadioGroup } from "@nextui-org/react";
import Image from "next/image";
import { Conditional } from "lib";

export interface ActionIconCardInterface {
  index: any;
  text: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageClassname: string;
  isSelected: boolean;
  onClickButton: (value: any) => void;
  key: any;
}

export const ActionIconCard: FC<ActionIconCardInterface> = ({
  text,
  imageUrl,
  imageWidth,
  imageHeight,
  imageClassname,
  isSelected,
  onClickButton,
  key,
}) => {
  return (
    <div
      key={key}
      onClick={onClickButton}
      className={`flex w-[26.375rem] h-[6.25rem] md:w-[49.548rem] md:h-[6.25rem] md:ml-6 mx-auto items-center gap-4 py-4 rounded-lg shadow-sm cursor-pointer transition-all bg-principal-150 my-4 ${
        isSelected ? "border-2 border-principal-700" : ""
      }`}
    >
      <div className={` flex flex-col  ${imageUrl != "" ? "w-1/4" : "w-1/10"}`}>
        <div
          className={`flex justify-center items-center w-6 h-6 ml-10 rounded-full border-2 ${
            isSelected
              ? "border-principal-120"
              : "bg-principal-110 border-hidden"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full ${
              isSelected ? "bg-principal-120" : "bg-none"
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`flex flex-col ${imageUrl != "" ? "w-2/4" : "w-9/10 mx-10"}`}
      >
        <Description
          text={text}
          className="font-outfit font-normal text-base text-principal-320"
        />
      </div>
      <Conditional showWhen={imageUrl != ""}>
        <div className={`flex items-center justify-center w-1/4`}>
          <Image
            src={imageUrl}
            alt="Card image"
            width={imageWidth}
            height={imageHeight}
            draggable={false}
            className={imageClassname}
          />
        </div>
      </Conditional>
    </div>
  );
};

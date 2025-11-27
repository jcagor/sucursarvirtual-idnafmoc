import { Conditional } from "lib/directives";
import { FiledInfoSectionInterface } from "lib/types/table";
import {
  Description,
  MainTitle,
  NeutralBlackText,
  SecondaryText,
} from "presentation/components/atoms";
import React, { type FC } from "react";

export const FiledInfoSection: FC<FiledInfoSectionInterface> = ({
  mainTitle,
  status,
  ClassNameStatus,
  firstDescription,
  secondDescription,
  rightTextTitle,
  rightTextDesc,
}) => {
  return (
    <section className="w-full">
      <div className="flex flex-wrap flex-row justify-between">
        <div className="flex flex-wrap flex-col">
          <div className="flex flex-wrap flex-row mb-10">
            <MainTitle
              text={mainTitle}
              className="text-l font-bold text-principal-180"
            />
            <Conditional showWhen={status ? true : false}>
              <SecondaryText
                className={`ml-3 font-outfit text-xl font-bold ${
                  ClassNameStatus ?? "text-principal-700"
                }`}
                text={status!}
              />
            </Conditional>
          </div>
          <div className="flex flex-wrap flex-row mb-5">
            <Conditional showWhen={rightTextTitle ? true : false}>
              <MainTitle
                className="text-l font-bold text-principal-180 text-right"
                text={rightTextTitle!}
              />
            </Conditional>
            <Conditional showWhen={rightTextDesc ? true : false}>
              <SecondaryText
                className="ml-3 font-outfit text-xl font-bold text-principal-180 text-right"
                text={rightTextDesc!}
              />
            </Conditional>
          </div>
          <div className="flex flex-wrap flex-col">
            <Description
              className="text-sm text-justify font-light text-principal-180"
              text={firstDescription}
            />
            <Conditional showWhen={secondDescription ? true : false}>
              <Description
                className="text-sm text-justify font-light text-principal-180"
                text={secondDescription!}
              />
            </Conditional>
          </div>
        </div>
      </div>
    </section>
  );
};

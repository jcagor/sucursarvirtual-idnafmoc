import { SectionSeparator } from "presentation/components/atoms";
import React, { HTMLAttributes } from "react";

type CustomSimpleHeaderProps = {
  classname?: HTMLAttributes<HTMLDivElement>["className"];
  title: string;
  subTitle?: string;
  thirdTitle?: string;
};
export const CustomSimpleHeader = ({
  classname,
  title,
  subTitle,
  thirdTitle,
}: CustomSimpleHeaderProps): React.JSX.Element => {
  return (
    <div className={`flex flex-col justify-start w-full${classname} `}>
      <h1 className="flex w-full font-outfit text-4xl text-left font-semibold text-principal-180">
        {title}
      </h1>
      <SectionSeparator className="mt-2 mb-2" />
      <h3 className="flex w-full font-outfit text-xl text-left font-semibold text-principal-180">
        {subTitle}
      </h3>
      <h3 className="flex w-full font-outfit text-xl text-left font-semibold text-principal-80">
        {thirdTitle}
      </h3>
    </div>
  );
};

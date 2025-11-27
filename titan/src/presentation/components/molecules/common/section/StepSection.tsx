import { Description, NumberCircle } from "presentation";
import { FC } from "react";

export interface StepSectionInterface {
  number: number;
  descriptionStep: string;
  className: string;
}

export const StepSection: FC<StepSectionInterface> = ({
  number,
  descriptionStep,
  className,
}) => {
  return (
    <div className={`flex flex-row items-center ${className}`}>
      <NumberCircle number={number} className="mr-8" />
      <Description
        text={descriptionStep}
        className="font-outfit font-semibold text-xl text-principal-100"
      />
    </div>
  );
};

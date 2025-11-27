import { Description, NumberCircle } from "presentation";
import { FC } from "react";

export interface HeaderSectionInterface {
  descriptionStep: string;
  className: string;
}

export const SectionHeader: FC<HeaderSectionInterface> = ({
  descriptionStep,
  className,
}) => {
  return (
    <div className={`flex flex-row items-center ${className}`}>      
      <Description
        text={descriptionStep}
        className="font-outfit font-semibold text-xl text-principal-100"
      />
    </div>
  );
};

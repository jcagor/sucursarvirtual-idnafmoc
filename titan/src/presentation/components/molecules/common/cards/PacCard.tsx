import { HighPriorityIcon } from "presentation/components/atoms";
import { FC } from "react";

interface PacCardProps {
  name: string;
  document: string;
  kinship: string;
  classname?: string;
  version?: string;
  onPress?: () => void;
}

const PacCard: FC<PacCardProps> = ({
  name,
  document,
  kinship,
  classname,
  version = "1",
  onPress,
}) => (
  <>
    {version == "1" && (
      <div
        className={`rounded-[1.25rem] shadow-lg bg-principal-150 flex flex-col w-[41.5rem] h-[8.75rem] justify-center items-start ${classname}
          max-w-full sm:w-full sm:h-auto sm:px-4 sm:py-4
        `}
      >
        <h3 className="text-2xl font-medium font-outfit text-principal-180 ml-8 sm:text-base sm:ml-0">
          {name}
        </h3>
        <h3 className="text-2xl font-medium font-outfit text-principal-180 ml-8 sm:text-base sm:ml-0">
          {document}
        </h3>
        <h4 className="text-2xl font-medium font-outfit text-principal-180 ml-8 sm:text-base sm:ml-0">
          {`Parentesco: ${kinship.toLowerCase()}`}
        </h4>
      </div>
    )}
    {version == "2" && (
      <div
        onClick={onPress}
        className={`relative rounded-[1.25rem] shadow-lg bg-principal-150 flex flex-col justify-center max-w-72 min-w-72 max-h-32 min-h-32 px-8 py-1 overflow-auto cursor-pointer ${classname}
          sm:max-w-full sm:min-w-0 sm:max-h-full sm:min-h-0 sm:px-4 sm:py-4
        `}
      >
        <h3 className="text-lg font-medium font-outfit self-start text-left text-principal-180 sm:text-base">
          {name}
        </h3>
        <h3 className="text-lg font-medium font-outfit self-start text-principal-180 sm:text-base">
          {document}
        </h3>
        <h4 className="text-lg font-medium font-outfit self-start text-principal-750 sm:text-base">
          {`${
            kinship.charAt(0).toUpperCase() + kinship.slice(1).toLowerCase()
          }`}
        </h4>
      </div>
    )}
    {version == "3" && (
      <div className="relative overflow-visible sm:overflow-auto">
        <div
          onClick={onPress}
          className={`relative rounded-[1.25rem] shadow-lg bg-principal-150 flex flex-col justify-center max-w-72 min-w-72 max-h-32 min-h-32 px-8 py-1 overflow-visible cursor-pointer ${classname}
            sm:max-w-full sm:min-w-0 sm:max-h-full sm:min-h-0 sm:px-4 sm:py-4
          `}
        >
          <HighPriorityIcon className="w-10 h-10 z-20 absolute top-[calc(-12px)] right-[calc(0px)] sm:w-8 sm:h-8 sm:top-0 sm:right-0" />
          <h3 className="text-lg font-medium font-outfit self-start text-left text-principal-180 sm:text-base">
            {name}
          </h3>
          <h3 className="text-lg font-medium font-outfit self-start text-principal-180 sm:text-base">
            {document}
          </h3>
          <h4 className="text-lg font-medium font-outfit self-start text-principal-750 sm:text-base">
            {`${
              kinship.charAt(0).toUpperCase() + kinship.slice(1).toLowerCase()
            }`}
          </h4>
        </div>
      </div>
    )}
  </>
);

export { PacCard };
export type { PacCardProps };

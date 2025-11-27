import { type FC, type ReactElement } from "react";

interface FilesCardProperty {
  to?: string;
  description: string;
  icon: ReactElement;
  shadowColor: string;
  iconClassName?: string;
  cardClassName?: string;
  onChange?: (selection: any) => void;
}

export const FilesCard: FC<FilesCardProperty> = ({
  to,
  description,
  icon,
  shadowColor,
  iconClassName,
  cardClassName,
  onChange,
}) => (
  <>
    {
      <button
        type="button"
        onClick={onChange}
        className={`flex flex-col w-96 h-24 bg-principal-150 rounded-xl overflow-y-visible items-center cursor-pointer ${cardClassName}`}
      >
        <div className={`mt-2 justify-center ${iconClassName}`}>{icon}</div>
        <div
          className={`absolute w-[calc(53px)] h-[calc(53px)] ml-10 bottom-[calc(25px)] shadow-2xl rounded-full ${shadowColor}`}
        ></div>
        {/* <div
      className={`w-[calc(63px)] h-[calc(63px)] ml-8 bottom-[calc(20px)]  ${shadowColor}`}
    ></div> */}
        <div className="flex w-full px-2 font-outfit justify-center text-principal-180 ">
          <span className=" text-ellipsis whitespace-nowrap overflow-hidden">
            {description}
          </span>
        </div>
      </button>
    }
  </>
);

export type { FilesCardProperty };

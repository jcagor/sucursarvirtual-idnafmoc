import Link from "next/link";
import { type FC, type ReactElement } from "react";

interface RedirecCardProperty {
  to?: string;
  description: string;
  icon: ReactElement;
  shadowColor: string;
  iconClassName?: string;
  cardClassName?: string;
  onChange?: (selection: any) => void;
}

const RedirectCard: FC<RedirecCardProperty> = ({
  to,
  description,
  icon,
  shadowColor,
  iconClassName,
  cardClassName,
  onChange,
}) => (
  <>
    {to ? (
      <Link href={to} passHref={true} onClick={onChange}>
        <div
          className={`flex flex-row w-72 h-20 bg-principal-150 rounded-xl overflow-y-visible items-center ${cardClassName}`}
        >
          <div className={iconClassName}>{icon}</div>
          <div
            className={`absolute w-[calc(53px)] h-[calc(53px)] ml-10 bottom-[calc(25px)] shadow-2xl rounded-full ${shadowColor}`}
          ></div>
          {/* <div
      className={`w-[calc(63px)] h-[calc(63px)] ml-8 bottom-[calc(20px)]  ${shadowColor}`}
    ></div> */}
          <div className="ml-10 pr-6 font-outfit text-principal-180">
            {description}
          </div>
        </div>
      </Link>
    ) : (
      <div
        onClick={onChange}
        className={`flex flex-row w-72 h-20 bg-principal-150 rounded-xl overflow-y-visible items-center cursor-pointer ${cardClassName}`}
      >
        <div className={iconClassName}>{icon}</div>
        <div
          className={`absolute w-[calc(53px)] h-[calc(53px)] ml-10 bottom-[calc(25px)] shadow-2xl rounded-full ${shadowColor}`}
        ></div>
        {/* <div
      className={`w-[calc(63px)] h-[calc(63px)] ml-8 bottom-[calc(20px)]  ${shadowColor}`}
    ></div> */}
        <div className="ml-10 pr-6 font-outfit text-principal-180">
          {description}
        </div>
      </div>
    )}
  </>
);

export { RedirectCard };
export type { RedirecCardProperty };

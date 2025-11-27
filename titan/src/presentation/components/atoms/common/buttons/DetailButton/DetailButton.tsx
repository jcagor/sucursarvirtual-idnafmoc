import { type FC } from "react";
import { DetailWhiteIcon } from "../../images";

export interface ButtonInterface {
  label?: string;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
  useFullWidth?: boolean;
  disable?: boolean;
}

export const DetailButton: FC<ButtonInterface> = ({
  label = "Aceptar",
  primary = false,
  onClick,
  className = "",
  disable,
}) => {
  return (
    <button
      onClick={onClick}
      className=" flex flex-row w-[8.688rem] h-[2.5rem] bg-principal-700 rounded-full justify-center items-center text-principal-150"
    >
      {label}
      <DetailWhiteIcon className="ml-2" />
    </button>
  );
};

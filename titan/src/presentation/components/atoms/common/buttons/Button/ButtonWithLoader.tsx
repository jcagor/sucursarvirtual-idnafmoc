import { type FC } from "react";
import { LoadingSimpleAnimation } from "../../animations";

export interface ButtonWithLoaderInterface {
  label?: string;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
  useFullWidth?: boolean;
  disable?: boolean;
  loading?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
}

export const ButtonWithLoader: FC<ButtonWithLoaderInterface> = ({
  label = "Aceptar",
  primary = false,
  onClick,
  className = "",
  useFullWidth = true,
  disable,
  loading,
  type,
}) => {
  return (
    <>
      {loading ? (
        <LoadingSimpleAnimation className="w-full h-full max-h-14 min-h-14 mt-4 bg-none flex justify-center items-center overflow-hidden"></LoadingSimpleAnimation>
      ) : (
        <button
          type={`${type ? type : "button"}`}
          disabled={disable || loading}
          className={`${
            useFullWidth ? "w-full" : ""
          } max-h-14 min-h-14 flex flex-row justify-center text-[calc(18px)] font-outfit font-semibold rounded-[calc(25px)] active:scale-95 ${className}
      ${
        disable
          ? "text-principal-150 bg-principal-320"
          : primary
          ? "text-principal-150 bg-principal-700"
          : "bg-none border-[calc(1px)] border-principal-700 text-principal-700"
      } `}
          onClick={onClick}
        >
          <p className="self-center">{label}</p>
        </button>
      )}
    </>
  );
};

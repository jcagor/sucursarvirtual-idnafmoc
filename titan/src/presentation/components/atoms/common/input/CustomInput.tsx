import { FC, InputHTMLAttributes } from "react";
import { NeutralBlackText } from "../text";

type CustomInputOneProps = {
  label?: string;
  title?: string;
  errors?: React.ReactNode;
  classNameContainer?: string;
};

export const CustomInputOne: FC<
  InputHTMLAttributes<HTMLInputElement> & CustomInputOneProps
> = (props: InputHTMLAttributes<HTMLInputElement> & CustomInputOneProps) => {
  const {
    value,
    disabled,
    onChange,
    label="",
    errors,
    title,
    classNameContainer: ClassName,
  } = props;

  return (
    <div
      className={`w-[calc(324px)] ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassName}`}
    >
      <div className="w-full h-full">
        <NeutralBlackText
          className={"text-principal-450 h-[calc(20px)]"}
          text={title ? title : label}
        />
        <input
          disabled={disabled}
          placeholder={label}
          className={`w-full h-[calc(48px)] pl-[calc(15px)] outline-principal-180 border-[calc(1px)] px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-440 border-1 rounded-[calc(5px)] font-outfit text-[calc(15px)] ${
            disabled ? "bg-principal-460" : "bg-principal-150"
          }`}
          style={{}}
          value={value}
          onChange={onChange}
        />
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      </div>
    </div>
  );
};

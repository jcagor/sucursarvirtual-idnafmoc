import { FC, InputHTMLAttributes } from "react";
import { NeutralBlackText } from "../text";

type CustomInputOneProps = {
  title?: string;
  errors?: React.ReactNode;
  icon: React.ReactNode;
  placeholder?: string;
  ClassNameContainer?: string;
  simpleInput?: boolean;
};

export const CustomInputIcon: FC<
  InputHTMLAttributes<HTMLInputElement> & CustomInputOneProps
> = (props: InputHTMLAttributes<HTMLInputElement> & CustomInputOneProps) => {
  const {
    id,
    name,
    value,
    disabled,
    onChange,
    simpleInput = false,
    errors,
    title = "",
    placeholder,
    type,
    ClassNameContainer: ClassName,
    icon = <></>,
  } = props;

  const input = (
    <input
      id={id}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      style={{}}
      value={value}
      type={type}
      onChange={onChange}
      className={`h-[calc(48px)] ${
        icon ? "pl-[calc(35px)]" : "pl-[calc(15px)]"
      } w-full rounded-[calc(5px)] outline-principal-180 border-2 border-principal-400 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-460 ${
        disabled ? "bg-principal-460" : "bg-principal-150"
      } ${"text-principal-180"} font-outfit text-[calc(15px)]`}
    />
  );

  return (
    <div
      className={` ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassName}`}
    >
      <div className="w-full h-full">
        {simpleInput ? (
          ""
        ) : (
          <NeutralBlackText
            className={"text-principal-450 h-[calc(20px)]"}
            text={title}
          />
        )}
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </span>
          {input}
        </label>
        {simpleInput ? (
          ""
        ) : (
          <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
            {errors}
          </div>
        )}
      </div>
    </div>
  );
};

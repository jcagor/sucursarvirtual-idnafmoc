import { FC, InputHTMLAttributes } from "react";
import { NeutralBlackText } from "../text";


type CustomInputOneProps = {
  title?: string;
  errors?: React.ReactNode;
  placeholder?: string;
  ClassNameContainer?: string;
  simpleInput?: boolean;
  ClassNameInput?: string;
};

export const CustomInputOne: FC<
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
    ClassNameInput,
  } = props;

  return (
    <div
      className={` ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassName}`}
    >
      <div className="w-full h-full">
        {!simpleInput ? (
          <NeutralBlackText
            className={"text-principal-450 h-[calc(20px)]"}
            text={title}
          />
        ) : (
          ""
        )}
        <input
          id={id}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full h-[calc(48px)] pl-[calc(15px)] outline-principal-180 border-2 border-principal-400 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-450 rounded-[calc(5px)] font-outfit text-[calc(15px)] ${
            disabled ? "bg-principal-460" : "bg-principal-150"
          } ${ClassNameInput} `}
          style={{}}
          value={value}
          type={type}
          onChange={onChange}
        />
        {!simpleInput ? (
          <div className="w-full max-h-10 overflow-y-scroll no-scrollbar text-red-500 text-sm">
            {errors}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

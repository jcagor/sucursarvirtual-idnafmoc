import { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { NeutralBlackText } from "../text";

type CustomInputOneProps = {
  title?: string;
  errors?: React.ReactNode;
  placeholder?: string;
  classNameContainer?: string;
  classNameInput?: string;
  borderColor?: string;
  isCustomBorder?: boolean;
};

export const CustomInputGray: FC<
  InputHTMLAttributes<HTMLInputElement> & CustomInputOneProps
> = (props: InputHTMLAttributes<HTMLInputElement> & CustomInputOneProps) => {
  const {
    id,
    name,
    value,
    disabled,
    onChange,
    errors,
    title = "",
    placeholder,
    type,
    classNameContainer: ClassName,
    readOnly,
    classNameInput: ClassNameInput,
    borderColor,
    isCustomBorder,
  } = props;

  const borderStyle = isCustomBorder ? borderColor : "border-principal-460";
  const disabledStyle = disabled ? "bg-principal-460" : borderStyle;

  return (
    <div
      className={` ${
        errors ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassName}`}
    >
      <div className="w-full h-full">
        <NeutralBlackText
          className={"text-principal-450 h-[calc(20px)]"}
          text={title}
        />
        <input
          id={id}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className={clsx(
            "w-full h-[calc(48px)] pl-[calc(15px)] outline-principal-180 border px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-440 rounded-[calc(5px)] font-outfit text-[calc(15px)]",
            disabledStyle,
            disabled ? "bg-principal-460" : "bg-principal-150",
            ClassNameInput
          )}
          style={{}}
          value={value}
          type={type}
          onChange={onChange}
          readOnly={readOnly}
          {...props}
        />
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      </div>
    </div>
  );
};

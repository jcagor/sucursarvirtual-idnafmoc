import { FC, InputHTMLAttributes } from "react";
import { NeutralBlackText } from "../text";

type LabelInputOneProps = {
  title?: string;
  errors?: React.ReactNode;
  placeholder?: string;
  classNameContainer?: string;
  label_id?:string,
  label_name?:string,
  label_value?:string,
};

export const LabelInput: FC<
  InputHTMLAttributes<HTMLInputElement> & LabelInputOneProps
> = (props: InputHTMLAttributes<HTMLInputElement> & LabelInputOneProps) => {
  const {
    id,
    name,
    value,
    label_id,
    label_name,
    label_value,
    disabled,
    onChange,
    errors,
    title = "",
    placeholder,
    type,
    classNameContainer: ClassName,
  } = props;

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
        <div className="flex">
        <input
          id={label_id}
          name={label_name}          
          readOnly={true}
          placeholder={" -- "}
          className={`w-[70px] h-[calc(48px)] pl-[calc(15px)] flex-none outline-principal-180 border-2 border-principal-400 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-440 rounded-[calc(5px)] font-outfit text-[calc(15px)] ${
            disabled ? "bg-principal-460" : "bg-principal-150"
          }`}
          style={{}}
          value={label_value}
          type={"text"}          
        />
        <input
          id={id}
          name={name}          
          placeholder={placeholder}
          className={`w-full h-[calc(48px)] pl-[calc(15px)] flex outline-principal-180 border-2 border-principal-400 px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-440 rounded-[calc(5px)] font-outfit text-[calc(15px)] ${
            disabled ? "bg-principal-460" : "bg-principal-150"
          }`}
          style={{}}
          value={value}
          type={type}
          onChange={onChange}
        />
        </div>
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errors}
        </div>
      </div>
    </div>
  );
};

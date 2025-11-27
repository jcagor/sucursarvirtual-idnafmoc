import { FC, InputHTMLAttributes } from "react";
import { NeutralBlackText } from "../text";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errors?: React.ReactNode;
  classNameContainer?: string;
};

type CustomTwoInputProps = {
  title?: string;
  errors?: React.ReactNode;
  placeholder?: string;
  classNameContainer?: string;
  inputOne: InputProps;
  inputTwo: InputProps;
};

export const CustomTwoInput: FC<
  InputHTMLAttributes<HTMLInputElement> & CustomTwoInputProps
> = (props: CustomTwoInputProps) => {
  const {
    id: idOne,
    name: nameOne,
    value: valueOne,
    disabled: disabledOne,
    onChange: onChangeOne,
    errors: errorsOne,
    placeholder: placeholderOne,
    type: typeOne,
    classNameContainer: ClassNameOne,
    readOnly: readOnlyOne,
  } = props.inputOne;
  const {
    id: idTwo,
    name: nameTwo,
    value: valueTwo,
    disabled: disabledTwo,
    onChange: onChangeTwo,
    errors: errorsTwo,
    placeholder: placeholderTwo,
    type: typeTwo,
    classNameContainer: ClassNameTwo,
    readOnly: readOnlyTwo,
  } = props.inputTwo;

  return (
    <div
      className={` ${
        errorsOne ? " h-[calc(108px)]" : " h-[calc(68px)]"
      } ${ClassNameOne} ${ClassNameTwo}`}
    >
      <div className="w-full h-full">
        <NeutralBlackText
          className={"text-principal-450 h-[calc(20px)]"}
          text={props.title ?? ""}
        />
        <div className="w-full flex">
          <input
            id={idOne}
            name={nameOne}
            disabled={disabledOne}
            placeholder={placeholderOne}
            className={`w-full max-w-[20%] h-[calc(48px)] pl-[calc(15px)] outline-principal-180 border ${
              disabledOne ? "border-principal-330" : "border-principal-460"
            } px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-440 rounded-s-[calc(5px)] font-outfit text-[calc(15px)] ${
              disabledOne ? "bg-principal-460" : "bg-principal-150"
            }`}
            style={{}}
            value={valueOne}
            type={typeOne}
            onChange={onChangeOne}
            readOnly={readOnlyOne}
          />
          <input
            id={idTwo}
            name={nameTwo}
            disabled={disabledTwo}
            placeholder={placeholderTwo}
            className={`w-full max-w-[80%] h-[calc(48px)] pl-[calc(15px)] outline-principal-180 border ${
              disabledTwo ? "border-principal-330" : "border-principal-460"
            } px-4 py-3 bg-principal-150 text-principal-450 placeholder-principal-440 rounded-e-[calc(5px)] font-outfit text-[calc(15px)] ${
              disabledTwo ? "bg-principal-460" : "bg-principal-150"
            }`}
            style={{}}
            value={valueTwo}
            type={typeTwo}
            onChange={onChangeTwo}
            readOnly={readOnlyTwo}
          />
        </div>
        <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
          {errorsOne}
          {errorsTwo}
        </div>
      </div>
    </div>
  );
};

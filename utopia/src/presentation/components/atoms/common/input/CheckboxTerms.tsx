import Link from "next/link";
import { FC, InputHTMLAttributes } from "react";

type CustomInputOneProps = {
  errors?: React.ReactNode;
};

export const CheckboxTerms: FC<
  InputHTMLAttributes<HTMLInputElement> & CustomInputOneProps
> = (props: InputHTMLAttributes<HTMLInputElement> & CustomInputOneProps) => {
  const { name, value, onChange, errors } = props;

  return (
    <div>
      <div className="flex items-center">
        <input
          id="link-checkbox"
          type="checkbox"
          value={value}
          name={name}
          onChange={onChange}
          className="w-10 h-10 text-principal-180 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="link-checkbox"
          className="ms-2 text-sm font-medium text-gray-900"
        >
          Al dar click, declaro que he leído y acepto la{" "}
          <Link
            href="https://www.comfandi.com.co/legal"
            target="_blank"
            className="text-principal-180 hover:underline"
          >
            Política de tratamiento de datos
          </Link>{" "}
          y consiento el tratamiento de mis datos como usuario de los programas
          y servicios de Fomento Empresarial
        </label>
      </div>
      <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
        {errors}
      </div>
    </div>
  );
};

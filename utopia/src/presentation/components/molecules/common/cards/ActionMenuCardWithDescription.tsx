"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ActionMenuCardWithDescriptionInterface {
  url?: string;
  imageUrl: string;
  text: string;
  description?: string;
  disabled?: boolean;
  disabledText?: string;
}

export const ActionMenuCardWithDescription = ({
  url,
  imageUrl,
  text,
  description,
  disabled = false,
  disabledText,
}: ActionMenuCardWithDescriptionInterface) => {
  const router = useRouter();

  return (
    <button
      className={`group relative flex flex-col w-80 h-64 gap-2 py-5 rounded-xl justify-center align-center shadow-lg border border-principal-320/10 hover:bg-principal-320/5 ${
        url ? "cursor-pointer" : "cursor-default"
      } ${
        disabled ? "bg-white grayscale opacity-50" : "hover:bg-principal-320/5"
      }`}
      onClick={() => !disabled && url && router.push(url)}
      disabled={disabled}
    >
      <div className="w-60 flex flex-col m-auto">
        <div className="w-full flex gap-3 align-center">
          <Image
            src={imageUrl}
            alt="img"
            width={50}
            height={50}
            loading="lazy"
            className="w-14 h-14"
          />
          <div className="flex w-full text-center justify-center items-center font-bold text-principal-180">
            {text}
          </div>
        </div>
        {description && (
          <div className="w-full mt-3 text-sm font-light text-[#777777] text-justify">
            {description}
          </div>
        )}

        {disabled && (
          <div className="absolute top-full mt-1 left-1/2 w-80 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white rounded-md px-2 py-1 whitespace-nowrap pointer-events-none">
            <p>{disabledText}</p>
          </div>
        )}
      </div>
    </button>
  );
};

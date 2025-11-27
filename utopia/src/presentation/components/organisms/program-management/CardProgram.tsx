"use client";

import Image from "next/image";

interface programProps {
  Title: string;
  Text: string;
  Icon: string;
  onClickAction: Function;
  IconHeight?: number;
  IconWidth?: number;
  disabled: boolean;
  path: string;
}

export const CardProgram: React.FC<programProps> = ({
  Title,
  Text,
  Icon,
  onClickAction,
  IconHeight,
  IconWidth,
  disabled,
  path,
}) => {
  return (
    <button
      onClick={() => {
        //disabled ? () => {} : onClickAction();
        onClickAction();
      }}
      className={`bg-principal-150 rounded-xl shadow-md p-6 hover:bg-opacity-5 hover:bg-principal-180 ${
        disabled ? "grayscale opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <Image
          src={Icon}
          alt="img"
          width={IconWidth ?? 50}
          height={IconHeight ?? 50}
        />
        <div className="text-principal-180 font-bold text-lg">{Title}</div>
      </div>
      <div className="text-principal-450 mt-3 text-sm leading-relaxed">
        {Text}
      </div>
    </button>
  );
};

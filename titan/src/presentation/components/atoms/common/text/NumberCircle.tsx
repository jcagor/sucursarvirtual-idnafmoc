"use client";
import { type FC } from "react";

interface NumberCircleProps {
  number: number;
  className?: string;
}

export const NumberCircle: FC<NumberCircleProps> = ({ number, className }) => {
  return (
    <div
      className={`flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-principal-100 text-principal-100 font-semibold ${className}`}
    >
      {number}
    </div>
  );
};

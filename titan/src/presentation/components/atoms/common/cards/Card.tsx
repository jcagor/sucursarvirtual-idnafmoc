import React, { FC } from "react";

interface CardProps {
  children: React.ReactNode;
  width?: string;
  className?: string;
}

const Card: FC<CardProps> = ({
  children,
  width = "max-w-[912px]",
  className = "",
}) => {
  return (
    <div
      className={`w-full ${width} bg-principal-150 flex flex-col gap-5 px-4 py-12 rounded-3xl shadow-lg transition-all duration-300 border border-principal-150 hover:border-principal-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

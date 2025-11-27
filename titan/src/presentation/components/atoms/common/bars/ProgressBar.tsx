import React from "react";

interface ProgressBarProps {
  percentage: number;
  label: string;
  color?: string;
  width?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  color = "bg-principal-700",
  width = "w-full",
}) => {
  return (
    <div className={`flex flex-col items-center ${width}`}>
      <div className="w-full bg-principal-470 rounded-full h-4 mb-2">
        <div
          className={`h-4 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-gray-500 text-sm text-center">{label}</span>
    </div>
  );
};

export default ProgressBar;

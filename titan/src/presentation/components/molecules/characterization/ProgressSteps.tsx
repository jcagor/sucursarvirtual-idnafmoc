"use client";

import React from "react";
import clsx from "clsx";

interface Step {
  id: number;
  title: string;
}

interface Props {
  steps: Step[];
  activeStep: number;
}

export const ProgressSteps = ({ steps, activeStep }: Props) => {
  return (
    <div className="w-full px-4 py-6">
      <div
        className="
          flex items-center
          gap-4 md:gap-6
          overflow-x-auto
          lg:overflow-x-hidden
          no-scrollbar
          bg-[#fff] shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          rounded-3xl py-8 px-10
        "
      >
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;

          return (
            <div
              key={step.id}
              className="flex items-center gap-4 flex-shrink lg:flex-shrink lg:min-w-0"
            >
              <div className="flex flex-col items-center text-center flex-shrink lg:flex-shrink-0">
                <div
                  className={clsx(
                    "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border-2 text-sm md:text-base font-semibold transition-all flex-shrink-0",
                    {
                      "bg-[#003DA5] border-[#003DA5] text-[#fff]": isActive,
                      "border-[#97D700] bg-[#97D700] text-[#fff]": isCompleted,
                      "border-[#D5D6D8] text-[#9899A1] bg-[#fff]":
                        !isCompleted && !isActive,
                    }
                  )}
                >
                  {isCompleted ? "✓" : step.id}
                </div>

                <span
                  className={clsx(
                    "text-[10px] md:text-[12px] mt-2 truncate max-w-[75px] md:max-w-[110px] text-[#003DA5] font-semibold"
                  )}
                >
                  {step.title}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={clsx(
                    "h-[2px] w-8 md:w-10 lg:flex-1 transition-all",
                    isCompleted ? "bg-[#97D700]" : "bg-[#D5D6D8]"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

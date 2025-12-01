'use client';

import React from 'react';
import clsx from 'clsx';

interface Step {
  id: number;
  title: string;
}

interface Props {
  steps: Step[];
  activeStep: number;
}

export const ProgressSteps = ({ steps, activeStep }: Props) => {
  console.log('Active Step:', activeStep);

  return (
    <div className='w-full px-4 py-6'>
      <div className='flex items-center gap-8 overflow-x-auto no-scrollbar bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-3xl py-8 px-10'>
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;

          return (
            <div key={step.id} className='flex items-center gap-8'>
              <div className='flex flex-col items-center text-center min-w-[80px]'>
                <div
                  className={clsx(
                    'w-12 h-12 flex items-center justify-center rounded-full border-2 text-base font-semibold transition-all',
                    {
                      'bg-[#003DA5] border-[#003DA5] text-[#FFFFFF]': isActive,

                      'border-[#003DA5] text-[#003DA5] bg-white': isCompleted,

                      'border-[#D5D6D8] text-[#9899A1] bg-white':
                        !isActive && !isCompleted,
                    }
                  )}
                >
                  {step.id}
                </div>

                <span
                  className={clsx(
                    'text-[11px] mt-2 leading-tight',
                    isActive ? 'text-[#003DA5] font-semibold' : 'text-[#6E6E73]'
                  )}
                >
                  {step.title}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={clsx(
                    'h-[2px] w-14 transition-all',
                    isCompleted ? 'bg-[#003DA5]' : 'bg-[#D5D6D8]'
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

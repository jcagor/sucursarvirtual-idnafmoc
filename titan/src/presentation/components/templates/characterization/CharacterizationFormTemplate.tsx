'use client';

import { Model } from 'survey-core';
import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { ProgressSteps } from 'presentation/components/molecules';
import {
  CharacterizationForm,
  CharacterizationSurvey,
} from 'presentation/components/organisms';
import { Breadcrumb } from 'presentation/components/atoms';
import { steps } from './constants/steps';

export const CharacterizationFormTemplate = ({ json }: any) => {
  const [activeStep, setActiveStep] = useState(0);

  const survey = useMemo(() => {
    const m = new Model(json);
    m.applyTheme({
      themeName: 'plain',
      colorPalette: 'light',
      cssVariables: {},
      isPanelless: true,
    });

    m.showNavigationButtons = false;

    // restaurar estado
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('characterization-progress');
      // if (saved) m.state = saved;

      if (m.currentPageNo < 0) m.currentPageNo = 0;
    }

    // eventos
    m.onCurrentPageChanged.add((sender) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('characterization-progress', sender.state);
      }
      setActiveStep(sender.currentPageNo);
    });

    m.onComplete.add((sender) => {
      console.log('DONE', sender.data);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('characterization-progress');
      }
    });

    return m;
  }, [json]);

  survey.css = {
    root: 'w-full',

    page: ![
      'identificacion_perfil_usuario',
      'condition_prioritization_vulnerability',
    ].includes(survey.currentPage.name)
      ? 'w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'
      : 'grid grid-cols-1',

    row: 'w-full !flex !flex-col !gap-0',
    rowMultiple: 'w-full !flex !flex-col',

    element: 'w-full',

    question: {
      mainRoot: 'w-full flex flex-col',
      content: 'w-full',
      title: 'text-sm font-semibold text-gray-700 mb-2',
    },

    text: {
      root:
        'w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 ' +
        'focus:outline-none focus:ring-2 focus:ring-[#003DA5]',
    },

    dropdown: {
      control:
        'w-full rounded-xl border border-gray-300 px-4 py-1 bg-white text-gray-800 appearance-none ' +
        'focus:outline-none focus:ring-2 focus:ring-[#003DA5] flex justify-between',
      popup: 'bg-white border border-gray-200 rounded-xl shadow-lg',
    },

    selectbase: {
      item: 'px-4 py-3 cursor-pointer hover:bg-gray-100 text-gray-700',

      itemSelected:
        'px-4 py-3 cursor-pointer bg-[#003DA5] text-white font-semibold',

      itemHovered: 'px-4 py-3 cursor-pointer bg-gray-100 text-gray-700',
    },

    body: {
      root: 'max-w-full',
    },

    radiogroup: {
      root: 'w-full flex flex-col gap-3',
      item: 'w-full block rounded-xl bg-[#F4F4F5] px-4 py-4 cursor-pointer text-gray-800 hover:bg-[#E6E6E7] transition font-medium',
      label: 'w-full flex items-center gap-4',
    },

    checkbox: {
      root: 'w-full flex flex-col gap-3',

      item: `
    w-full block rounded-xl bg-[#F4F4F5]
    px-4 py-4 cursor-pointer text-gray-800
    hover:bg-[#E6E6E7] transition font-medium
  `,

      label: 'w-full flex items-center gap-4',
    },
  };

  useEffect(() => {
    setActiveStep(survey.currentPageNo);
  }, [survey]);

  return (
    <div className='w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <Breadcrumb />

      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-[#003DA5]'>
          Formulario de Caracterización
        </h1>
        <p className='mt-2 text-gray-600'>
          Este formulario nos permitirá conocerte mejor y ofrecerte servicios
          personalizados.
        </p>
      </div>

      <div className='w-full mb-8 overflow-x-auto lg:overflow-x-visible no-scrollbar'>
        <ProgressSteps steps={steps} activeStep={activeStep} />
      </div>

      <CharacterizationForm
        surveyComponent={<CharacterizationSurvey model={survey} />}
        survey={survey}
      />
    </div>
  );
};

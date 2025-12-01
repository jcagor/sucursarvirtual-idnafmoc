'use client';

import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { useState, useEffect } from 'react';
import { Breadcrumb } from 'presentation/components/atoms/common/breadcrumb/Breadcrumb';
import { ProgressSteps } from 'presentation/components/molecules/characterization/ProgressSteps';

const steps = [
  { id: 1, title: 'Información Personal' },
  { id: 2, title: 'Ubicación y Contacto' },
  { id: 3, title: 'Perfil del Usuario' },
  { id: 4, title: 'Condición de Priorización' },
  { id: 5, title: 'Entorno Familiar' },
  { id: 6, title: 'Situación Socioeconómica' },
  { id: 7, title: 'Intereses en Servicios' },
];

interface Props {
  json: any;
}

export const CharacterizationFormTemplate = ({ json }: Props) => {
  const [activeStep, setActiveStep] = useState(0);

  const survey = new Model(json);

  useEffect(() => {
    survey.onCurrentPageChanged.add((sender) => {
      const page = sender.currentPageNo;
      setActiveStep(page < 0 ? 0 : page);
    });

    const initialPage = survey.currentPageNo;
    setActiveStep(initialPage < 0 ? 0 : initialPage);
  }, [survey]);

  return (
    <div className='w-full max-w-[1200px] mx-auto py-6'>
      <Breadcrumb />

      <div className='px-4 mb-6'>
        <h1 className='text-3xl font-bold text-[#003DA5]'>
          Formulario de Caracterización
        </h1>

        <p className='mt-2 text-gray-600 max-w-2xl'>
          Este formulario nos permitirá conocerte mejor y ofrecerte servicios
          personalizados…
        </p>
      </div>

      <ProgressSteps steps={steps} activeStep={activeStep} />

      <div className='mt-10 px-4'>
        <Survey model={survey} />
      </div>
    </div>
  );
};

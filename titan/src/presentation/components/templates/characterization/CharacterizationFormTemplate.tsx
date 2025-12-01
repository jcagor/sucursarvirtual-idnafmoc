'use client';

import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import { useState, useEffect, useMemo } from 'react';
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

const STORAGE_KEY = 'alv_form_progress';

interface Props {
  json: any;
}

export const CharacterizationFormTemplate = ({ json }: Props) => {
  const survey = useMemo(() => new Model(json), [json]);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { data, pageNo } = JSON.parse(stored);

        if (data) survey.data = data;
        if (typeof pageNo === 'number') survey.currentPageNo = pageNo;
      }
    } catch (err) {
      console.error('Error loading survey progress:', err);
    }

    const page = survey.currentPageNo;
    setActiveStep(page < 0 ? 0 : page);
  }, [survey]);

  useEffect(() => {
    const saveProgress = () => {
      const payload = {
        data: survey.data,
        pageNo: survey.currentPageNo,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    };

    survey.onValueChanged.add(saveProgress);
    survey.onCurrentPageChanged.add((sender) => {
      setActiveStep(sender.currentPageNo);
      saveProgress();
    });
    survey.onComplete.add(saveProgress);

    return () => {
      survey.onValueChanged.remove(saveProgress);
      survey.onCurrentPageChanged.remove(saveProgress);
      survey.onComplete.remove(saveProgress);
    };
  }, [survey]);

  useEffect(() => {
    survey.onComplete.add((sender) => {
      const raw = sender.data;

      const finalPayload = {
        postulation: {
          id: crypto.randomUUID(),
          ...raw, // todos los campos básicos
          date_create: new Date().toISOString(),
          date_update: new Date().toISOString(),
          log_send_email: false,
        },
      };

      console.log('📌 Final payload to send:', finalPayload);
    });
  }, [survey]);

  return (
    <div className='w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      <Breadcrumb />

      <div className='mb-6'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#003DA5]'>
          Formulario de Caracterización
        </h1>

        <p className='mt-2 text-sm sm:text-base text-gray-600 max-w-2xl'>
          Este formulario nos permitirá conocerte mejor y ofrecerte servicios
          personalizados según tus necesidades.
        </p>
      </div>

      {/* Barra de pasos */}
      <div className='w-full mb-8 overflow-x-auto lg:overflow-x-visible no-scrollbar'>
        <ProgressSteps steps={steps} activeStep={activeStep} />
      </div>

      <div className='survey-wrapper w-full'>
        <Survey model={survey} />
      </div>
    </div>
  );
};

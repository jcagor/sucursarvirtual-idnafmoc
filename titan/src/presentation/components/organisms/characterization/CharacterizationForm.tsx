'use client';

import { useRouter } from 'next/navigation';

const steps = [
  {
    emoji: '👤',
    title: 'Datos Básicos - Información Personal',
    description: 'Comencemos conociendo un poco sobre ti.',
  },
  {
    emoji: '📍',
    title: 'Datos Básicos - Ubicación y Contacto',
    description:
      'Continuemos con tu información de contacto y ubicación para mantenernos comunicados.',
  },
  {
    emoji: '📊',
    title: 'Identificación del Perfil del Usuario',
    description:
      'Las siguientes preguntas nos permitirán entender quién eres, en qué momento de tu vida o carrera estás, y qué necesitas para avanzar hacia tus metas',
  },
  {
    emoji: '⭐',
    title: 'Condición de Priorización o Vulnerabilidad',
    description:
      'Esta sección nos ayuda a identificar si haces parte de algún grupo que requiere atención prioritaria.',
  },
  {
    emoji: '🏠',
    title: 'Entorno Familiar y Comunitario',
    description:
      'Esta información nos ayuda a comprender tu contexto familiar y social.',
  },
  {
    emoji: '💰',
    title: 'Situación Socioeconómica y Conectividad',
    description:
      'Esta información nos ayuda a entender tu situación económica y tus capacidades tecnológicas.',
  },
  {
    emoji: '🎯',
    title: 'Intereses en Servicios de  Aprendizaje',
    description:
      'Ahora queremos conocer cuál es tu interés principal. Esta selección definirá tu ruta de acompañamiento personalizada.',
  },
  {
    emoji: '🚀',
    title: 'Ruta de Emprendimiento',
    description:
      'Queremos conocer más sobre tu emprendimiento o tu idea de negocio para brindarte el mejor acompañamiento.',
  },
];

export const CharacterizationForm = ({ surveyComponent, survey }: any) => {
  const router = useRouter();
  const step = survey.currentPageNo;
  const stepInfo = steps[step];
  const title = stepInfo?.title;
  const emoji = stepInfo?.emoji;
  const description = stepInfo?.description;

  return (
    <div className='w-full bg-white shadow-md rounded-2xl p-8 mt-6 bg-[#fff]'>
      {/* ==== HEADER ==== */}
      <div className='w-full bg-gradient-to-r from-[#1E4DD8] to-[#0F70E3] rounded-xl p-10 mb-8 flex justify-center gap-4 flex-col'>
        <div className='flex items-center'>
          <div className='text-white text-5xl mr-5'>{emoji}</div>
          <h2 className='text-[#fff] text-2xl font-bold'>{title}</h2>
        </div>
        <p className='text-[#fff] text-sm mt-1'>{description}</p>
      </div>

      {/* ==== SURVEYJS FORM ==== */}
      <div className='w-full'>{surveyComponent}</div>

      <div className='w-full flex items-center justify-between mt-10 pt-6'>
        <button
          type='button'
          className='
            bg-[#F5F5F7] text-[#1F2937]
            rounded-full flex items-center justify-center h-10 w-10  text-base font-medium
             transition gap-2
          '
          onClick={() => (step > 0 ? survey.prevPage() : router.back())}
        >
          ←
        </button>

        <button
          type='button'
          className='
            bg-[#97D700] text-[#fff] rounded-full
            px-10 py-3 text-base font-semibold shadow-md
            hover:bg-[#89c200] transition
          '
          onClick={() => {
            if (survey.isLastPage) {
              survey.completeLastPage();
            } else {
              survey.nextPage();
            }
          }}
        >
          {survey.isLastPage ? 'Finalizar' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
};

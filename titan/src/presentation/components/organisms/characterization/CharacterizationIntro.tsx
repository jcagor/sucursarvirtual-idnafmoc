import React from 'react';
import { Button, Card } from 'presentation/components/atoms';

interface Props {
  accepted: boolean;
  onAcceptChange: (value: boolean) => void;
  onNext: () => void;
}

export const CharacterizationIntro = ({
  accepted,
  onAcceptChange,
  onNext,
}: Props) => {
  const paragraphs = [
    '¡Hola! Gracias por tomarte el tiempo para diligenciar este formulario. Tu participación es muy importante porque nos permite conocerte mejor: entender tu situación personal, educativa, laboral y familiar, así como tus intereses y necesidades de formación, empleabilidad, emprendimiento o productividad.',
    'Con esta información podremos ofrecerte servicios, programas y oportunidades ajustadas a tu realidad y tus metas.',
    'Recuerda: toda la información será tratada con confidencialidad según la política de datos de Comfandi.',
  ];
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full p-4 md:p-6 lg:p-8'>
      <Card className='relative w-full max-w-[900px] bg-white rounded-3xl border border-solid border-[#0000000f]'>
        <div className='relative'>
          <img
            className='absolute w-[200px] md:w-[280px] lg:w-[318px] -top-[10rem] left-1/2 -translate-x-1/2 object-cover'
            alt='Avatar form'
            src='/icons/avatar_form.png'
          />

          <div className='pt-30 md:pt-36 lg:pt-40'>
            <div className='flex flex-col items-center justify-center gap-3 mb-8 md:mb-10'>
              <h1 className="text-xl leading-tight md:leading-[48px] font-semibold text-[#003da5] text-center [font-family:'Outfit',Helvetica]">
                👋 ¡Bienvenido a tu Caracterización ALV!
              </h1>
            </div>

            <div className='flex flex-col gap-4 mb-6'>
              {paragraphs.map((text, index) => (
                <p
                  key={index}
                  className="text-sm md:text-[15px] leading-relaxed text-[#86868b] [font-family:'Outfit',Helvetica] font-normal"
                >
                  {text}
                </p>
              ))}

              <p className="text-sm md:text-[15px] leading-relaxed text-[#003da5] font-medium [font-family:'Outfit',Helvetica]">
                ¡Gracias por ser parte de este proceso! Tu camino de aprendizaje
                y desarrollo empieza aquí.
              </p>

              <div className='flex flex-col items-start pt-4 pb-3 px-4 bg-[#f5f5f7] rounded-xl mt-2'>
                <div className='flex items-center gap-2'>
                  <span className="text-sm leading-[21px] text-[#1d1d1f] [font-family:'Outfit',Helvetica] font-normal">
                    ⏱ Tiempo estimado:
                  </span>
                  <span className="text-sm leading-[21px] text-[#1d1d1f] font-medium [font-family:'Outfit',Helvetica]">
                    15 minutos
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-start gap-3 p-5 bg-[#f5f5f7] rounded-xl'>
              <input
                type='checkbox'
                checked={accepted}
                onChange={(e) => onAcceptChange(e.target.checked)}
                className='w-5 h-5 mt-1 accent-[#003da5] rounded'
              />
              <p className="flex-1 text-xs md:text-[13px] leading-relaxed text-[#1d1d1f] [font-family:'Outfit',Helvetica] font-normal">
                Acepto que mis datos serán tratados con confidencialidad según
                la política de protección de datos de Comfandi. He leído y
                comprendo que esta información será utilizada para ofrecerme
                servicios y oportunidades personalizadas.
              </p>
            </div>
          </div>
        </div>
      </Card>
      <div className='flex justify-end mt-6 w-full max-w-[900px]'>
        <Button
          label='Siguiente'
          disabled={!accepted}
          onClick={onNext}
          primary
        />
      </div>
    </div>
  );
};

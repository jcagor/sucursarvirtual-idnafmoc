'use client';

import { Breadcrumb } from 'presentation/components/atoms';

export function CharacterizationFormSuccessTemplate() {
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

      <div className='rounded-3xl p-12 bg-[#fff] border border-[#E5E7EB] space-y-6 flex flex-col items-center px-6 py-12 text-center'>
        <div className='bg-[#97D700] text-7xl mb-6 rounded-full w-20 h-20 flex items-center justify-center text-[#fff]'>
          ✓
        </div>

        <h2 className='text-3xl font-semibold text-[#003DA5] mb-2'>
          ¡Caracterización Completada!
        </h2>

        <p className='text-[#86868B] max-w-xl mb-8'>
          Gracias por compartir tu información. Tu ruta de acompañamiento ha
          sido configurada exitosamente.
        </p>

        {/* Qué sigue */}
        <div className='bg-gradient-to-r from-[#003DA5] to-[#0059D4] text-[#fff] p-6 rounded-2xl max-w-xl w-full mb-8 shadow-lg'>
          <h3 className='text-xl font-semibold mb-4'>¿Qué sigue ahora?</h3>

          <ul className='space-y-2 text-left'>
            <li>✔️ Nuestro equipo analizará tu perfil y necesidades</li>
            <li>
              ✔️ Recibirás una ruta personalizada de servicios y oportunidades
            </li>
            <li>
              ✔️ Te contactaremos con información sobre programas y apoyos
              disponibles
            </li>
            <li>
              ✔️ Podrás acceder a tu historial y seguimiento en cualquier
              momento
            </li>
          </ul>
        </div>

        {/* Revisa tu correo */}
        <div className='bg-[#F5F5F7] p-6 rounded-2xl max-w-xl w-full mb-8 shadow'>
          <p className='font-medium text-[#003DA5]'>
            📬 Revisa tu correo electrónico
          </p>

          <p className='text-[#86868B] text-sm mt-2'>
            Te enviaremos un resumen de tu caracterización y los próximos pasos
            en las siguientes 24–48 horas.
          </p>
        </div>

        {/* Botones */}
        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
          <button
            className='bg-[#97D700] px-6 py-3 rounded-full text-[#fff] hover:bg-[#89c200] font-medium  transition'
            onClick={() => (window.location.href = '/')}
          >
            Volver al inicio
          </button>

          <button
            className='border-2 border-[#003DA5] text-[#003DA5] px-6 py-3 rounded-full font-medium hover:bg-[#E6F0FF] transition'
            onClick={() => (window.location.href = '/sucursal-virtual')}
          >
            Ir a la sucursal virtual
          </button>
        </div>

        <p className='mt-10 text-[#86868B] text-sm'>
          Tu camino de aprendizaje y desarrollo continúa con Comfandi
        </p>
      </div>
    </div>
  );
}

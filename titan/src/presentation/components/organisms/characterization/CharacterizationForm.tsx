'use client';

import { useRouter } from 'next/navigation';

export const CharacterizationForm = ({ surveyComponent, survey }: any) => {
  const router = useRouter();
  const step = survey.currentPageNo;
  const stepInfo = survey.jsonObj.pages?.[step]?.banner;
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

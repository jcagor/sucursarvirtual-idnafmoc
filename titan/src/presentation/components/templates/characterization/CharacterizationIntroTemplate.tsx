'use client';

import React, { useState } from 'react';
import { CharacterizationIntro } from 'presentation/components/organisms';
import { useRouter } from 'next/navigation';

export const CharacterizationIntroTemplate = () => {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (accepted) {
      router.push('/characterization/form');
    }
  };

  return (
    <CharacterizationIntro
      accepted={accepted}
      onAcceptChange={setAccepted}
      onNext={handleNext}
    />
  );
};
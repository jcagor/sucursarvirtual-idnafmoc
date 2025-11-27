"use client";
import { useState } from "react";
import { IntroductionPsicometricTest } from "./IntroductionPsicometricTest";
import { FormPsicometricTest } from "./FormPsicometricTest";

export const PsicometricTest = () => {
  const [currentForm, setCurrentForm] = useState(1);

  return (
    <div className="h-full">
      {currentForm === 1 && (
        <IntroductionPsicometricTest setCurrentForm={setCurrentForm} />
      )}
      {currentForm === 2 && (
        <FormPsicometricTest setCurrentForm={setCurrentForm} />
      )}
    </div>
  );
};

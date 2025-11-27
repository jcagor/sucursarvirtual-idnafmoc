"use client";
import {
  FormSelfManagement,
  IntroductionSelfManagement,
  LevelImplementation,
} from "presentation/components/organisms";
import { useState } from "react";

export const SelfManagementMenu = () => {
  const [currentForm, setCurrentForm] = useState(1);

  return (
    <div>
      {currentForm === 1 && (
        <IntroductionSelfManagement setCurrentForm={setCurrentForm} />
      )}
      {currentForm === 2 && (
        <LevelImplementation setCurrentForm={setCurrentForm} />
      )}
      {currentForm === 3 && (
        <FormSelfManagement setCurrentForm={setCurrentForm} />
      )}
    </div>
  );
};

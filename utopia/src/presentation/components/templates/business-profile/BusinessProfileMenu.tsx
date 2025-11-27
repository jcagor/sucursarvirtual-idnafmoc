"use client";

import {
  FormBusinessDescription,
  FormDataBusiness,
  FormDescriptionInfrastructureAndCapacity,
  FormLegalRepresentativeAndContact,
  FormProgram,
  IntroductionBusinessProfile,
} from "presentation";
import { FormFinancialInformation } from "presentation/components/organisms/business-profile/FormFinancialInformation";
import { useState } from "react";

export const BusinessProfileMenu = () => {
  const [currentForm, setCurrentForm] = useState(1);

  return (
    <div className="h-full">
      {currentForm === 1 && (
        <IntroductionBusinessProfile setCurrentForm={setCurrentForm} />
      )}
      {/* {currentForm === 2 && <FormProgram setCurrentForm={setCurrentForm} />} */}
      {currentForm === 3 && (
        <FormDataBusiness setCurrentForm={setCurrentForm} />
      )}
      {currentForm === 4 && (
        <FormLegalRepresentativeAndContact setCurrentForm={setCurrentForm} />
      )}
      {currentForm === 5 && (
        <FormBusinessDescription setCurrentForm={setCurrentForm} />
      )}
      {currentForm === 6 && (
        <FormDescriptionInfrastructureAndCapacity
          setCurrentForm={setCurrentForm}
        />
      )}
      {currentForm === 7 && (
        <FormFinancialInformation setCurrentForm={setCurrentForm} />
      )}
    </div>
  );
};

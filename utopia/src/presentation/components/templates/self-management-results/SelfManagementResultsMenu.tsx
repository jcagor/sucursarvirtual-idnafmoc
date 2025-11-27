"use client";

import {
  Report,
  SelfManagementAnalisis,
  TableOpportunities,
} from "presentation/components/organisms";
import { useState } from "react";

export const SelfManagementResultsMenu = () => {
  const [currentForm, setCurrentForm] = useState(1);

  return (
    <div className="flex h-full">
      {currentForm === 1 && (
        <SelfManagementAnalisis setCurrentForm={setCurrentForm} />
      )}
      {currentForm === 2 && (
        <TableOpportunities setCurrentForm={setCurrentForm} />
      )}
      {currentForm === 3 && <Report setCurrentForm={setCurrentForm} />}
    </div>
  );
};

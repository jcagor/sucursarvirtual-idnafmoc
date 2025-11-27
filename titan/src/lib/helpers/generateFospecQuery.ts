"use client";

import { detect } from "detect-browser";

export const GenerateFospecQuery = (
  document_type: string,
  identification_number: string
) => {
  const browser = detect();

  return {
    documentType: document_type,
    identification: identification_number,
    userDevice: {
      os: "web",
      osVersion: `${browser?.name} ${browser?.version}`,
      appVersion: "1.0.0", // Puedes reemplazar esto con la versión de tu aplicación
    },
  };
};

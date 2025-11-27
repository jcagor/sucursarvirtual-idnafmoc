import { RightsVerifyInterface } from "domain/models";

export const getTitularNombreCompleto = (
  data: RightsVerifyInterface | undefined
): string => {
  const fullName = [
    data?.TitularPrimerNombre ?? "",
    data?.TitularSegundoNombre ?? "",
    data?.TitularPrimerApellido ?? "",
    data?.TitularSegundoApellido ?? "",
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return fullName.toUpperCase();
};

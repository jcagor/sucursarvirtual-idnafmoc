import { KINDSHIP, RELATIONSHIP } from "lib/config";

/**
 * Function to get kindship label from kindship code
 * @param kindshipCode
 * @returns kindship label
 */
export const kindshipSapNomenclature = (
  kindshipCode?: string
): string | undefined => {
  const searchKindShip = RELATIONSHIP.find(
    (kindship) => kindship.value == kindshipCode
  );
  return searchKindShip?.label;
};

/**
 * Function to get kindship code in a nomenclature defined by the params
 * @param nomenclatureCodeNeeded
 * @param kindshipCode
 * @returns
 */
export const getKindshipCodeFromOtherNomenclature = (
  nomenclatureCodeNeeded: "SAP" | "COMMON",
  kindshipCode?: string
): string | undefined => {
  // 1. ____________________ If undefined, early return

  if (!kindshipCode) {
    return;
  }

  // 2. ____________________ Find in Nomenclature selected

  const findInNomenclature =
    nomenclatureCodeNeeded == "COMMON"
      ? RELATIONSHIP.find(
          (kindship) =>
            kindship.value.toUpperCase() == kindshipCode.toUpperCase()
        )
      : KINDSHIP.find(
          (kindship) =>
            kindship.value.toUpperCase() == kindshipCode.toUpperCase()
        );

  // 3. ____________________ Return kindship nomenclature selected code

  if (findInNomenclature) {
    const findCodeNomenclatureSelected =
      nomenclatureCodeNeeded == "COMMON"
        ? KINDSHIP.find(
            (kindship) =>
              kindship.label.toUpperCase() ==
              findInNomenclature.label.toUpperCase()
          )
        : RELATIONSHIP.find(
            (kindship) =>
              kindship.label.toUpperCase() ==
              findInNomenclature.label.toUpperCase()
          );
    return findCodeNomenclatureSelected?.value;
  }
};

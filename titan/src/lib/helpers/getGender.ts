import { GENDER } from "lib/config";

/**
 * Get gender label from gender constants by gender code
 * @param genderCode
 * @returns gender label
 */
export const getGenderFromSap = (gender: string | number) => {
  const genderCode = gender.toString();
  const genderFound = GENDER.find((gender) => gender.sapValue === genderCode.toString());
  return genderFound?.label;
};

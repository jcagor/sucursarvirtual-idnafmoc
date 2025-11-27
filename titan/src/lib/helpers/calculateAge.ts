import dayjs from "@/src/lib/utils/dayjsTimeZone";
import { DateObject } from "react-multi-date-picker";

export function calculateAge(bornDateIso: string): number {
  const birthDate = dayjs.utc(bornDateIso);
  const today = dayjs.utc();

  let age = today.year() - birthDate.year();

  const birthdayThisYear = birthDate.year(today.year());

  if (today.isBefore(birthdayThisYear)) {
    age--;
  }

  return age;
}

export const calculateAgeWithBornDate = (
  bornDate: string | DateObject | Date | undefined
): number => {
  const bornDateSplit: string[] | undefined = bornDate
    ?.toString()
    .replace(/ /g, "")
    .split("|");
  const bornYear = `${bornDateSplit?.[2]}`;
  const bornMonth = `${bornDateSplit?.[1]}`;
  const bornDay = `${bornDateSplit?.[0]}`;

  let age: number = 0;

  if (bornYear && bornMonth && bornDay) {
    // Convertimos a formato ISO para pasar al backend
    const bornDateIso = `${bornYear}-${bornMonth.padStart(
      2,
      "0"
    )}-${bornDay.padStart(2, "0")}`;

    age = calculateAge(bornDateIso);

    return age;
  }
  return age;
};

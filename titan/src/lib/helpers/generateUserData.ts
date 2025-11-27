"use client";

import { detect } from "detect-browser";
import { UserDataInterface, UserDataRetrieved } from "lib/types";

export const GenerateUserData = (userName: string, phone: string) => {
  const browser = detect();

  return {
    username: userName,
    phone: phone,
    userDevice: {
      os: "web",
      osVersion: `${browser?.name} ${browser?.version}`,
      appVersion: "1.0.0", // Puedes reemplazar esto con la versión de tu aplicación
    },
  };
};

export const decodeUserInfoFromToken = (
  keyClockData: UserDataInterface
): UserDataRetrieved => {
  let names =
    keyClockData.given_name && keyClockData.given_name != ""
      ? keyClockData.given_name.split(" ")
      : undefined;
  let lastNames =
    keyClockData.family_name && keyClockData.family_name != ""
      ? keyClockData.family_name.split(" ")
      : undefined;

  return {
    document_type: keyClockData.identification_type ?? undefined,
    document_number: keyClockData.identification_number ?? undefined,
    email: keyClockData.email ?? undefined,
    phoneNumber: keyClockData.preferred_username ?? undefined, //cellphone
    firstName: names && names.length >= 1 ? names[0] : keyClockData.given_name,
    firstLastName: names && names.length >= 2 ? names[1] : undefined,
    middleName:
      lastNames && lastNames.length >= 1
        ? lastNames[0]
        : keyClockData.family_name,
    middleLastName:
      lastNames && lastNames.length >= 2 ? lastNames[1] : undefined,
  } as UserDataRetrieved;
};

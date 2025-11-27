import { DateObject } from "react-multi-date-picker";
import dayjs from "./dayjsTimeZone";

export function formatDateRange(dateRange: DateObject[]) {
  if (!Array.isArray(dateRange) || dateRange.length === 0) {
    return { startDate: undefined, endDate: undefined };
  }

  const formatDate = (date: DateObject) =>
    date ? date.format("YYYY-MM-DD") : undefined;

  return {
    startDate: formatDate(dateRange[0]),
    endDate: dateRange.length > 1 ? formatDate(dateRange[1]) : undefined,
  };
}

export const formatDate = (dateIso: string): string => {
  const date = new Date(dateIso);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

/**
 * Format a YYYY-MM-DD date to a DD/MM/YYYY
 * @param dateBaseFormat
 * @returns
 */
export const formatFromSAPDateToSVEDate = (dateBaseFormat: string): string => {
  try {
    if (!dateBaseFormat) {
      return "";
    }
    const dateSplitted = dateBaseFormat.split("-");
    const formattedDate = `${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`;
    return formattedDate;
  } catch (error) {
    return dateBaseFormat;
  }
};

export const xcdformatDateInMonth = (date: Date) => {
  const typedDate = dayjs(date).utc(true).format("DD MMMM YYYY - hh:mm a");
  const formatedDate = `${typedDate.slice(0, 2)} ${typedDate
    .charAt(3)
    .toUpperCase()}${typedDate.slice(4)}`;
  return formatedDate;
};


export const formatDateInMonth = (date: Date) => {
  const typedDate = dayjs(date).utc(true).format("DD MMMM YYYY - hh:mm a");
  const formatedDate = `${typedDate.slice(0, 2)} ${typedDate
    .charAt(3)
    .toUpperCase()}${typedDate.slice(4)}`;
  return formatedDate;
};

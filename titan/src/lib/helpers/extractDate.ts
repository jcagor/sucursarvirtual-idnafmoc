import { FILED_STATUS } from "lib";
import moment from "dayjs";

export const extractDate = (date: string, format?: number) => {
  // 1. Parse the timestamp string to a Date object
  const dateObject = moment(date).toDate();

  // 2. Extract year, month, and day components (with zero-padding)
  const year = dateObject.getUTCFullYear().toString().padStart(4, "0");
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = dateObject.getUTCDate().toString().padStart(2, "0");

  // 3. Format and return the date string
  if (format == 1) {
    return `${year}-${month}-${day}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};

export const getFiledStatus = (key: string) => FILED_STATUS[key];

export const calculateAge = (birthday:string) => { // birthday is a date
  const _birthday = new Date(birthday);
  var ageDifMs = Date.now() - _birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
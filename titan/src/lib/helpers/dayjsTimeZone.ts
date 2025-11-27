import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es'; // Import Spanish locale
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('es'); // Set the locale to Spanish
dayjs.tz.setDefault('America/Bogota');
export default dayjs;

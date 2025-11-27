import { S3FileId } from "domain/models/tech-assistance-cert/techAssistanceForm";
import GetOptionsUseCase from "domain/usecases/options/getOptions.use.case";
import { appContainer } from "infrastructure";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { jwtDecode } from "jwt-decode";
import {
  APPOINTMENT_ATTENDANCE_STATUS,
  APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE,
  FORM_DB_SELECT_OPTIONS,
  MPAC_USER_ROLE,
  TECH_REVISION_STATUS,
  TECH_REVISION_STATUS_TRANSLATE,
} from "lib/config";
import { IUserToken } from "types";

export const translateAttendanceStatus = (
  status: APPOINTMENT_ATTENDANCE_STATUS
) => {
  switch (status) {
    case APPOINTMENT_ATTENDANCE_STATUS.Absent:
      return APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE.Absent;
    case APPOINTMENT_ATTENDANCE_STATUS.Assigned:
      return APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE.Assigned;
    case APPOINTMENT_ATTENDANCE_STATUS.Attended:
      return APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE.Attended;
    case APPOINTMENT_ATTENDANCE_STATUS.Signing:
      return APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE.Signing;
    case APPOINTMENT_ATTENDANCE_STATUS.Rejected:
      return APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE.Rejected;
    case APPOINTMENT_ATTENDANCE_STATUS.Revision:
      return APPOINTMENT_ATTENDANCE_STATUS_TRANSLATE.Revision;
    default:
      return "Desconocido";
  }
};

export const translateTechRegisterStatus = (
  status: TECH_REVISION_STATUS | null
) => {
  switch (status) {
    case null:
      return TECH_REVISION_STATUS_TRANSLATE.pending;

    case TECH_REVISION_STATUS.approved:
      return TECH_REVISION_STATUS_TRANSLATE.approved;

    case TECH_REVISION_STATUS.rejected:
      return TECH_REVISION_STATUS_TRANSLATE.rejected;

    default:
      return TECH_REVISION_STATUS_TRANSLATE.unknown;
  }
};

export const decodeS3ImageUrl = (file: S3FileId): string | undefined => {
  const API_URL = process.env.NEXT_PUBLIC_RANN_API_URL;
  const API_S3_PATH = "/aws-s3-client/" + file;

  //console.log(API_URL);
  //console.log(API_S3_PATH);

  if (API_URL) {
    return new URL(API_S3_PATH, API_URL).toString();
  }
};

export const getSelectValues = async (
  field: FORM_DB_SELECT_OPTIONS,
  token: string
) => {
  const getOptionsList = appContainer.get<GetOptionsUseCase>(
    USECASES_TYPES._GetOptionsUseCase
  );
  const response = await getOptionsList.execute(field, token);
  if (response && response.length) {
    return response;
  }
  return [];
};

export const getCurrentUserRole = (token: string): MPAC_USER_ROLE => {
  const userInfo: IUserToken = jwtDecode(token);

  if (userInfo.realm_access?.roles) {
    const roles = userInfo.realm_access.roles;
    if (roles.includes(MPAC_USER_ROLE.admin)) {
      return MPAC_USER_ROLE.admin;
    }
    if (roles.includes(MPAC_USER_ROLE.analista)) {
      return MPAC_USER_ROLE.analista;
    }
    if (roles.includes(MPAC_USER_ROLE.consultor)) {
      return MPAC_USER_ROLE.consultor;
    }
    if (roles.includes(MPAC_USER_ROLE.administrador_activos)) {
      return MPAC_USER_ROLE.administrador_activos;
    }
    if (roles.includes(MPAC_USER_ROLE.administrador_general)) {
      return MPAC_USER_ROLE.administrador_general;
    }
  }

  return MPAC_USER_ROLE.unknown;
};

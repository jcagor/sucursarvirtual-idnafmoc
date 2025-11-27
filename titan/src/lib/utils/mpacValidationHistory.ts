import { MPAC_API_LAW_TYPE, MPAC_API_USER_TYPE_ENUM } from "lib/config";
import { SaveMpacStatusHistoryQuery } from "lib/types";

export const getLawByUserType = (userType: string): string => {
  console.log('getLawByUserType - Tipo de usuario recibido:', userType);
  
  const upperUserType = userType.toUpperCase();
  console.log('getLawByUserType - Tipo de usuario en mayúsculas:', upperUserType);
  
  let law: string;
  switch (upperUserType) {
    case MPAC_API_USER_TYPE_ENUM.CESANT:
    case MPAC_API_USER_TYPE_ENUM.UNIVERSAL:
      law = MPAC_API_LAW_TYPE.LEY_1636;
      break;
    case MPAC_API_USER_TYPE_ENUM.ACTIVE_WORKER:
    case MPAC_API_USER_TYPE_ENUM.BENEFICIARY:
      law = MPAC_API_LAW_TYPE.LEY_2069;
      break;
    default:
      law = MPAC_API_LAW_TYPE.LEY_1636; // Por defecto retornamos ley 1636
  }
  
  console.log('getLawByUserType - Ley asignada:', law);
  return law;
};

export const validateAndSetLaw = (data: SaveMpacStatusHistoryQuery): SaveMpacStatusHistoryQuery => {
  return data;
}; 
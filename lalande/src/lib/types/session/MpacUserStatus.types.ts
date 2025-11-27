import { MPAC_USER_ROLE } from "lib/config";
import { SelectOption } from "../inputs";

export interface MpacUserSessionStatus {
  userRole: MPAC_USER_ROLE;
  selectedBusiness: SelectOption | undefined;
}
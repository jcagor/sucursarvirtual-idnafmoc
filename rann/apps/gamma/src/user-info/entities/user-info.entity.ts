import { SelectOption } from "../../form-utils/entities/form-util.entity";

export enum USER_ROLES_LIST {
    admin="administrador-pymes",
    consultor="consultor-pymes",
    analyst="analista-pymes",
}

export class UserInfo {
    email?:string;
    name?:string;
}

export interface UserRole{
    ROLE:Array<string>;
    INFO?:UserInfo;
}

export interface BusinessInfo{
    BUSINESS:Array<string>;
    BUSINESS_SELECT?:Array<SelectOption>;
}
export interface UserInformationData {
  id: string;
  identification_number: string;
  identification_type: string;
  type: UserRole;
  business: BusinessInfo;
  created_at: string;
  updated_at: string;
  state?: boolean;
}
import { JWT } from "next-auth/jwt";
export interface RoleList{
  roles?: Array<string>;
}

export interface ResourceAccess{
  account?: RoleList;
}

export interface IUserToken extends JWT {
  name: string;
  email: string;
  sub: string;
  access_token: string;
  id_token: string;
  expires_at: number;
  refresh_token: string;
  iat: number;
  exp: number;
  jti: string;
  error: string | undefined;

  auth_time: number;
  email_verified: string;
  family_name: string;
  given_name: string;
  identification_number: string;
  identification_type: string;
  preferred_username: string;
  scope: string;
  session_state: string;
  iss: string;
  azp: string;
  sid: string;
  typ: string;

  //RoleInfo
  realm_access?: RoleList;
  resource_access?: ResourceAccess;
}

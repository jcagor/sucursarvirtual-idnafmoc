import { JWT } from 'next-auth/jwt';
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
}

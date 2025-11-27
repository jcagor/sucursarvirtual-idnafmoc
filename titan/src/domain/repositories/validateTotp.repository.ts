import { IGetVerifyTotp } from "lib/types/totp-validate";

export interface IValidateTotpRepository {
  getVerifyTotp(
    totp: string, 
    token: string,
  ): Promise<IGetVerifyTotp | undefined>;
}
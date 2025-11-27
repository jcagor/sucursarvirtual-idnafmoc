import { IEnroll } from "domain/models";

export interface IKeycloakRepository {
  updateUserData(
    accessToken: string,
    userData: IEnroll
  ): Promise<boolean | undefined>;
  logout(accessToken: string): Promise<boolean | undefined>;
}

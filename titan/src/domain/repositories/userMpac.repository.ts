import { UserMpacDataInterface } from "lib";

export interface IUserMpacStatusRepository {
  requestMpacStatus(
    data: {},
    accessToken: string
  ): Promise<UserMpacDataInterface | undefined>;
}

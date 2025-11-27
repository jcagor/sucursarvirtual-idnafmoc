import { ApiResponse } from "lib/types/userDevice/userDevice.types";

export interface IUserDataRepository {
  findUserByKCId(token: string): Promise<ApiResponse | undefined>;
  sendUserData(data: {}, token: string): Promise<ApiResponse | undefined>;
}

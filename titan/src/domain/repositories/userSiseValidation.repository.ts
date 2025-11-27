import { UserSiseResumeInformation, UserSiseValidationInterface } from "lib/types/user-data/userSiseValidation.types";

export interface IUserSiseValidationRepository {
  requestSiseValidation(
    data: {},
    accessToken: string
  ): Promise<UserSiseValidationInterface | undefined>;

  requestSiseUserResume(
    data: {},
    accessToken: string
  ): Promise<UserSiseResumeInformation | undefined>;
}

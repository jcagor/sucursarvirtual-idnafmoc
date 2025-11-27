import {
  OpenJobsList,
  UserFospecTrainingInterface,
  UserFospecValidationInterface,
} from "lib/types/user-data/userFospecValidation.types";

export interface IUserFospecValidationRepository {
  requestFospecValidation(
    data: {},
    accessToken: string
  ): Promise<UserFospecValidationInterface | undefined>;

  requestFospecMeetValidation(
    data: {},
    token: string
  ): Promise<UserFospecValidationInterface | undefined>;

  requestFospecTraining(
    data: {},
    accessToken: string
  ): Promise<UserFospecTrainingInterface | undefined>;

  requestFospecOpenJobs(
    data: {},
    accessToken: string
  ): Promise<OpenJobsList | undefined>;
}

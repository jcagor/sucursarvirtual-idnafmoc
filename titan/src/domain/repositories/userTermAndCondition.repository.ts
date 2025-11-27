import {
  ICreateTermAndConditionData,
  ICreateTermAndConditionDataResponse,
} from "lib/types/terms-conditions";

export interface IUserTermAndConditionRepository {
  createUserTermAndConditionData(
    token: string,
    data: ICreateTermAndConditionData
  ): Promise<ICreateTermAndConditionDataResponse | undefined>;
  getLastUserTermsAndConditionsByName(
    token: string,
    name: string
  ): Promise<any>;
}

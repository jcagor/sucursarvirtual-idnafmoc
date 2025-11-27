import { IGetTermAndConditionData } from "lib/types/terms-conditions";

export interface ITermAndConditionRepository {
  getTermAndConditionData(
    token: string,
    name: string
  ): Promise<IGetTermAndConditionData | undefined>;
}

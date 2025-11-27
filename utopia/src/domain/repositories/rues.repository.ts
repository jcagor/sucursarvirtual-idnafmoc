import { IsNitValidType, RuesType } from "domain/models";

export interface IRuesRepository {
  IsNitValid(
    identification_number: string
  ): Promise<IsNitValidType | undefined>;

  GetRuesInformation(
    identification_number: string
  ): Promise<RuesType | undefined>;
}

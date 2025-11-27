import { AdoResponseInterface } from "lib";

export interface IDigitalIdentityRepository {
  findStatusByUser(accessToken: string): Promise<any>;
  getLastTransaction(accessToken: string): Promise<any>;
  pushDatabase(
    accessToken: string,
    adoResponse: AdoResponseInterface
  ): Promise<any>;
}

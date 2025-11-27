import { Status } from "domain/models";

export interface IFindAllStatus {
  status: Status[];
  trecords: number;
}

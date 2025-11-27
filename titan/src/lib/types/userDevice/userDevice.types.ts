import { UserIdentifier } from "domain/models/UserIdentifier";

export interface UserDeviceReponse {
  os: string;
  osVersion: string;
  appVersion: string;
  userIdentifier: UserIdentifier;
}

export interface ApiResponse {
  data: UserDeviceReponse;
  message: string;
  statusCode: number;
}

import { UserDevice } from "./UserDevice";

export interface UserIdentifier {
  id: String;
  totpuuid: String;
  username: string;
  keycloakId: string;
  phone: string;
  createdAt: string;
  userDevice: UserDevice;
}

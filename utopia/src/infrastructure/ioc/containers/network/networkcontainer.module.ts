import { ContainerModule, interfaces } from "inversify";
import { NETWORK_TYPES } from "./network.types";
import { AxiosInstance } from "axios";
import {
  BusinessAxiosInstance,
  FomentoAxiosInstance,
  NextAxiosInstance,
  RuesAxiosInstance,
} from "infrastructure/network/axiosConfig";

export const networkModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AxiosInstance>(NETWORK_TYPES._AxiosNextInstance).toConstantValue(
    NextAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosBusinessInstance).toConstantValue(
    BusinessAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosRuesInstance).toConstantValue(
    RuesAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosFomentoInstance).toConstantValue(
    FomentoAxiosInstance
  );
});

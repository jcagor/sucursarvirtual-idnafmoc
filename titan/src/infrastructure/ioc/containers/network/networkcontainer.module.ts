import { ContainerModule, interfaces } from "inversify";
import { NETWORK_TYPES } from "./network.types";
import { AxiosInstance } from "axios";
import {
  FomentoAxiosInstance,
  MpacAxiosInstance,
  NextAxiosInstance,
  RannAxiosInstance,
  RiaAxiosInstance,
  SculptorAxiosInstance,
  SiseAxiosInstance,
} from "infrastructure/network/axiosConfig";

export const networkModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AxiosInstance>(NETWORK_TYPES._AxiosNextInstance).toConstantValue(
    NextAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosSculptorInstance).toConstantValue(
    SculptorAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosRiaInstance).toConstantValue(
    RiaAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosMpacInstance).toConstantValue(
    MpacAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosSiseInstance).toConstantValue(
    SiseAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosFomentoInstance).toConstantValue(
    FomentoAxiosInstance
  );

  bind<AxiosInstance>(NETWORK_TYPES._AxiosRannInstance).toConstantValue(
    RannAxiosInstance
  );
});

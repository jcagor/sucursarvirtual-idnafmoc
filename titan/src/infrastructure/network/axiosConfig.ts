import axios from "axios";
import { authInterceptor } from "lib/helpers/authInterceptor";

const nextApiURL = process.env.NEXT_PUBLIC_SITE_URL;
const sculptorURL = process.env.NEXT_PUBLIC_SCULPTOR_URL;
const riaURL = process.env.NEXT_PUBLIC_RIA_URL;
const rannURL = process.env.NEXT_PUBLIC_RANN_URL;
const mpacURL = process.env.NEXT_PUBLIC_MPAC_URL;
const siseURL = process.env.NEXT_PUBLIC_SISE_URL;
const fomentoURL = process.env.NEXT_PUBLIC_FOMENTO_URL;

const NextAxiosInstance = axios.create({ baseURL: nextApiURL });

const SculptorAxiosInstance = axios.create({
  baseURL: sculptorURL,
  withCredentials: true,
});

SculptorAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

const RiaAxiosInstance = axios.create({
  baseURL: riaURL,
  withCredentials: true,
});

RiaAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

const MpacAxiosInstance = axios.create({
  baseURL: mpacURL,
  withCredentials: true,
});

MpacAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

const RannAxiosInstance = axios.create({
  baseURL: rannURL,
  withCredentials: true,
});

RannAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

const SiseAxiosInstance = axios.create({
  baseURL: siseURL,
  withCredentials: true,
});

SiseAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

const FomentoAxiosInstance = axios.create({
  baseURL: fomentoURL,
  withCredentials: true,
});

FomentoAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

export {
  NextAxiosInstance,
  SculptorAxiosInstance,
  RiaAxiosInstance,
  MpacAxiosInstance,
  SiseAxiosInstance,
  FomentoAxiosInstance,
  RannAxiosInstance,
};

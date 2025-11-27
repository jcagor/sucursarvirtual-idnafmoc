import axios from "axios";
import { authInterceptor } from "lib";

const nextApiURL = process.env.NEXT_PUBLIC_SITE_URL;
const businessApiURL = process.env.NEXT_PUBLIC_BUSINESS_API_URL;
const ruesApiUrl = process.env.NEXT_PUBLIC_RUES_API_URL;
const fomentoApiURL = process.env.NEXT_PUBLIC_FOMENTO_API_URL;

const NextAxiosInstance = axios.create({ baseURL: nextApiURL });

const BusinessAxiosInstance = axios.create({
  baseURL: businessApiURL,
  withCredentials: true,
});
BusinessAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

const RuesAxiosInstance = axios.create({
  baseURL: ruesApiUrl,
  withCredentials: true,
});
RuesAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

const FomentoAxiosInstance = axios.create({
  baseURL: fomentoApiURL,
  withCredentials: true,
});
RuesAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

export {
  NextAxiosInstance,
  BusinessAxiosInstance,
  RuesAxiosInstance,
  FomentoAxiosInstance,
};

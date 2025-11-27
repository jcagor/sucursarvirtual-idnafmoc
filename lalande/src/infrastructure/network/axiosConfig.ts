import axios from "axios";
import { authInterceptor } from "lib";

const nextApiURL = process.env.NEXT_PUBLIC_SITE_URL;
const rannApiURL = process.env.NEXT_PUBLIC_RANN_API_URL;

const NextAxiosInstance = axios.create({ baseURL: nextApiURL });

const RannAxiosInstance = axios.create({
  baseURL: rannApiURL,
  withCredentials: true,
});
RannAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

export { NextAxiosInstance, RannAxiosInstance };

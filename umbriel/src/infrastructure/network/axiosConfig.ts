import axios from 'axios';
import { authInterceptor } from '@/lib/helpers/authInterceptor';

const nextApiURL = process.env.NEXT_PUBLIC_SITE_URL;
const businessApiURL = process.env.NEXT_PUBLIC_BUSINESS_API_URL;

const NextAxiosInstance = axios.create({ baseURL: nextApiURL });

const BusinessAxiosInstance = axios.create({
  baseURL: businessApiURL,
  withCredentials: true,
});

BusinessAxiosInstance.interceptors.request.use(
  async (config) => await authInterceptor(config)
);

export { NextAxiosInstance, BusinessAxiosInstance };

import { InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';
import { AccessToken, RefreshToken, Session } from 'next-auth';
import { refreshAccessToken } from '@/lib/actions/auth';

interface InterceptorSession extends Omit<Session, 'expires'> {}

export const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const session: InterceptorSession | null = await getSession();

  const now = Date.now() / 1000;
  if (session) {
    const accessToken = session.access_token;
    const refreshToken = session.refresh_token;
    if (accessToken && refreshToken) {
      const accessTokenDecoded: AccessToken = jwtDecode(accessToken);
      const refreshTokenDecoded: RefreshToken = jwtDecode(refreshToken);

      if (refreshTokenDecoded.exp < now) {
        // La sesión ha expirado completamente
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please log in again.'));
      }

      if (accessTokenDecoded.exp < now) {
        // El token de acceso ha expirado, intentamos refrescarlo
        await refreshAccessToken(session);
      }

      // Agregamos el token de autorización
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
  }
  return config;
}; 
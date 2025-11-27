import { refreshAccessToken } from "actions";
import { InternalAxiosRequestConfig } from "axios";
import LogoutKeycloakUseCase from "domain/usecases/keycloak/logoutKeycloak.usecase";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import { AccessToken, RefreshToken, Session } from "next-auth";
import { getSession } from "next-auth/react";

interface InterceptorSession extends Omit<Session, "expires"> {}

const logout = async (access_token: string) => {
  const logoutUseCase = appContainer.get<LogoutKeycloakUseCase>(
    USECASES_TYPES._LogoutKeycloakUseCase
  );
  await logoutUseCase.execute(access_token);
};

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
        await logout(accessToken);
        return Promise.reject(
          new Error("Session expired. Please log in again.")
        );
      }

      if (accessTokenDecoded.exp < now) {
        await refreshAccessToken(session);

        // Add the authorization header with the latest token
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    }

    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
};

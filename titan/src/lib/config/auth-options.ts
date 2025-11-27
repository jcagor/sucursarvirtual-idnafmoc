import KeycloakProvider from "next-auth/providers/keycloak";
import { AuthOptions } from "next-auth";
import { refreshAccessToken } from "actions";

const clientId = process.env.KEYCLOAK_CLIENT_ID ?? "";
const realm = process.env.KEYCLOAK_ISSUER ?? "";

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId,
      clientSecret: "",
      issuer: realm,
    }),
  ],
  pages: {
    signIn: "/api/auth/signin/keycloak",
    error: "/",
  },
  callbacks: {
    async jwt({ token, account, trigger, session }: any) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      // Inicialización del token la primera vez
      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      }

      if (!account && trigger === "update") {
        token.access_token = session.access_token;
        token.id_token = session.id_token;
        token.refresh_token = session.refresh_token;
        token.error = session.error;
        return token;
      }

      // Si el token aún es válido, devuélvelo
      if (nowTimeStamp < token.expires_at) {
        return token;
      }

      // Si el token ha expirado, intenta refrescarlo usando la API Route
      console.log("Token has expired. Will refresh...");
      try {
        const refreshedToken = await refreshAccessToken(token); // Llama a la API Route
        console.log("Token is refreshed.");
        return refreshedToken;
      } catch (error) {
        console.error("Refresh token expired, will logout...");
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }: any) {
      // Actualiza la sesión con el token renovado
      session.access_token = token.access_token;
      session.id_token = token.id_token;
      session.refresh_token = token.refresh_token;
      session.error = token.error;

      return session;
    },
  },
};

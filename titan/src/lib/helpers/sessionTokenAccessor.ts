import { authOptions } from "lib/config/auth-options";
import { getServerSession } from "next-auth";

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    const accessTokenDecrypted = session.access_token;
    return accessTokenDecrypted;
  }
  return null;
}

export async function getIdToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    const idTokenDecrypted = session.id_token;
    return idTokenDecrypted;
  }
  return null;
}

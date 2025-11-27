import { getServerSession } from "next-auth";
import { getIdToken } from "lib/helpers/sessionTokenAccessor";
import { authOptions } from "lib/config/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    const idToken = await getIdToken();

    // this will log out the user on Keycloak side
    var url = `${
      process.env.KEYCLOAK_END_SESSION
    }?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
      process.env.NEXTAUTH_URL!
    )}`;

    try {
      const resp = await fetch(url, { method: "GET" });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 200 });
}

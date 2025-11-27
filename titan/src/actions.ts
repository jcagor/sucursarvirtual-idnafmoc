"use server";

export async function refreshAccessToken(session: any) {
  const clientId = process.env.KEYCLOAK_CLIENT_ID ?? "";
  try {
    const resp = await fetch(`${process.env.KEYCLOAK_REFRESH_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: "",
        grant_type: "refresh_token",
        refresh_token: session.refresh_token,
      }),
    });

    const refreshedToken = await resp.json();

    if (!resp.ok) {
      throw new Error(refreshedToken.error || "Error refreshing token");
    }

    return {
      ...session,
      access_token: refreshedToken.access_token,
      id_token: refreshedToken.id_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshedToken.expires_in,
      refresh_token: refreshedToken.refresh_token,
    };
  } catch (error) {
    console.error("Refresh token expired, will logout...");
    throw error;
  }
}

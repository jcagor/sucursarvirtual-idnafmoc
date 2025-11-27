import { getServerSession } from "next-auth";
import { authOptions } from "utils/config/auth-options";
import { getIdToken } from "utils/helpers";

export async function GET(request: Request) {
  const API_URL = process.env.NEXT_PUBLIC_RANN_API_URL;
  const session = await getServerSession(authOptions);

  if (session) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");
    let rannImg = "";

    const token = await getIdToken();

    if (!token) {
      return new Response("Missing token", { status: 401 });
    }

    if (!imageUrl) {
      return new Response("Missing image URL", { status: 400 });
    }

    const API_S3_PATH = "/aws-s3-client/" + imageUrl;

    if (API_URL || API_URL!="") {
      rannImg = new URL(API_S3_PATH, API_URL).toString();
    } else {
      return new Response("Missing API URL", { status: 500 });
    }

    // Fetch the protected image
    const response = await fetch(rannImg, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new Response("Failed to fetch image", { status: response.status });
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const body = await response.arrayBuffer();

    return new Response(body, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } else {
    return new Response("Unauthorized: No active session", { status: 401 });
  }
}

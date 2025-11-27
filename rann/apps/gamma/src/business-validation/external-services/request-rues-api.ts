export async function requestRuesApi(
  identification_type: string,
  identification_number: string,
) {
  try {
    const access_token = await requestRuesAuthToken();

    const response = await fetch(process.env.NEXT_PUBLIC_RUES_URL!, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        In_Codigo_Canal: 2,
        In_Nit: identification_number,
        In_Tipo_ID: identification_type,
      }),
    });

    if (!response.ok) {
      throw new Error(`API rues respondio con status: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error(`API rues genero una respuesta invalida: ${response}`);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function requestRuesAuthToken(): Promise<string> {
  try {
    const basicAuthToken = Buffer.from(
      `${process.env.NEXT_PUBLIC_RUES_AUTH_USER}:${process.env.NEXT_PUBLIC_RUES_AUTH_PASS}`,
    ).toString('base64');

    const response = await fetch(process.env.NEXT_PUBLIC_RUES_AUTH_API!, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API de autenticacion en rues respondio con ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data?.access_token) {
      throw new Error(
        'No se obtuvo el token de acceso de la API de autenticacion en rues.',
      );
    }

    return data.access_token;
  } catch (error) {
    throw new Error(error.message);
  }
}

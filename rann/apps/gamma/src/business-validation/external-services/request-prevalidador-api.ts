export async function requestPrevalidadorApi(
  identification_type: string,
  identification_number: string,
) {
  try {
    const access_token = await requestPrevalidadorAuthToken();

    const url = new URL(process.env.NEXT_PUBLIC_PREVALIDADOR_URL!);

    url.searchParams.append('In_Codigo_Canal', '2');
    url.searchParams.append('In_Nit', identification_number);
    url.searchParams.append('In_Tipo_ID', identification_type);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API Prevalidador respondio con status: ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data) {
      throw new Error(
        `API Prevalidador genero una respuesta invalida: ${response}.`,
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function requestPrevalidadorAuthToken(): Promise<string> {
  try {
    const basicAuthToken = Buffer.from(
      `${process.env.NEXT_PUBLIC_PREVALIDADOR_AUTH_USER}:${process.env.NEXT_PUBLIC_PREVALIDADOR_AUTH_PASS}`,
    ).toString('base64');

    const response = await fetch(
      process.env.NEXT_PUBLIC_PREVALIDADOR_AUTH_API!,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `API de autenticacion en prevalidador respondio con ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data?.access_token) {
      throw new Error(
        'No se obtuvo el token de acceso de la API de autenticacion en prevalidador.',
      );
    }

    return data.access_token;
  } catch (error) {
    throw new Error(error.message);
  }
}

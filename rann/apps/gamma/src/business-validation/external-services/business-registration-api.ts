export async function businessRegistrationApi(
  identification_type: string,
  identification_number: string,
) {
  try {
    const access_token = await requestPrevalidadorAuthToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_IPAS_URL!}/API_Educacion_Registro_Empresa`,
      {
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
      },
    );

    if (!response.ok) {
      throw new Error(
        `API Registro empresa respondio con status: ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data) {
      throw new Error(
        `API Registro empresa genero una respuesta invalida: ${response}`,
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
      `${process.env.NEXT_PUBLIC_IPAS_AUTH_USER}:${process.env.NEXT_PUBLIC_IPAS_AUTH_PASS}`,
    ).toString('base64');

    const response = await fetch(process.env.NEXT_PUBLIC_IPAS_AUTH_API!, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API de autenticacion en registro empresa respondio con ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data?.access_token) {
      throw new Error(
        'No se obtuvo el token de acceso de la API de autenticacion en registro empresa.',
      );
    }

    return data.access_token;
  } catch (error) {
    throw new Error(error.message);
  }
}

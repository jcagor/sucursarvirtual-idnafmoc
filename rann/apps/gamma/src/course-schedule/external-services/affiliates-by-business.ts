export async function requestAffiliatesByBusiness(
  identification_type: string,
  identification_number: string,
) {
  try {
    const access_token = await requestIpasAuthToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AFFILIATES_BY_BUSINESS_AUTH_API!}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Codigo_Canal: '3',
          Tipo_Documento_Cliente: 'CO1N',
          Numero_Documento_Cliente: identification_number,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `API de afiliados por empresa respondio con status: ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data) {
      throw new Error(
        `API de afiliados por empresa genero una respuesta invalida: ${response}`,
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function requestIpasAuthToken(): Promise<string> {
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
        `API de afiliados por empresa respondio con ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data?.access_token) {
      throw new Error(
        'No se obtuvo el token de acceso de la API de afiliados por empresa.',
      );
    }

    return data.access_token;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

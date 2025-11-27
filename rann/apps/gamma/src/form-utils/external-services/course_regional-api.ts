export async function courseRegionApi(per_page: number) {
  try {
    const token = await apiAuthToken();

    const baseUrl = new URL(
      process.env.NEXT_PUBLIC_CREA_URL + '/general/regionales',
    );

    const query = new URLSearchParams({
      page: '1',
      per_page: per_page.toString(),
    });

    const url = `${baseUrl}?${query.toString()}`;

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `API Regionales de CREA respondio con status: ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data) {
      throw new Error(
        `API Regionales de CREA genero una respuesta invalida: ${response}.`,
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function apiAuthToken(): Promise<string> {
  try {
    const credenciales = {
      username: process.env.NEXT_PUBLIC_CREA_AUTH_USER,
      password: process.env.NEXT_PUBLIC_CREA_AUTH_PASS,
    };

    const response = await fetch(process.env.NEXT_PUBLIC_CREA_AUTH_API!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credenciales),
    });

    if (!response.ok) {
      throw new Error(
        `API de autenticacion en CREA respondio con ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data?.token) {
      throw new Error(
        'No se obtuvo el token de acceso de la API de autenticacion de CREA.',
      );
    }

    return data.token;
  } catch (error) {
    throw new Error(error.message);
  }
}

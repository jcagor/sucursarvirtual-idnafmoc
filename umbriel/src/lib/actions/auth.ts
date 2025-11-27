import { Session } from 'next-auth';

export const refreshAccessToken = async (session: Session): Promise<void> => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: session.refresh_token,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    session.access_token = data.access_token;
    session.refresh_token = data.refresh_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}; 
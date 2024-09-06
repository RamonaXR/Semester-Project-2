import { API_BASE_URL } from '../data/constants.js';

export async function loginUser(email, password) {
  const url = `${API_BASE_URL}/auth/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Check if login was successful
    if (!response.ok) {
      const errorMessage = `Login failed: ${response.statusText}`;
      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }

    const result = await response.json();
    return { success: true, accessToken: result.accessToken };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

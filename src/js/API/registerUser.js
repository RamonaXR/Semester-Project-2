// registerUser
import { API_BASE_URL } from '../data/constants.js';

export async function registerUser(name, email, password, bio = '', avatar = {}, banner = {}) {
  const url = `${API_BASE_URL}/auth/register`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        bio,
        avatar,
        banner,
      }),
    });

    if (!response.ok) {
      const errorMessage = `Registration failed: ${response.statusText}`;
      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

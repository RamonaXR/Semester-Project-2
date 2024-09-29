import { API_BASE_URL, API_KEY } from '../data/constants.js';

export async function registerUser(name, email, password, avatar = { url: '', alt: '' }) {
  const url = `${API_BASE_URL}/auth/register`;

  const payload = {
    name,
    email,
    password,
    avatar,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Noroff-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.message || 'Registration failed';
      if (response.status === 400) {
        // Email already registered
        return { success: false, message: 'This email is already registered. Please use a different email.' };
      }
      return { success: false, message: errorMessage };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'An unexpected error occurred during registration.' };
  }
}

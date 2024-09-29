import { API_BASE_URL, API_KEY } from '../data/constants.js';

/**
 * Registers a new user by sending their name, email, password, and optional avatar to the API.
 *
 * @async
 * @function registerUser
 * @param {string} name - The name (username) of the user to register.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user's account.
 * @param {Object} [avatar={ url: '', alt: '' }] - Optional avatar object containing a URL and alt text for the user's avatar.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success status of the registration operation.
 *
 * @property {boolean} success - Indicates whether the registration was successful.
 * @property {Object|string} [data] - The registered user's data if successful, or an error message if the operation failed.
 *
 * @throws Will log an error and return a failure message if the registration process fails due to an API error or network issue.
 */
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

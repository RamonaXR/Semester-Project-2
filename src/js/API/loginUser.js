import { API_AUTH, API_BASE_URL, API_LOGIN } from '../data/constants';
import { saveToStorage } from '../localStorage/saveToStorage';
import { fetchData } from './fetchData';
import { authUpdate } from '../auth/authUpdate';
import { getProfile } from './getProfile';
import { closeModal } from '../ui/modal/createModal';

/**
 * Logs in a user by sending their email and password to the API and storing the session data.
 *
 * @async
 * @function loginUser
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success status of the login operation.
 *
 * @property {boolean} success - Indicates whether the login was successful.
 * @property {string} [message] - A message describing the result of the login attempt, especially in case of failure.
 *
 * @throws Will log an error if the email or password is missing or if the login process fails due to an API error.
 */
export async function loginUser(email, password) {
  if (!email || !password) {
    console.error('Missing email and password');
    return;
  }

  try {
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    };

    const response = await fetchData(`${API_BASE_URL}${API_AUTH}${API_LOGIN}`, options);

    if (response && response.data) {
      const { accessToken, ...profile } = response.data;

      saveToStorage('accessToken', accessToken);
      saveToStorage('userSession', profile);

      await getProfile();

      setTimeout(() => {
        authUpdate();
        closeModal();
        window.location.reload();
      }, 300);
      return { success: true };
    } else if (response.status === 401) {
      // Handle 401 Already registered
      return { success: false, message: 'Incorrect email or password. Please try again.' };
    } else {
      return { success: false, message: 'Login failed due to server error.' };
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

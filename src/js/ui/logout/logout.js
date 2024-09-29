import { authUpdate } from '../../auth/authUpdate';

/**
 * Logs out the user by clearing local storage, updating the authentication state, and redirecting to the homepage.
 *
 * @function logout
 * @description This function clears all user session data from local storage, updates the UI to reflect the logout state by calling `authUpdate`, and redirects the user to the homepage.
 */
export function logout() {
  localStorage.clear();
  authUpdate();
  window.location.href = '/';
}

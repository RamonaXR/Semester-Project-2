import { loadFromStorage } from './loadFromStorage';

/**
 * Checks if a user is currently logged in by verifying the presence of a user session in local storage.
 *
 * @function isUserLoggedIn
 * @returns {boolean} Returns `true` if a user session is found in local storage, otherwise returns `false`.
 */
export function isUserLoggedIn() {
  const userSession = loadFromStorage('userSession');
  return userSession !== null;
}

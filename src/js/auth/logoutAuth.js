import { logout } from '../ui/logout/logout';

/**
 * Attaches a click event listener to the logout button to trigger the logout process.
 *
 * @function logoutAuth
 * @description This function adds an event listener to the logout button. When clicked, it calls the `logout` function to log the user out.
 */
export function logoutAuth() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      logout();
    });
  }
}

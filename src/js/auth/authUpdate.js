import { loadFromStorage } from '../localStorage/loadFromStorage.js';
import { isUserLoggedIn } from '../localStorage/isUserLoggedIn.js';

/**
 * Updates the authentication state on the UI by toggling visibility and content of login, register, profile, and logout buttons.
 *
 * @function authUpdate
 * @description This function checks if the user is logged in and updates the UI accordingly. If logged in, it hides the login and register buttons, shows the profile button with the user's avatar, name, and credits, and makes the logout button visible. If not logged in, it reverses these changes.
 *
 * @throws Will log an error if the user session is not found or the UI elements cannot be updated.
 */
export function authUpdate() {
  const userSession = loadFromStorage('userSession');

  if (isUserLoggedIn()) {
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    if (loginButton) loginButton.classList.add('hidden');
    if (registerButton) registerButton.classList.add('hidden');

    const profileButton = document.getElementById('profileButton');
    if (profileButton) {
      profileButton.innerHTML = `
        <div class="flex items-center">
          <img id="headerAvatar" src="${userSession.avatar.url}" alt="${userSession.name}'s avatar" class="h-8 w-8 rounded-full object-cover mr-2">
          <span>${userSession.name} (${userSession.credits} credits)</span>
        </div>
      `;
      profileButton.classList.remove('hidden');
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.classList.remove('hidden');
      logoutButton.classList.add('bg-black', 'text-white', 'rounded', 'px-4', 'py-2');
    }
  } else {
    console.error('User session not found.');

    // Show login and register buttons when user is not logged in
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    if (loginButton) loginButton.classList.remove('hidden');
    if (registerButton) registerButton.classList.remove('hidden');

    const profileButton = document.getElementById('profileButton');
    if (profileButton) {
      profileButton.innerHTML = '';
      profileButton.classList.add('hidden');
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.classList.add('hidden');
      logoutButton.classList.remove('bg-black', 'text-white', 'rounded', 'px-4', 'py-2');
    }
  }
}

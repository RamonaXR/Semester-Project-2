import { loadFromStorage } from '../localStorage/loadFromStorage.js';
import { isUserLoggedIn } from '../localStorage/isUserLoggedIn.js';

export function authUpdate() {
  const userSession = loadFromStorage('userSession');

  if (isUserLoggedIn()) {
    // Hide login and register buttons when user is logged in
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');

    if (loginButton) loginButton.classList.add('hidden');
    if (registerButton) registerButton.classList.add('hidden');

    // Update profile button with avatar, username, and credits
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

    // Show and style the logout button
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

    // Hide profile button
    const profileButton = document.getElementById('profileButton');
    if (profileButton) {
      profileButton.innerHTML = '';
      profileButton.classList.add('hidden');
    }

    // Hide the logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.classList.add('hidden');
      logoutButton.classList.remove('bg-black', 'text-white', 'rounded', 'px-4', 'py-2');
    }
  }
}

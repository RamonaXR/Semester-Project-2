import { loadFromStorage } from '../localStorage/loadFromStorage.js';

export function authUpdate() {
  const userSession = loadFromStorage('userSession');
  console.log('Loaded user session in authUpdate:', userSession);

  if (userSession) {
    document.getElementById('loginButton').classList.add('hidden');
    document.getElementById('registerButton').classList.add('hidden');

    const profileButton = document.getElementById('profileButton');
    profileButton.innerHTML = `
      <div class="flex items-center">
        <img src="${userSession.avatar.url}" alt="${userSession.name}'s avatar" class="h-8 w-8 rounded-full object-cover mr-2">
        <span>${userSession.name} (${userSession.credits} credits)</span>
      </div>
    `;
    profileButton.classList.remove('hidden');

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.classList.remove('hidden');
      logoutButton.classList.add('bg-black', 'text-white', 'rounded', 'px-4', 'py-2');
    }
  } else {
    console.error('User session not found.');

    document.getElementById('loginButton').classList.remove('hidden');
    document.getElementById('registerButton').classList.remove('hidden');

    const profileButton = document.getElementById('profileButton');
    profileButton.innerHTML = '';
    profileButton.classList.add('hidden');

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.classList.add('hidden');
      logoutButton.classList.remove('bg-black', 'text-white', 'rounded', 'px-4', 'py-2');
    }
  }
}

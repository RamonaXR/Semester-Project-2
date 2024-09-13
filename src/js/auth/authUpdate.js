import { loadFromStorage } from '../localStorage/loadFromStorage';

export function authUpdate() {
  const userSession = loadFromStorage('profile');

  if (userSession) {
    document.getElementById('loginButton').innerHTML = `<img src="${userSession.avatar.url}" alt="${userSession.username}'s avatar" class="h-8 w-8 rounded-full">`;
    document.getElementById('profileButton').innerHTML = `${userSession.username} (${userSession.credits} credits)`;
  } else {
    document.getElementById('loginButton').innerHTML = 'Log in';
  }
}

import { loadFromStorage } from './loadFromStorage';

export function isUserLoggedIn() {
  const userSession = loadFromStorage('userSession');
  return userSession !== null;
}

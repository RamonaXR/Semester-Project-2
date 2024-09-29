import { logout } from '../ui/logout/logout';

export function logoutAuth() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      logout();
    });
  }
}

import { logout } from '../ui/logout/logout';
import { closeModal } from '../ui/modal/createModal';

export function logoutAuth() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      logout();
      closeModal();
    });
  }
}

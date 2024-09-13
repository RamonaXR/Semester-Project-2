import { authUpdate } from '../auth/authUpdate';
import { loadFromStorage } from '../localStorage/loadFromStorage';
import { loginModal } from '../ui/modal/loginModal';
import { profileModal } from '../ui/modal/profileModal';
import { registerModal } from '../ui/modal/registerModal';

export async function initialize() {
  const profile = loadFromStorage('userSession');
  if (profile) authUpdate();

  const profileBtn = document.querySelector('#profileButton');
  const loginButton = document.getElementById('loginButton');
  const registerButton = document.getElementById('registerButton');
  if (profileBtn) await profileModal();
  if (loginButton) loginModal();
  if (registerButton) registerModal();
}

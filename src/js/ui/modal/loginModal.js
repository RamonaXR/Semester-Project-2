import { getLoginData } from '../login/getLoginData.js';
import { createModal } from './createModal.js';
import { login } from './modalContent.js';

export function loginModal() {
  const loginButton = document.getElementById('loginButton');
  const content = login();

  if (loginButton) {
    loginButton.addEventListener('click', () => {
      createModal(content);
      getLoginData();
    });
  }
}

import { getLoginData } from '../login/getLoginData.js';
import { createModal } from './createModal.js';
import { login } from './modalContent.js';

/**
 * Initializes the login modal by attaching a click event listener to the login button.
 *
 * @function loginModal
 * @description This function attaches a click event to the login button that, when triggered, creates a modal with login content and activates the login data handling functionality.
 *
 * @throws Will not initialize the modal if the login button is not found.
 */
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

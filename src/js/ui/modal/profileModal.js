import { loadFromStorage } from '../../localStorage/loadFromStorage.js';
import { createModal } from './createModal.js';
import { profile, login } from './modalContent.js';

export async function profileModal() {
  const profileButton = document.getElementById('profileButton');
  const session = await loadFromStorage('userSession');

  if (profileButton) {
    profileButton.addEventListener('click', async () => {
      const session = loadFromStorage('userSession');

      if (!session) {
        const loginContent = login();
        console.warn('No user session found.');
        setTimeout(() => {
          createModal(loginContent);
        }, 500);
        return;
      }
      const content = await profile();
      setTimeout(() => {
        createModal(content);
      }, 1000);
    });
  }
}

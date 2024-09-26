import { createModal, closeModal } from './createModal.js';
import { profile, login } from './modalContent.js';
import { updateAvatar } from '../../API/updateAvatar.js';
import { errorMessage } from '../messages/errorMessage.js';
import { successMessage } from '../messages/successMessage.js';
import { setupAvatarChange } from '../../utils/avatar/setupAvatarChange.js';
import { isUserLoggedIn } from '../../localStorage/isUserLoggedIn.js';

export async function profileModal() {
  const profileButton = document.getElementById('profileButton');
  //const session = await loadFromStorage('userSession');

  if (profileButton) {
    profileButton.addEventListener('click', async () => {
      if (!isUserLoggedIn()) {
        // Check if user is logged in
        const loginContent = login();
        createModal(loginContent); // Redirect to login modal if not logged in
        return;
      }

      // Before creating a new modal, close any existing one
      closeModal();

      const content = await profile();
      createModal(content);

      const avatarUrlInput = document.getElementById('avatarUrl');
      //const avatarPreview = document.getElementById('avatarPreview');
      const avatarForm = document.getElementById('updateAvatar');

      // Avatar change functionality for profile modal
      setupAvatarChange('avatarUrl', 'avatarPreview', 'changeAvatarButton');

      if (avatarForm) {
        avatarForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          const newAvatarUrl = avatarUrlInput.value.trim();
          if (newAvatarUrl) {
            const result = await updateAvatar(newAvatarUrl);
            if (result.success) {
              successMessage(document.getElementById('messageContainer'), 'Avatar updated successfully!');

              // Update avatar in header
              const headerAvatar = document.getElementById('headerAvatar');
              if (headerAvatar) {
                headerAvatar.src = newAvatarUrl;
              }
              avatarForm.reset();
              // closeModal(); // Close the modal after updating avatar
            } else {
              errorMessage(document.getElementById('messageContainer'), 'Failed to update avatar.');
            }
          }
        });
      }
    });
  }
}

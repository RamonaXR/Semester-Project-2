import { loadFromStorage } from '../../localStorage/loadFromStorage.js';
import { createModal, closeModal } from './createModal.js';
import { profile, login } from './modalContent.js';
import { updateAvatar } from '../../API/updateAvatar.js';
import { errorMessage } from '../messages/errorMessage.js';
import { successMessage } from '../messages/successMessage.js';
import { setupAvatarChange } from '../../utils/avatar/setupAvatarChange.js';

export async function profileModal() {
  const profileButton = document.getElementById('profileButton');
  const session = await loadFromStorage('userSession');

  if (profileButton) {
    profileButton.addEventListener('click', async () => {
      const session = loadFromStorage('userSession');

      if (!session) {
        const loginContent = login();
        createModal(loginContent);
        return;
      }

      // Before creating a new modal, close any existing one
      closeModal();

      const content = await profile();
      createModal(content);

      const avatarUrlInput = document.getElementById('avatarUrl');
      const avatarPreview = document.getElementById('avatarPreview');

      // Avatar change functionality for profile modal
      setupAvatarChange('avatarUrl', 'avatarPreview', 'changeAvatarButton');

      const changeAvatarButton = document.getElementById('changeAvatarButton');
      if (changeAvatarButton) {
        changeAvatarButton.addEventListener('click', async () => {
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

              closeModal(); // Close the modal after updating avatar
              await profileModal(); // Refresh the profile modal to reflect the updated avatar
            } else {
              errorMessage(document.getElementById('messageContainer'), 'Failed to update avatar.');
            }
          }
        });
      }
    });
  }
}

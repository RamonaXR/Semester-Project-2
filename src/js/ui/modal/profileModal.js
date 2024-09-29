import { createModal, closeModal } from './createModal.js';
import { profile, login } from './modalContent.js';
import { updateAvatar } from '../../API/updateAvatar.js';
import { errorMessage } from '../messages/errorMessage.js';
import { successMessage } from '../messages/successMessage.js';
import { setupAvatarChange } from '../../utils/avatar/setupAvatarChange.js';
import { isUserLoggedIn } from '../../localStorage/isUserLoggedIn.js';
import { getLoginData } from '../login/getLoginData.js';

/**
 * Initializes the profile modal, handling both logged-in and not-logged-in states.
 *
 * @async
 * @function profileModal
 * @description This function attaches an event listener to the profile button. If the user is not logged in, it opens the login modal. If the user is logged in, it opens the profile modal, allowing the user to update their avatar. The avatar change functionality is handled through a form submission, and feedback is provided for both success and failure.
 *
 * @throws Will display an error message if the avatar update fails or if there is an issue opening the modals.
 */
export async function profileModal() {
  const profileButton = document.getElementById('profileButton');

  if (profileButton) {
    profileButton.addEventListener('click', async () => {
      if (!isUserLoggedIn()) {
        // Check if user is logged in
        const loginContent = login();
        createModal(loginContent); // Redirect to login modal if not logged in
        getLoginData();
        return;
      }

      // Before creating a new modal, close any existing one
      closeModal();

      const content = await profile();
      createModal(content);

      const avatarUrlInput = document.getElementById('avatarUrl');
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
            } else {
              errorMessage(document.getElementById('messageContainer'), 'Failed to update avatar.');
            }
          }
        });
      }
    });
  }
}

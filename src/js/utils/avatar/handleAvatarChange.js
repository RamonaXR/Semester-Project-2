import { updateAvatar } from '../../API/updateAvatar';
import { loadFromStorage } from '../../localStorage/loadFromStorage';
import { saveToStorage } from '../../localStorage/saveToStorage';
import { authUpdate } from '../../auth/authUpdate';
import { successMessage } from '../../ui/messages/successMessage';
import { errorMessage } from '../../ui/messages/errorMessage';

/**
 * Handles updating the user's avatar by sending the new avatar URL to the API and updating the UI.
 *
 * @async
 * @function handleAvatarChange
 * @param {HTMLInputElement} avatarUrlInput - The input field containing the new avatar URL.
 * @param {HTMLImageElement} avatarPreview - The image element that shows the avatar preview.
 * @description This function updates the user's avatar by submitting the new URL to the API. Upon success, it updates the avatar in the profile preview, header, and session storage. If the update fails, an error message is displayed.
 *
 * @throws Will display an error message if the avatar update fails.
 */
export async function handleAvatarChange(avatarUrlInput, avatarPreview) {
  const newAvatarUrl = avatarUrlInput.value.trim();
  if (newAvatarUrl) {
    const result = await updateAvatar(newAvatarUrl);

    if (result.success) {
      successMessage(document.getElementById('messageContainer'), 'Avatar updated successfully!');

      // Update avatar preview
      avatarPreview.src = newAvatarUrl;
      avatarUrlInput.placeholder = newAvatarUrl;
      avatarUrlInput.value = ''; // Clear input field after updating

      // Update user session with the new avatar URL
      const userSession = loadFromStorage('userSession');
      userSession.avatar.url = newAvatarUrl;
      saveToStorage('userSession', userSession);

      // Update the header with the new avatar
      authUpdate();
    } else {
      errorMessage(document.getElementById('messageContainer'), 'Failed to update avatar.');
    }
  }
}

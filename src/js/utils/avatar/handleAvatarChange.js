import { updateAvatar } from '../../API/updateAvatar';
import { loadFromStorage } from '../../localStorage/loadFromStorage';
import { saveToStorage } from '../../localStorage/saveToStorage';
import { authUpdate } from '../../auth/authUpdate';
import { successMessage } from '../../ui/messages/successMessage';
import { errorMessage } from '../../ui/messages/errorMessage';

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

import { handleAvatarChange } from './handleAvatarChange.js';

/**
 * Sets up the avatar change functionality, allowing the user to update their avatar via input or button click.
 *
 * @function setupAvatarChange
 * @param {string} avatarUrlId - The ID of the input element for the avatar URL.
 * @param {string} avatarPreviewId - The ID of the image element for the avatar preview.
 * @param {string} changeAvatarButtonId - The ID of the button that triggers the avatar update.
 * @description This function adds event listeners to the avatar URL input and the change avatar button. It updates the avatar preview in real-time as the URL changes and triggers the avatar update when the Enter key is pressed or the change button is clicked.
 */
export function setupAvatarChange(avatarUrlId, avatarPreviewId, changeAvatarButtonId) {
  const avatarUrlInput = document.getElementById(avatarUrlId);
  const avatarPreview = document.getElementById(avatarPreviewId);
  const changeAvatarButton = document.getElementById(changeAvatarButtonId);

  // Preview avatar when URL changes
  avatarUrlInput.addEventListener('input', () => {
    const newAvatarUrl = avatarUrlInput.value.trim();
    if (newAvatarUrl) {
      avatarPreview.src = newAvatarUrl;
    }
  });

  // Trigger avatar update on Enter key press
  avatarUrlInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
      await handleAvatarChange(avatarUrlInput, avatarPreview);
    }
  });

  // Trigger avatar update on button click
  if (changeAvatarButton) {
    changeAvatarButton.addEventListener('click', async () => {
      await handleAvatarChange(avatarUrlInput, avatarPreview);
    });
  }
}

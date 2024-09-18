import { handleAvatarChange } from './handleAvatarChange.js';

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
      await handleAvatarChange(avatarUrlInput, avatarPreview); // Avatar update when pressing Enter
    }
  });

  // Trigger avatar update on button click
  if (changeAvatarButton) {
    changeAvatarButton.addEventListener('click', async () => {
      await handleAvatarChange(avatarUrlInput, avatarPreview); // Avatar update on button click
    });
  }
}

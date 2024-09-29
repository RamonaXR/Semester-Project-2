import { API_BASE_URL, API_PROFILES, API_KEY } from '../data/constants.js';
import { loadFromStorage } from '../localStorage/loadFromStorage.js';
import { saveToStorage } from '../localStorage/saveToStorage.js';
import { fetchData } from './fetchData.js';

/**
 * Updates the user's avatar by sending a PUT request to the API and updates the local storage with the new avatar.
 *
 * @async
 * @function updateAvatar
 * @param {string} newAvatarUrl - The URL of the new avatar to update.
 * @returns {Promise<Object>} A promise that resolves to an object indicating the success status of the avatar update.
 *
 * @property {boolean} success - Indicates whether the avatar update was successful.
 * @property {string} [message] - An error message if the avatar update fails.
 *
 * @throws Will log an error and return a failure message if the avatar update fails due to an API error or network issue.
 */
export async function updateAvatar(newAvatarUrl) {
  const profile = loadFromStorage('userSession');
  const token = loadFromStorage('accessToken');
  if (!token) {
    return { success: false, message: 'User not logged in.' };
  }

  if (!profile || !token) {
    console.error('User session or token missing.');
    return { success: false, message: 'User not logged in.' };
  }

  const profileUrl = `${API_BASE_URL}${API_PROFILES}/${profile.name}`;

  const payload = {
    avatar: { url: newAvatarUrl, alt: `${profile.name}'s avatar` },
  };

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetchData(profileUrl, options);

    if (response && response.data && response.data.avatar.url === newAvatarUrl) {
      // If the response contains the updated avatar, consider the update successful
      const updatedProfile = { ...profile, avatar: { url: newAvatarUrl, alt: `${profile.name}'s avatar` } };
      saveToStorage('userSession', updatedProfile);

      return { success: true };
    } else {
      console.error('Avatar update did not complete as expected.');
      return { success: false, message: 'Failed to update avatar.' };
    }
  } catch (error) {
    console.error('Error in updateAvatar:', error.message);
    return { success: false, message: 'Failed to update avatar.' };
  }
}

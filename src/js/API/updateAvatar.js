import { API_BASE_URL, API_PROFILES, API_KEY } from '../data/constants.js';
import { loadFromStorage } from '../localStorage/loadFromStorage.js';
import { saveToStorage } from '../localStorage/saveToStorage.js';
import { fetchData } from './fetchData.js';

export async function updateAvatar(newAvatarUrl) {
  const profile = loadFromStorage('userSession');
  const token = loadFromStorage('accessToken');

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
    console.log(`Sending PUT request to: ${profileUrl}`);
    console.log('Payload:', payload);

    const response = await fetchData(profileUrl, options);

    console.log('Full API response:', response);

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

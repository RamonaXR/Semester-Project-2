import { fetchData } from './fetchData.js';
import { API_BASE_URL, API_PROFILES, API_KEY } from '../data/constants.js';
import { loadFromStorage } from '../localStorage/loadFromStorage.js';
import { saveToStorage } from '../localStorage/saveToStorage.js';

/**
 * Fetches the logged-in user's profile data from the API and updates the user session in local storage.
 *
 * @async
 * @function getProfile
 * @returns {Promise<void>} Does not return any value, but updates the 'userSession' in local storage with the profile data (name, avatar, credits, and bid count).
 *
 * @throws Will log an error if the fetch request fails or if the user session or access token is missing.
 */
export async function getProfile() {
  const profile = loadFromStorage('userSession');
  const token = loadFromStorage('accessToken');
  if (!profile || !token) {
    return;
  }

  const profileUrl = `${API_BASE_URL}${API_PROFILES}/${profile.name}`;

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  const response = await fetchData(profileUrl, options);

  if (!response) {
    console.error('Something went wrong when fetching profile');
  }

  const data = response.data;

  const { name, avatar, credits, _count } = data;
  saveToStorage('userSession', { name, avatar, credits, _count });
}

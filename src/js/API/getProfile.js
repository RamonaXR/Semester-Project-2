import { fetchData } from './fetchData.js';
import { API_BASE_URL, API_PROFILES, API_KEY } from '../data/constants.js';
import { loadFromStorage } from '../localStorage/loadFromStorage.js';
import { saveToStorage } from '../localStorage/saveToStorage.js';
//import { saveToStorage } from '../localStorage/saveToStorage.js';

export async function getProfile() {
  const profile = loadFromStorage('userSession');
  const token = loadFromStorage('accessToken');
  console.log('in storage:', profile, token);
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
  console.log('Updated profile', response);

  if (!response) {
    console.error('Something went wrong when fetching profile');
  }

  const data = response.data;
  console.log('new', data);

  const { name, avatar, credits, _count } = data;
  saveToStorage('userSession', { name, avatar, credits, _count });
}

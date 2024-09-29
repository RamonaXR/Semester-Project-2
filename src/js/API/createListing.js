import { fetchData } from './fetchData';
import { API_BASE_URL, API_LISTINGS, API_KEY } from '../data/constants';
import { loadFromStorage } from '../localStorage/loadFromStorage';

export async function createListing(listingData) {
  const token = loadFromStorage('accessToken');
  if (!token) {
    return { success: false, message: 'User is not logged in.' };
  }

  const url = `${API_BASE_URL}${API_LISTINGS}`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
    },
    body: JSON.stringify(listingData),
  };

  return await fetchData(url, options);
}

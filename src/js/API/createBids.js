import { API_BASE_URL, API_LISTINGS, API_KEY } from '../data/constants';
import { fetchData } from './fetchData';
import { loadFromStorage } from '../localStorage/loadFromStorage';

export async function createBids(listingId, postData) {
  const token = loadFromStorage('accessToken');

  if (!token) {
    console.error('Access token is missing.');
    return { success: false, message: 'User not logged in.' };
  }

  const url = `${API_BASE_URL}${API_LISTINGS}/${listingId}/bids`;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetchData(url, options);

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      console.error('API Error:', response.message || 'Failed to place the bid.');
      return { success: false, message: response.message || 'Failed to place the bid.' };
    }
  } catch (error) {
    console.error('Error creating bid:', error);
    return { success: false, message: 'Failed to place the bid due to an error.' };
  }
}

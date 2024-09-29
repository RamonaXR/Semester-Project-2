import { API_BASE_URL, API_LISTINGS, API_KEY } from '../data/constants';
import { fetchData } from './fetchData';
import { loadFromStorage } from '../localStorage/loadFromStorage';

/**
 * Creates a bid for a specific listing by sending a POST request to the API.
 *
 * @async
 * @function createBids
 * @param {string} listingId - The ID of the listing to place a bid on.
 * @param {Object} postData - The bid data to be posted (e.g., bid amount).
 * @returns {Promise<Object>} A promise that resolves to an object containing the success status and either the bid data or an error message.
 *
 * @property {boolean} success - Indicates whether the bid was successfully created.
 * @property {Object|string} data - The bid data if successful, or an error message if the operation failed.
 *
 * @throws Will return an error message if the user is not logged in or if the API call fails.
 */
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

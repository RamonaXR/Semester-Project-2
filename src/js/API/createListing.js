import { fetchData } from './fetchData';
import { API_BASE_URL, API_LISTINGS, API_KEY } from '../data/constants';
import { loadFromStorage } from '../localStorage/loadFromStorage';

/**
 * Creates a new listing by sending a POST request to the API.
 *
 * @async
 * @function createListing
 * @param {Object} listingData - The data for the new listing (e.g., title, description, media, deadline).
 * @returns {Promise<Object>} A promise that resolves to an object containing the response from the API.
 *
 * @property {boolean} success - Indicates whether the listing was successfully created.
 * @property {Object|string} data - The created listing data if successful, or an error message if the operation failed.
 *
 * @throws Will return an error message if the user is not logged in or if the API call fails.
 */
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

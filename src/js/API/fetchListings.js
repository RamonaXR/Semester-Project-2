import { fetchData } from './fetchData';
import { API_BASE_URL, API_LISTINGS } from '../data/constants';

/**
 * Fetches listings from the API with optional pagination and limit parameters.
 *
 * @async
 * @function fetchListings
 * @param {number} [limit=24] - The maximum number of listings to fetch in one request.
 * @param {number} [page=1] - The page number for pagination (starts from 1).
 * @returns {Promise<Array>} A promise that resolves to an array of listings or an empty array if the fetch fails.
 *
 * @throws Will return an empty array if an error occurs during the fetch process.
 */
export async function fetchListings(limit = 24, page = 1) {
  if (page === 0) page = 1;
  const url = `${API_BASE_URL}${API_LISTINGS}?_seller=true&_bids=true&limit=${limit}&page=${page}`;

  try {
    const response = await fetchData(url);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

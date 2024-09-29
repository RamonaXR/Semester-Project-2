import { errorAPI } from '../errorhandling/errorAPI.js';
import { errorMessage } from '../ui/messages/errorMessage.js';

/**
 * Fetches data from a specified URL with the provided options and handles API errors.
 *
 * @async
 * @function fetchData
 * @param {string} url - The URL to fetch data from.
 * @param {Object} [options={}] - Optional configurations for the fetch request (e.g., method, headers, body).
 * @returns {Promise<Object>} A promise that resolves to the fetched data or an error object if the fetch fails.
 *
 * @property {boolean} success - Indicates whether the fetch was successful.
 * @property {Object|string} data - The fetched data if successful, or an error message if the operation failed.
 * @property {number} [status] - The HTTP status code of the response if there is an API error.
 *
 * @throws Will return an error message if the fetch fails, the URL is invalid, or an API error occurs.
 */
export async function fetchData(url, options = {}) {
  if (!url || typeof url !== 'string' || !url.trim()) {
    console.error('Invalid URL provided');
    return { success: false, message: 'Invalid URL' };
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const errorCheck = errorAPI(response);

    if (!errorCheck.success) {
      console.error('API Error:', errorCheck.message);
      return { success: false, message: errorCheck.message, status: response.status };
    }

    return result;
  } catch (error) {
    errorMessage('msgContainerParent', error.message);
    console.error('Fetch failed:', error.message);
    return { success: false, message: 'Fetch error occurred.' };
  }
}

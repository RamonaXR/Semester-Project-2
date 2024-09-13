import { errorAPI } from '../errorhandling/errorAPI.js';

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
    console.error('Fetch failed:', error.message);
    return { success: false, message: 'Fetch error occurred.' };
  }
}

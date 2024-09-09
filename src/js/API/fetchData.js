import { API_BASE_URL, getHeaders } from '../data/constants.js';

export async function fetchData(endpoint, accessToken, method = 'GET', body = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: getHeaders(accessToken),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    console.log('Response:', response);

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = response.statusText || 'Unknown error occurred';
      return { success: false, status: response.status, message: errorMessage };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

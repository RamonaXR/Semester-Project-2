import { fetchData } from './fetchData';
import { API_BASE_URL, API_LISTINGS } from '../data/constants';

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

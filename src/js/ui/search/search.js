import { fetchData } from '../../API/fetchData';
import { fetchListings } from '../../API/fetchListings';
import { API_BASE_URL, API_LISTINGS } from '../../data/constants';
import { saveToStorage } from '../../localStorage/saveToStorage';
import { renderListings } from '../../rendering/renderListings';

export async function search() {
  const form = document.getElementById('searchForm');
  const search = document.getElementById('searchInput');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = search.value.trim();
    try {
      if (!query) {
        saveToStorage('scroll', false);
        const listings = await fetchListings();
        renderListings(listings);
        sessionStorage.setItem('page', 1);

        return;
      }

      const response = await fetchData(`${API_BASE_URL}${API_LISTINGS}/search?q=${query}&_seller=true&_bids=true`);

      const listings = response.data; // ADD if 0, no results, tell the user - return

      if (listings.length === 0) {
        search.value = 'Search returned no results';
        search.classList.add('text-red-600');
        search.addEventListener('click', () => {
          search.value = '';
          search.classList.remove('text-red-600');
        });
      }

      renderListings(listings);
      saveToStorage('scroll', true);
    } catch (error) {
      console.error(error);
    }
  });
}

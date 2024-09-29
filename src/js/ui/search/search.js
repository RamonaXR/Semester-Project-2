import { fetchData } from '../../API/fetchData';
import { fetchListings } from '../../API/fetchListings';
import { API_BASE_URL, API_LISTINGS } from '../../data/constants';
import { saveToStorage } from '../../localStorage/saveToStorage';
import { renderListings } from '../../rendering/renderListings';

/**
 * Handles search functionality for listings, fetching and rendering results based on the user's query.
 *
 * @async
 * @function search
 * @description This function attaches a submit event listener to the search form. When the form is submitted, it fetches listings based on the search query. If no query is provided, it fetches the default listings. If the search returns no results, an error message is displayed in the search input. The search results are rendered in the UI, and scrolling behavior is adjusted accordingly.
 *
 * @throws Will log an error if the search fails due to network or API issues.
 */
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

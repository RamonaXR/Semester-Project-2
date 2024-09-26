import { fetchData } from '../../API/fetchData';
import { fetchListings } from '../../API/fetchListings';
import { API_BASE_URL, API_LISTINGS } from '../../data/constants';
import { saveToStorage } from '../../localStorage/saveToStorage';
import { createListingCard } from '../../rendering/createListingCard';
import { renderListings } from '../../rendering/renderListings';

export async function search() {
  const form = document.getElementById('searchForm');
  const search = document.getElementById('searchInput');
  const parent = document.getElementById('itemsGrid');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = search.value.trim();
    try {
      if (!query) {
        saveToStorage('scroll', false);
        const listings = await fetchListings();
        console.log(listings);
        renderListings(listings);
        return;
      }

      const response = await fetchData(`${API_BASE_URL}${API_LISTINGS}/search?q=${query}`);

      const listings = response.data; // ADD if 0, no results, tell the user - return

      parent.innerHTML = '';
      listings.forEach((listing) => {
        const card = createListingCard(listing);
        parent.append(card);
        saveToStorage('scroll', true);
      });
    } catch (error) {
      console.error(error);
    }
  });
}

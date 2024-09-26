import { fetchListings } from '../API/fetchListings';
import { loadFromStorage } from '../localStorage/loadFromStorage';
import { appendListings } from '../rendering/appendListings';
import { renderListings } from '../rendering/renderListings';

let page = 1;
let isFetching = false;
let lastPageReached = false;
let lastScrollTop = 0; // Track the last scroll position

// Fetch and load more listings
export async function loadMoreListings() {
  if (isFetching || lastPageReached || loadFromStorage('scroll')) return;

  isFetching = true;

  console.log('Fetching page:', page);
  const newListings = await fetchListings(24, page);

  if (newListings.length > 0) {
    if (page === 1) {
      renderListings(newListings); // Initial render for the first page
    } else {
      appendListings(newListings);
    }
    page++;
  } else {
    lastPageReached = true; // No more listings to fetch, stop further requests
    console.log('No more listings to fetch.');
  }

  isFetching = false;
}

// Add scroll event listener that fetches only when the user hits the bottom
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  // Check if the user is exactly at the bottom of the page
  if (scrollTop + windowHeight >= fullHeight) {
    loadMoreListings();
  }
});

// Initial load of listings
loadMoreListings();

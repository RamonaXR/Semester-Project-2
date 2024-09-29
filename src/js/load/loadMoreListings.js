import { fetchListings } from '../API/fetchListings';
import { loadFromStorage } from '../localStorage/loadFromStorage';
import { appendListings } from '../rendering/appendListings';

/**
 * Handles loading additional listings when the user scrolls to the bottom of the page.
 *
 * @async
 * @function loadMoreListings
 * @description This function fetches more listings from the API based on the current page stored in session storage.
 *              It appends the fetched listings to the existing content and stops fetching when no more listings are available.
 *
 * @property {boolean} isFetching - A flag indicating whether a fetch operation is currently in progress.
 * @property {boolean} lastPageReached - A flag indicating whether the last page of listings has been reached, preventing further requests.
 *
 * @throws Will stop further requests if listings have been fully loaded or if fetching is already in progress.
 */
let isFetching = false;
let lastPageReached = false;

// Fetch and load more listings
export async function loadMoreListings() {
  if (isFetching || lastPageReached || loadFromStorage('scroll')) return;

  isFetching = true;

  let page = +sessionStorage.getItem('page');

  const newListings = await fetchListings(24, page);

  if (newListings.length > 0) {
    appendListings(newListings);
  } else {
    lastPageReached = true; // No more listings to fetch, stop further requests
  }

  isFetching = false;
}

// Add scroll event listener that fetches only when the user hits the bottom
window.addEventListener('scroll', () => {
  const scrollTop = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);
  const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  const windowHeight = window.innerHeight;

  if (scrollTop + windowHeight >= documentHeight - 1) {
    const page = sessionStorage.getItem('page');
    const newPage = +page + 1;
    sessionStorage.setItem('page', newPage);
    loadMoreListings();
  }
});

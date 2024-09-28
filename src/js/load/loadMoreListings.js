import { fetchListings } from '../API/fetchListings';
import { loadFromStorage } from '../localStorage/loadFromStorage';
import { saveToStorage } from '../localStorage/saveToStorage';
import { appendListings } from '../rendering/appendListings';
//import { renderListings } from '../rendering/renderListings';

let isFetching = false;
let lastPageReached = false;
//let lastScrollTop = 0; // Track the last scroll position

// Fetch and load more listings
export async function loadMoreListings() {
  if (isFetching || lastPageReached || loadFromStorage('scroll')) return;

  isFetching = true;

  let page = +loadFromStorage('page');

  console.log('Fetching page:', page);
  const newListings = await fetchListings(24, page);

  if (newListings.length > 0) {
    appendListings(newListings);
    /*if (page === 2) {
      renderListings(newListings); // Initial render for the first page
    } else {
      appendListings(newListings);
    }*/
  } else {
    lastPageReached = true; // No more listings to fetch, stop further requests
    console.log('No more listings to fetch.');
  }

  isFetching = false;
}

// Add scroll event listener that fetches only when the user hits the bottom
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = document.documentElement.clientHeight;
  const fullHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight) {
    const page = loadFromStorage('page');
    const newPage = +page + 1;
    saveToStorage('page', newPage);
    loadMoreListings();
  }
});

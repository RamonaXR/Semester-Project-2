import { authUpdate } from '../auth/authUpdate';
import { loadFromStorage } from '../localStorage/loadFromStorage';
import { loginModal } from '../ui/modal/loginModal';
import { profileModal } from '../ui/modal/profileModal';
import { registerModal } from '../ui/modal/registerModal';
import { fetchListings } from '../API/fetchListings';
import { renderListings } from '../rendering/renderListings';
import { removeLoader } from '../ui/loader/removeLoader';
import { loadMoreListings } from '../load/loadMoreListings';
import { saveToStorage } from '../localStorage/saveToStorage';
import { isUserLoggedIn } from '../localStorage/isUserLoggedIn';
import { addListingModal } from '../ui/modal/addListingModal';

export async function initialize() {
  saveToStorage('scroll', false);
  setTimeout(() => sessionStorage.setItem('page', 1), 500);

  const profile = loadFromStorage('userSession');
  if (profile) authUpdate();

  const profileBtn = document.querySelector('#profileButton');
  const loginButton = document.getElementById('loginButton');
  const registerButton = document.getElementById('registerButton');
  const addListingButton = document.getElementById('addListingButton');
  const addListingFooterButton = document.getElementById('addListingFooterButton');

  // Show or hide the Add Listing buttons based on login status
  if (isUserLoggedIn()) {
    addListingButton.classList.remove('hidden');
    addListingFooterButton.classList.remove('hidden');

    // Add event listeners for showing the modal
    if (addListingButton) {
      addListingButton.addEventListener('click', addListingModal);
    }

    if (addListingFooterButton) {
      addListingFooterButton.addEventListener('click', addListingModal);
    }
  } else {
    // If not logged in, ensure the buttons are hidden
    addListingButton.classList.add('hidden');
    addListingFooterButton.classList.add('hidden');
  }

  if (profileBtn) await profileModal();
  if (loginButton) loginModal();
  if (registerButton) registerModal();

  // Fetch and render listings
  const listings = await fetchListings();
  if (listings.length > 0) {
    renderListings(listings);
  } else {
    console.error('No listings found.');
    removeLoader();
  }
}

// Initialize load more and render more posts.
loadMoreListings();

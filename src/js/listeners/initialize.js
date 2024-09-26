import { authUpdate } from '../auth/authUpdate';
import { loadFromStorage } from '../localStorage/loadFromStorage';
import { loginModal } from '../ui/modal/loginModal';
import { profileModal } from '../ui/modal/profileModal';
import { registerModal } from '../ui/modal/registerModal';
import { fetchListings } from '../API/fetchListings';
import { renderListings } from '../rendering/renderListings';
import { removeLoader } from '../ui/loader/removeLoader';
import { loadMoreListings } from '../load/loadMoreListings';

// REMEMBER TO CLEAN THIS FILE AND MAKE IT MODULAR

export async function initialize() {
  const profile = loadFromStorage('userSession');
  if (profile) authUpdate();

  const profileBtn = document.querySelector('#profileButton');
  const loginButton = document.getElementById('loginButton');
  const registerButton = document.getElementById('registerButton');
  //const listingCards = document.querySelectorAll('.listing-card');
  if (profileBtn) await profileModal();
  if (loginButton) loginModal();
  if (registerButton) registerModal();

  // REMOVE COMMENT STATE IN NEW BRANCH
  /*
  if (addListingButton) {
    addListingButton.addEventListener('click', () => {
      if (profile) {
        // Open add listing modal (to be implemented)
        console.log('Open add listing modal');
      } else {
        loginModal();
      }
    });
  }

  if (addListingFooterButton) {
    addListingFooterButton.addEventListener('click', () => {
      if (profile) {
        // Open add listing modal (to be implemented)
        console.log('Open add listing modal from footer');
      } else {
        loginModal();
      }
    });
  }
*/

  // Fetch and render listings
  const listings = await fetchListings();
  if (listings.length > 0) {
    renderListings(listings);
  } else {
    console.error('No listings found.');
    removeLoader();
  }
}

// Initialize load more and render more posts. Remember to seperate in to other files.
loadMoreListings();

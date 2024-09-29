import { removeLoader } from '../ui/loader/removeLoader';
import { createModal } from '../ui/modal/createModal';
import { createListingCard } from './createListingCard';
import { listingModalContent } from '../ui/modal/modalContent';
import { biddingFormListener } from '../listeners/biddingFormListener';

/**
 * Renders a list of listing cards and attaches event listeners to each card for opening the listing modal and bidding form.
 *
 * @function renderListings
 * @param {Array<Object>} listings - An array of listing objects to be displayed.
 * @description This function clears the listings grid, appends new listing cards to it, and attaches click event listeners to open modals with listing details and bidding forms. Once the listings are rendered, the loading indicator is removed.
 */
export function renderListings(listings) {
  const listingsGrid = document.getElementById('itemsGrid');
  listingsGrid.innerHTML = '';
  listings.forEach((listing) => {
    const listingCard = createListingCard(listing);
    listingsGrid.append(listingCard);

    listingCard.addEventListener('click', () => {
      createModal(listingModalContent(listing));
      biddingFormListener(listing.id);
    });
  });

  removeLoader();
}

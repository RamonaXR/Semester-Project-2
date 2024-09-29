import { createModal } from '../ui/modal/createModal';
import { createListingCard } from './createListingCard';
import { listingModalContent } from '../ui/modal/modalContent';
import { biddingFormListener } from '../listeners/biddingFormListener';

/**
 * Appends a list of listing cards to the grid and attaches event listeners for modals and bidding.
 *
 * @function appendListings
 * @param {Array<Object>} listings - An array of listing objects to be appended to the grid.
 * @description This function creates listing cards for each listing, appends them to the listings grid,
 *              and adds click event listeners to open a modal with the listing details and bidding form.
 */
export function appendListings(listings) {
  const listingsGrid = document.getElementById('itemsGrid');

  listings.forEach((listing) => {
    const listingCard = createListingCard(listing);
    listingsGrid.append(listingCard);

    listingCard.addEventListener('click', () => {
      createModal(listingModalContent(listing));
      biddingFormListener(listing.id);
    });
  });
}

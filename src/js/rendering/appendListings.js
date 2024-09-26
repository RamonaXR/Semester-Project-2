import { createModal } from '../ui/modal/createModal';
import { createListingCard } from './createListingCard';
import { listingModalContent } from '../ui/modal/modalContent';

export function appendListings(listings) {
  const listingsGrid = document.getElementById('itemsGrid');

  listings.forEach((listing) => {
    const listingCard = createListingCard(listing);
    listingsGrid.append(listingCard);

    // Set up click event to open modal
    listingCard.addEventListener('click', () => {
      createModal(listingModalContent(listing));
    });
  });
}

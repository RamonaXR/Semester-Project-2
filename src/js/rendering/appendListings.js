import { createModal } from '../ui/modal/createModal';
import { createListingCard } from './createListingCard';
import { listingModalContent } from '../ui/modal/modalContent';
import { biddingFormListener } from '../listeners/biddingFormListener';

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

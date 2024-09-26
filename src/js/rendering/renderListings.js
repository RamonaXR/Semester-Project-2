import { removeLoader } from '../ui/loader/removeLoader';
import { createModal } from '../ui/modal/createModal';
import { createListingCard } from './createListingCard';
import { listingModalContent } from '../ui/modal/modalContent';

export function renderListings(listings) {
  const listingsGrid = document.getElementById('itemsGrid');
  listingsGrid.innerHTML = '';
  console.log('renderListings', listings);
  listings.forEach((listing) => {
    const listingCard = createListingCard(listing);
    listingsGrid.append(listingCard);

    // Set up click event to open modal
    listingCard.addEventListener('click', () => {
      createModal(listingModalContent(listing));
    });
  });

  removeLoader();
}

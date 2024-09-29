import { startCountdown } from '../data/startCountdown';
import placeholder from '/images/placeholder.png';

/**
 * Creates a listing card element for a given listing, including an image, title, seller information, description, and a countdown timer.
 *
 * @function createListingCard
 * @param {Object} listing - The listing object containing information such as title, media, seller, description, and end time.
 * @returns {HTMLElement} The constructed article element representing the listing card.
 *
 * @description This function dynamically creates and returns a styled card element with an image, title, seller info, description,
 *              and a countdown timer. It uses a placeholder image if the listing does not have media.
 */
export function createListingCard(listing) {
  const listingCard = document.createElement('article');
  listingCard.classList.add('listing-card', 'bg-white', 'p-4', 'shadow-md', 'rounded', 'cursor-pointer', 'flex', 'flex-col', 'h-full');
  listingCard.setAttribute('data-id', listing.id);

  const imgElement = document.createElement('img');
  imgElement.src = listing.media[0]?.url || placeholder;
  imgElement.alt = listing.media[0]?.alt || listing.title;
  imgElement.classList.add('w-full', 'aspect-square', 'object-cover', 'rounded');

  const content = document.createElement('div');
  content.classList.add('flex-grow', 'flex', 'flex-col', 'justify-between');

  const title = document.createElement('h2');
  title.classList.add('text-xl', 'font-bold', 'mb-2');
  title.textContent = listing.title;

  const sellerInfo = document.createElement('h3');
  sellerInfo.classList.add('text-sm', 'text-gray-600', 'mb-2');
  sellerInfo.textContent = `Posted by: ${listing.seller?.name || 'Unknown'}`;

  const description = document.createElement('p');
  description.classList.add('text-gray-600', 'mb-4');
  description.textContent = listing.description;

  content.append(title, sellerInfo, description);

  const endsAt = document.createElement('p');
  endsAt.classList.add('font-bold', 'text-sm', 'mb-4', 'mt-auto');
  endsAt.textContent = `Ends at: ${new Date(listing.endsAt).toLocaleString()}`;

  // Start the dynamic countdown
  startCountdown(listing.endsAt, endsAt);

  listingCard.append(imgElement, title, sellerInfo, description, endsAt);
  return listingCard;
}

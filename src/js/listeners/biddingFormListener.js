import { createBids } from '../API/createBids';
import { successMessage } from '../ui/messages/successMessage';
import { errorMessage } from '../ui/messages/errorMessage';
import { fetchData } from '../API/fetchData';
import { API_BASE_URL, API_LISTINGS } from '../data/constants';
import { createModal } from '../ui/modal/createModal';
import { listingModalContent } from '../ui/modal/modalContent';
import { authUpdate } from '../auth/authUpdate';
import { getProfile } from '../API/getProfile';

export function biddingFormListener(listingId) {
  const bidForm = document.getElementById('bidForm');
  const bidAmountError = document.getElementById('bidAmountError');

  if (!bidForm) {
    return;
  }

  bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const bidAmount = document.getElementById('bidAmount').value;

    // Ensure bid is a valid number
    if (bidAmount < 10) {
      errorMessage(bidAmountError, 'Bid must be at least 10 credits.');
      return;
    }

    const postData = {
      amount: Number(bidAmount),
    };

    try {
      const response = await createBids(listingId, postData);

      if (response.success) {
        successMessage(bidAmountError, 'Bid placed successfully!');

        // Fetch the updated bids for the listing
        const updatedListing = await fetchData(`${API_BASE_URL}${API_LISTINGS}/${listingId}?_bids=true&_seller=true`);

        createModal(listingModalContent(updatedListing.data));

        setTimeout(() => {
          window.location.reload();
        }, 5000); // Refreshes the page, it's not optimal, but I want listings to be updated with new bids without the user having to refresh the page.

        // Fetch updated profile (credits)
        await getProfile();

        authUpdate(); // Re-render the profile section, including credits
      } else {
        errorMessage(bidAmountError, 'An error occurred while placing the bid.');
      }
    } catch (error) {
      console.error(error);
    }
  });
}

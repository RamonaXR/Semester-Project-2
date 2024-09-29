import { createModal, closeModal } from './createModal';
import { errorMessage } from '../messages/errorMessage';
import { successMessage } from '../messages/successMessage';
import { createListing } from '../../API/createListing';
import { validateAddListingForm } from '../../utils/validation/validateAddListingForm';

export function addListingModal() {
  const modalContent = document.createElement('div');
  modalContent.classList.add('p-6', 'bg-white', 'rounded-lg', 'w-full', 'max-w-md');

  // Title input
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.id = 'listingTitle';
  titleInput.placeholder = 'Enter listing title';
  titleInput.required = true;
  titleInput.classList.add('border', 'w-full', 'p-2', 'mb-4');

  // Description input
  const descriptionInput = document.createElement('textarea');
  descriptionInput.id = 'listingDescription';
  descriptionInput.placeholder = 'Enter description (optional)';
  descriptionInput.classList.add('border', 'w-full', 'p-2', 'mb-4');

  // Media input container for multiple URLs
  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('mb-4');

  const mediaUrls = []; // Array to store multiple media URLs

  const mediaInput = document.createElement('input');
  mediaInput.type = 'url';
  mediaInput.placeholder = 'Add image URL';
  mediaInput.classList.add('border', 'w-full', 'p-2', 'mb-2');

  const mediaButtonWrap = document.createElement('div');
  mediaButtonWrap.classList.add('flex', 'justify-center');
  const addMediaButton = document.createElement('button');
  addMediaButton.setAttribute('type', 'button');
  addMediaButton.textContent = 'Add Media';
  addMediaButton.classList.add('bg-primary', 'text-white', 'px-4', 'py-2', 'rounded', 'mb-2');
  mediaButtonWrap.append(addMediaButton);

  const mediaList = document.createElement('ul');
  mediaList.classList.add('mb-4');

  // Add event listener for adding media URLs
  addMediaButton.addEventListener('click', (event) => {
    event.preventDefault();
    const mediaUrl = mediaInput.value.trim();
    if (mediaUrl) {
      mediaUrls.push({ url: mediaUrl, alt: 'Listing Image' });

      // Display added URL in the list
      const listItem = document.createElement('li');
      listItem.textContent = mediaUrl;
      mediaList.appendChild(listItem);

      mediaInput.value = '';
    }
  });

  mediaContainer.appendChild(mediaInput);
  mediaContainer.appendChild(mediaButtonWrap);
  mediaContainer.appendChild(mediaList);

  // Deadline input (block past dates)
  const deadlineInput = document.createElement('input');
  deadlineInput.type = 'date';
  deadlineInput.id = 'listingDeadline';
  deadlineInput.classList.add('border', 'w-full', 'p-2', 'mb-4');
  deadlineInput.required = true;

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  deadlineInput.setAttribute('min', today); // Set the min date to today

  // Time input for hour selection
  const timeInput = document.createElement('input');
  timeInput.type = 'time';
  timeInput.id = 'listingTime';
  timeInput.classList.add('border', 'w-full', 'p-2', 'mb-4');
  timeInput.required = true;

  // Submit button
  const submitButtonWrap = document.createElement('div');
  submitButtonWrap.classList.add('flex', 'justify-center');
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('bg-primary', 'text-white', 'px-4', 'py-2', 'rounded');
  submitButton.textContent = 'Create Listing';
  submitButtonWrap.append(submitButton);

  const form = document.createElement('form');
  form.append(titleInput, descriptionInput, mediaContainer, deadlineInput, timeInput, submitButtonWrap);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Validate form
    const validation = validateAddListingForm(titleInput, deadlineInput, timeInput);
    console.log('Validation', validation);
    if (!validation.isValid) {
      errorMessage(modalContent, validation.message);
      return;
    }

    // Construct the endsAt value (date and time combined)
    const endsAt = `${deadlineInput.value}T${timeInput.value}:00`; // Format: YYYY-MM-DDTHH:MM:SS

    const listingData = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      media: mediaUrls,
      endsAt: new Date(endsAt).toISOString(),
    };
    console.log('Listing Data', listingData);

    try {
      const response = await createListing(listingData);
      console.log('response', response);
      successMessage(modalContent, 'Listing created successfully!');
      setTimeout(() => {
        closeModal();
      }, 5000);
    } catch (error) {
      console.error('Error creating listing:', error);
      errorMessage(modalContent, error.message);
    }
  });

  modalContent.append(form);
  createModal(modalContent);
}

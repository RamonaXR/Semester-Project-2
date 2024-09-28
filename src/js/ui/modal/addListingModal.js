/*import { createModal, closeModal } from './createModal';
import { errorMessage } from '../messages/errorMessage';
import { successMessage } from '../messages/successMessage';

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

  // Media input for multiple URLs
  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('mb-4');
  const mediaInput = document.createElement('input');
  mediaInput.type = 'url';
  mediaInput.placeholder = 'Add image URL';
  mediaInput.classList.add('border', 'w-full', 'p-2', 'mb-2');

  const addMediaButton = document.createElement('button');
  addMediaButton.textContent = 'Add Media';
  addMediaButton.classList.add('bg-primary', 'text-white', 'px-4', 'py-2', 'rounded', 'mb-2');

  mediaContainer.appendChild(mediaInput);
  mediaContainer.appendChild(addMediaButton);

  // Deadline input
  const deadlineInput = document.createElement('input');
  deadlineInput.type = 'date';
  deadlineInput.id = 'listingDeadline';
  deadlineInput.classList.add('border', 'w-full', 'p-2', 'mb-4');

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('bg-primary', 'text-white', 'px-4', 'py-2', 'rounded');
  submitButton.textContent = 'Create Listing';

  const form = document.createElement('form');
  form.append(titleInput, descriptionInput, mediaContainer, deadlineInput, submitButton);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const validation = validateAddListingForm(titleInput, deadlineInput);
    if (!validation.isValid) {
      errorMessage(modalContent, validation.message);
      return;
    }

    const media = mediaInput.value ? [{ url: mediaInput.value, alt: 'Listing Image' }] : [];
    const listingData = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      media: media,
      endsAt: deadlineInput.value,
    };

    const response = await createListing(listingData);
    if (response.success) {
      successMessage(modalContent, 'Listing created successfully!');
      setTimeout(() => {
        closeModal(); // Close modal after success
      }, 2000);
    } else {
      errorMessage(modalContent, response.message);
    }
  });

  modalContent.append(form);
  createModal(modalContent);
}*/

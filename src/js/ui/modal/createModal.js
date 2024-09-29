/**
 * Creates and displays a modal with the provided content and adds functionality to close the modal when clicking the close button or outside the modal content.
 *
 * @function createModal
 * @param {HTMLElement} content - The content to display inside the modal.
 * @param {string} [modalId='modal'] - The ID to assign to the modal. Defaults to 'modal'.
 * @description This function generates a modal with the given content and appends it to the document body.
 *              The modal can be closed by clicking the close button or by clicking outside the modal area.
 *              The body is set to 'no-scroll' while the modal is open.
 */
export function createModal(content, modalId = 'modal') {
  const modal = document.createElement('div');
  modal.id = modalId;
  modal.classList = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

  const element = document.createElement('div');
  element.classList.add('bg-white', 'p-6', 'rounded-lg', 'w-11/12', 'max-w-md', 'relative', 'z-60', 'max-h-[90vh]', 'overflow-y-auto', 'mb-8');

  const button = document.createElement('button');
  button.classList.add('absolute', 'top-2', 'right-2', 'text-black', 'text-2xl');
  button.setAttribute('id', 'closeModal');
  button.addEventListener('click', () => {
    closeModal(modalId); // Close the current modal only
  });

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-xmark');

  button.appendChild(icon);

  element.appendChild(button);
  element.appendChild(content);

  modal.appendChild(element);

  // Close only the modal when clicking outside of it
  modal.addEventListener('click', (event) => {
    if (event.target.id === modalId) closeModal(modalId); // Closes the current modal
  });

  document.body.classList.add('no-scroll');
  document.body.appendChild(modal);
}

/**
 * Closes and removes the modal from the DOM based on its ID and restores the ability to scroll.
 *
 * @function closeModal
 * @param {string} [modalId='modal'] - The ID of the modal to close. Defaults to 'modal'.
 * @description This function removes the modal from the document and re-enables scrolling on the body.
 */
export function closeModal(modalId = 'modal') {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.remove();
    document.body.classList.remove('no-scroll');
  }
}

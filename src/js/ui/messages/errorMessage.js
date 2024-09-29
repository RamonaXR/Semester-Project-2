/**
 * Displays an error message or multiple error messages in the specified container.
 *
 * @function errorMessage
 * @param {HTMLElement} container - The DOM element where the error message(s) will be displayed.
 * @param {string|Object} errors - The error message(s) to display. Can be a single string or an object containing multiple error messages.
 *
 * @description This function generates and displays error messages in the provided container.
 *              If a string is passed, it displays a single error message. If an object is passed, it loops through and displays each error message.
 *              The container is made visible and styled accordingly to show the errors.
 */
export function errorMessage(container, errors) {
  if (!errors) return;
  let errorMessage = '';

  if (typeof errors === 'string') {
    errorMessage = `<p class="text-red-600 text-center">${errors}</p>`;
  } else {
    Object.values(errors).forEach((msg) => {
      errorMessage += `<p class="text-red-600 text-center">${msg}</p>`;
    });
  }

  if (container.classList === 'msgContainerParent') {
    const messageContainer = document.querySelector('.msgContainer');
    container.classList.add('flex');
    messageContainer.innerHTML = errorMessage;
  } else {
    container.innerHTML = errorMessage;
    container.classList.remove('hidden');
  }
}

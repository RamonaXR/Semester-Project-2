/**
 * Displays a success message in the specified container.
 *
 * @function successMessage
 * @param {HTMLElement} container - The DOM element where the success message will be displayed.
 * @param {string} message - The success message to display.
 *
 * @description This function inserts a success message into the provided container, styles it with a green text color, and ensures the container is visible.
 */
export function successMessage(container, message) {
  container.innerHTML = `<p class="text-green-600 text-center">${message}</p>`;
  container.classList.remove('hidden');
}

/**
 * Displays or hides validation feedback based on the presence of an error.
 *
 * @function validationFeedback
 * @param {string|null} error - The validation error message, if any.
 * @param {HTMLElement} errorElement - The HTML element where the error message will be displayed.
 * @description This function updates the visibility and content of the error element.
 *              If an error message is present, it displays the error; otherwise, it hides the error element.
 */
export function validationFeedback(error, errorElement) {
  if (error) {
    errorElement.textContent = error;
    errorElement.classList.remove('hidden');
  } else {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
}

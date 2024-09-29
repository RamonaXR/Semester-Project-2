/**
 * Validates the add listing form by checking the title and deadline input fields.
 *
 * @function validateAddListingForm
 * @param {HTMLInputElement} titleInput - The input element for the listing's title.
 * @param {HTMLInputElement} deadlineInput - The input element for the listing's deadline.
 * @returns {Object} An object containing a boolean `isValid` and a `message` if validation fails.
 *
 * @property {boolean} isValid - Indicates whether the form is valid.
 * @property {string} [message] - The validation error message, if any.
 *
 * @description This function checks if the title is provided and if the deadline is at least 7 days in the future. If validation fails, it returns an error message. Otherwise, it returns a success status.
 */
export function validateAddListingForm(titleInput, deadlineInput) {
  const title = titleInput.value.trim();
  const deadline = new Date(deadlineInput.value);
  const today = new Date();
  const minDeadline = new Date(today.setDate(today.getDate() + 7));

  if (!title) {
    return { isValid: false, message: 'Title is required' };
  }

  if (deadline < minDeadline) {
    return { isValid: false, message: 'The deadline must be at least 7 days from today' };
  }

  return { isValid: true };
}

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

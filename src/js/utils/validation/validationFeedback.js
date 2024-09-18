export function validationFeedback(error, errorElement) {
  if (error) {
    errorElement.textContent = error;
    errorElement.classList.remove('hidden');
  } else {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
}

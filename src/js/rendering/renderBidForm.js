/**
 * Creates and returns a bid form element for users to input their bid amount and submit.
 *
 * @function renderBidForm
 * @returns {HTMLElement} The constructed form element containing an input for bid amount, error message placeholder, and a submit button.
 *
 * @description This function generates a form with an input field for the bid amount,
 *              an error message element for validation feedback, and a submit button.
 *              The input field has a minimum value of 10 credits.
 */
export function renderBidForm() {
  const form = document.createElement('form');
  form.id = 'bidForm';
  form.classList.add('flex', 'flex-col', 'items-center', 'mt-4');

  const label = document.createElement('label');
  label.setAttribute('for', 'bidAmount');
  label.classList.add('block', 'text-center');
  label.textContent = 'Amount:';
  form.appendChild(label);

  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'bidAmount';
  input.classList.add('border', 'p-2', 'mb-4', 'w-1/2', 'text-center');
  input.min = '10';
  input.value = '100';
  input.required = true;
  form.appendChild(input);

  const errorMessage = document.createElement('small');
  errorMessage.id = 'bidAmountError';
  errorMessage.classList.add('text-red-600', 'hidden', 'p-2');
  form.appendChild(errorMessage);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('bg-primary', 'text-white', 'px-4', 'py-2', 'rounded');
  submitButton.textContent = 'Bid';
  form.appendChild(submitButton);

  return form;
}

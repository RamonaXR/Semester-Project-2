export function renderBidForm() {
  const form = document.createElement('form');
  form.id = 'bidForm';
  form.classList.add('flex', 'flex-col', 'items-center', 'mt-4');

  // Label
  const label = document.createElement('label');
  label.setAttribute('for', 'bidAmount');
  label.classList.add('block', 'text-center');
  label.textContent = 'Amount:';
  form.appendChild(label);

  // Input
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'bidAmount';
  input.classList.add('border', 'p-2', 'mb-4', 'w-1/2', 'text-center');
  input.min = '10';
  input.value = '100';
  input.required = true;
  form.appendChild(input);

  // Error message (hidden by default)
  const errorMessage = document.createElement('small');
  errorMessage.id = 'bidAmountError';
  errorMessage.classList.add('text-red-600', 'hidden', 'p-2');
  form.appendChild(errorMessage);

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('bg-primary', 'text-white', 'px-4', 'py-2', 'rounded');
  submitButton.textContent = 'Bid';
  form.appendChild(submitButton);

  return form;
}
